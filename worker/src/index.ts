// The generator's backend (SPEC §5): holds the fal.ai key, checks invite codes, and enforces a spending cap per code.
// Images go through fal's queue API: POST /generations submits and charges the code, GET /generations/:id polls fal
// until the image is ready (or refunds the code if fal reports a failure).

import { Hono, type Context } from "hono";
import { cors } from "hono/cors";

type Env = {
  DB: D1Database;
  FAL_KEY: string;
  ALLOWED_ORIGINS: string;
  MODEL: string;
  MODEL_INPUT: string;
  PRICE_MILLS: string;
};
type Code = { code: string; name: string; cap_mills: number; spent_mills: number };
type Generation = {
  id: string;
  lesson: string | null;
  prompt: string;
  cost_mills: number;
  status: "pending" | "done" | "failed";
  status_url: string;
  response_url: string;
  image_url: string | null;
  error: string | null;
  created_at: string;
};

const MAX_PROMPT = 2000;
const MAX_PENDING = 2;
// A request fal hasn't finished by then is given up on and refunded.
const STALE_MINUTES = 15;

const app = new Hono<{ Bindings: Env; Variables: { code: Code } }>();

app.use("*", (c, next) =>
  cors({
    origin: (origin) => (c.env.ALLOWED_ORIGINS.split(",").includes(origin) ? origin : null),
    allowHeaders: ["Authorization", "Content-Type"],
    allowMethods: ["GET", "POST"],
    maxAge: 86400,
  })(c, next),
);

const fail = (c: Context, status: 400 | 401 | 402 | 404 | 429 | 502, error: string) => c.json({ error }, status);

// Every route below needs a valid, unrevoked invite code: `Authorization: Bearer <code>`.
app.use("*", async (c, next) => {
  if (c.req.method === "OPTIONS") return next();
  const given = c.req.header("Authorization")?.replace(/^Bearer\s+/i, "").trim().toUpperCase();
  const code = given
    ? await c.env.DB.prepare("SELECT code, name, cap_mills, spent_mills FROM codes WHERE code = ? AND revoked = 0")
        .bind(given)
        .first<Code>()
    : null;
  if (!code) return fail(c, 401, "This invite code isn't valid.");
  c.set("code", code);
  await next();
});

const balance = (code: Code, price: number) => ({
  name: code.name,
  left_mills: code.cap_mills - code.spent_mills,
  cap_mills: code.cap_mills,
  price_mills: price,
});

const shown = (g: Generation) => ({
  id: g.id,
  lesson: g.lesson,
  prompt: g.prompt,
  status: g.status,
  image: g.image_url,
  error: g.error,
  created_at: g.created_at,
});

async function falFetch(env: Env, url: string, init: RequestInit = {}) {
  return fetch(url, {
    ...init,
    headers: { Authorization: `Key ${env.FAL_KEY}`, "Content-Type": "application/json" },
    signal: AbortSignal.timeout(25_000),
  });
}

// Settles a pending generation exactly once; a failure gives the code its money back.
async function settle(env: Env, g: Generation, code: string, result: { image: string } | { error: string }) {
  const done = "image" in result;
  const { meta } = await env.DB.prepare(
    "UPDATE generations SET status = ?, image_url = ?, error = ?, finished_at = datetime('now') WHERE id = ? AND status = 'pending'",
  )
    .bind(done ? "done" : "failed", done ? result.image : null, done ? null : result.error, g.id)
    .run();
  if (!done && meta.changes === 1)
    await env.DB.prepare("UPDATE codes SET spent_mills = MAX(0, spent_mills - ?) WHERE code = ?").bind(g.cost_mills, code).run();
  return { ...g, status: done ? "done" : "failed", image_url: done ? result.image : null, error: done ? null : result.error } as Generation;
}

// fal reports a failed request as COMPLETED; the result URL then answers with an error.
async function poll(env: Env, g: Generation, code: string): Promise<Generation> {
  const age = (Date.now() - Date.parse(g.created_at.replace(" ", "T") + "Z")) / 60_000;
  const status = await falFetch(env, g.status_url).catch(() => null);
  if (!status?.ok) return age > STALE_MINUTES ? settle(env, g, code, { error: "The generator took too long." }) : g;
  const { status: state } = (await status.json()) as { status: string };
  if (state !== "COMPLETED") return age > STALE_MINUTES ? settle(env, g, code, { error: "The generator took too long." }) : g;

  const response = await falFetch(env, g.response_url).catch(() => null);
  if (!response) return g;
  const body = (await response.json().catch(() => ({}))) as { images?: { url: string }[]; detail?: unknown };
  const image = body.images?.[0]?.url;
  if (response.ok && image) return settle(env, g, code, { image });
  const detail = JSON.stringify(body.detail ?? body).slice(0, 300);
  const refused = /content|safety|policy|moderation/i.test(detail);
  return settle(env, g, code, {
    error: refused ? "The model refused this prompt. Try rewording it." : "The generation failed. Your credit was returned.",
  });
}

// The code's name, what's left of its cap, and the price of one image.
app.get("/me", (c) => c.json(balance(c.get("code"), Number(c.env.PRICE_MILLS))));

// Submit a prompt. The image costs PRICE_MILLS, charged now so parallel requests can't overspend the cap.
app.post("/generations", async (c) => {
  const code = c.get("code");
  const price = Number(c.env.PRICE_MILLS);
  const { prompt: raw, lesson } = await c.req.json<{ prompt?: string; lesson?: string }>().catch(() => ({}) as { prompt?: string; lesson?: string });
  const prompt = raw?.trim() ?? "";
  if (!prompt) return fail(c, 400, "Write a prompt first.");
  if (prompt.length > MAX_PROMPT) return fail(c, 400, `Keep the prompt under ${MAX_PROMPT} characters.`);

  const pending = await c.env.DB.prepare("SELECT count(*) AS n FROM generations WHERE code = ? AND status = 'pending'")
    .bind(code.code)
    .first<number>("n");
  if ((pending ?? 0) >= MAX_PENDING) return fail(c, 429, "Wait for your current images to finish.");

  const charged = await c.env.DB.prepare(
    "UPDATE codes SET spent_mills = spent_mills + ?1 WHERE code = ?2 AND revoked = 0 AND spent_mills + ?1 <= cap_mills",
  )
    .bind(price, code.code)
    .run();
  if (charged.meta.changes !== 1) return fail(c, 402, "This invite code has used up its budget.");
  const refund = () => c.env.DB.prepare("UPDATE codes SET spent_mills = spent_mills - ? WHERE code = ?").bind(price, code.code).run();

  const input = { ...JSON.parse(c.env.MODEL_INPUT), prompt };
  const submit = await falFetch(c.env, `https://queue.fal.run/${c.env.MODEL}`, { method: "POST", body: JSON.stringify(input) }).catch(() => null);
  if (!submit?.ok) {
    await refund();
    return fail(c, 502, "The generator is unavailable right now. Try again in a minute.");
  }
  const { request_id, status_url, response_url } = (await submit.json()) as Record<string, string>;
  await c.env.DB.prepare(
    "INSERT INTO generations (id, code, lesson, prompt, model, cost_mills, status_url, response_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  )
    .bind(request_id, code.code, lesson?.slice(0, 100) ?? null, prompt, c.env.MODEL, price, status_url, response_url)
    .run();
  return c.json({ id: request_id, ...balance({ ...code, spent_mills: code.spent_mills + price }, price) }, 201);
});

// The code's recent generations, newest first, optionally for one lesson.
app.get("/generations", async (c) => {
  const code = c.get("code");
  const lesson = c.req.query("lesson");
  const rows = await c.env.DB.prepare(
    `SELECT * FROM generations WHERE code = ?1 ${lesson ? "AND lesson = ?2" : ""} ORDER BY created_at DESC LIMIT 50`,
  )
    .bind(...(lesson ? [code.code, lesson] : [code.code]))
    .all<Generation>();
  return c.json({ generations: rows.results.map(shown) });
});

// One generation; while it's pending, this asks fal how it's going.
app.get("/generations/:id", async (c) => {
  const code = c.get("code");
  let g = await c.env.DB.prepare("SELECT * FROM generations WHERE id = ? AND code = ?").bind(c.req.param("id"), code.code).first<Generation>();
  if (!g) return fail(c, 404, "Not found.");
  if (g.status === "pending") g = await poll(c.env, g, code.code);
  const fresh = await c.env.DB.prepare("SELECT spent_mills FROM codes WHERE code = ?").bind(code.code).first<number>("spent_mills");
  return c.json({ ...shown(g), ...balance({ ...code, spent_mills: fresh ?? code.spent_mills }, Number(c.env.PRICE_MILLS)) });
});

export default app;
