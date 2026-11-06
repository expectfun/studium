// The built-in generator in a lesson's "Your turn" box (::generator, see src/lib/remark-lesson.mjs).
// One invite code unlocks every lesson; it's kept in localStorage. Results live on the Worker (worker/),
// so they're the same on every device, and each lesson shows its own.

type Balance = { left_mills: number; price_mills: number };
type Generation = { id: string; prompt: string; status: "pending" | "done" | "failed"; image: string | null; error: string | null };
type Strings = Record<"imagesLeft" | "generating" | "unlocking" | "unlock" | "offline" | "copy" | "copied", string>;

const CODE = "inviteCode";
const POLL_MS = 3000;

const fill = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
const clock = (ms: number) => {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

for (const box of document.querySelectorAll<HTMLElement>(".generator")) if (box.dataset.api) setUp(box);

function setUp(box: HTMLElement) {
  const api = box.dataset.api!.replace(/\/$/, "");
  const lesson = box.dataset.lesson!;
  const ui = JSON.parse(box.dataset.ui!) as Strings;
  const $ = <T extends Element>(s: string) => box.querySelector<T>(s)!;
  const elsewhere = $<HTMLElement>(".elsewhere");
  const unlock = $<HTMLFormElement>(".unlock");
  const tool = $<HTMLElement>(".tool");
  const compose = $<HTMLFormElement>(".compose");
  const textarea = $<HTMLTextAreaElement>("textarea");
  const status = $<HTMLElement>(".compose .status");
  const left = $<HTMLElement>(".compose .left");
  const results = $<HTMLElement>(".results");
  const frame = $<HTMLElement>(".results .frame");
  const prompts = $<HTMLElement>(".results .prompts");
  const thumbs = $<HTMLElement>(".results .thumbs");

  let code = localStorage.getItem(CODE) ?? "";
  let generations: Generation[] = [];
  let shown = "";
  const started = new Map<string, number>();

  class Refused extends Error {}
  async function call<T>(path: string, init: RequestInit = {}): Promise<T> {
    let response: Response;
    try {
      response = await fetch(api + path, {
        ...init,
        headers: { Authorization: `Bearer ${code}`, "Content-Type": "application/json" },
      });
    } catch {
      throw new Error(ui.offline);
    }
    const body = await response.json().catch(() => ({}));
    if (response.status === 401) throw new Refused(body.error);
    if (!response.ok) throw new Error(body.error ?? ui.offline);
    return body as T;
  }

  const error = (form: HTMLFormElement, message = "") => (form.querySelector(".error")!.textContent = message);
  const showBalance = (b: Balance) => (left.textContent = fill(ui.imagesLeft, { n: Math.floor(b.left_mills / b.price_mills) }));

  function lock(message = "") {
    code = "";
    localStorage.removeItem(CODE);
    tool.hidden = true;
    unlock.hidden = false;
    elsewhere.hidden = false;
    error(unlock, message);
  }

  async function open(given: string, quiet = false) {
    code = given.trim().toUpperCase();
    const button = unlock.querySelector("button")!;
    button.textContent = ui.unlocking;
    try {
      showBalance(await call<Balance>("/me"));
      localStorage.setItem(CODE, code);
      unlock.hidden = true;
      elsewhere.hidden = true;
      tool.hidden = false;
      error(unlock);
      const { generations: past } = await call<{ generations: Generation[] }>(`/generations?lesson=${encodeURIComponent(lesson)}`);
      generations = past;
      shown = generations[0]?.id ?? "";
      render();
      generations.filter((g) => g.status === "pending").forEach((g) => watch(g.id));
    } catch (e) {
      if (e instanceof Refused) lock(quiet ? "" : e.message);
      else error(unlock, (e as Error).message);
    } finally {
      button.textContent = ui.unlock;
    }
  }

  // The selected result fills the frame, its prompt is the caption, and the strip holds them all, newest first.
  function render() {
    results.hidden = generations.length === 0;
    const g = generations.find((x) => x.id === shown) ?? generations[0];
    if (!g) return;
    frame.replaceChildren();
    if (g.status === "done" && g.image) {
      const img = document.createElement("img");
      img.src = g.image;
      img.alt = g.prompt;
      frame.append(img);
    } else {
      const wait = document.createElement("div");
      wait.className = `wait ${g.status}`;
      wait.textContent = g.status === "failed" ? (g.error ?? "") : fill(ui.generating, { time: clock(Date.now() - (started.get(g.id) ?? Date.now())) });
      frame.append(wait);
    }

    const caption = document.createElement("div");
    caption.className = "prompt";
    const line = document.createElement("p");
    line.className = "line";
    line.textContent = g.prompt;
    const copy = document.createElement("button");
    copy.type = "button";
    copy.className = "copy";
    copy.textContent = ui.copy;
    copy.addEventListener("click", async () => {
      await navigator.clipboard.writeText(g.prompt);
      copy.textContent = ui.copied;
      setTimeout(() => (copy.textContent = ui.copy), 1200);
    });
    caption.append(line, copy);
    prompts.replaceChildren(caption);

    thumbs.replaceChildren(
      ...generations.map((x, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.setAttribute("role", "tab");
        b.setAttribute("aria-selected", String(x.id === g.id));
        if (x.status === "done" && x.image) {
          const img = document.createElement("img");
          img.src = x.image;
          img.alt = "";
          b.append(img);
        } else {
          const blank = document.createElement("span");
          blank.className = `blank ${x.status}`;
          b.append(blank);
        }
        const label = document.createElement("span");
        label.textContent = String(generations.length - i).padStart(2, "0");
        b.append(label);
        b.addEventListener("click", () => {
          shown = x.id;
          render();
        });
        return b;
      }),
    );
  }

  // Polls one pending generation until fal finishes it; the timer in the frame ticks meanwhile.
  function watch(id: string) {
    if (!started.has(id)) started.set(id, Date.now());
    const tick = setInterval(() => {
      if (shown === id) render();
      updateStatus();
    }, 1000);
    const poll = async () => {
      try {
        const g = await call<Generation & Balance>(`/generations/${id}`);
        showBalance(g);
        if (g.status === "pending") return void setTimeout(poll, POLL_MS);
        generations = generations.map((x) => (x.id === id ? g : x));
      } catch (e) {
        if (e instanceof Refused) return lock(e.message);
        return void setTimeout(poll, POLL_MS * 2);
      }
      clearInterval(tick);
      started.delete(id);
      updateStatus();
      render();
    };
    setTimeout(poll, POLL_MS);
  }

  function updateStatus() {
    const pending = generations.find((g) => g.status === "pending");
    status.textContent = pending ? fill(ui.generating, { time: clock(Date.now() - (started.get(pending.id) ?? Date.now())) }) : "";
  }

  unlock.addEventListener("submit", (e) => {
    e.preventDefault();
    const given = (unlock.elements.namedItem("code") as HTMLInputElement).value;
    if (given.trim()) open(given);
  });

  compose.addEventListener("submit", async (e) => {
    e.preventDefault();
    const prompt = textarea.value.trim();
    if (!prompt) return textarea.focus();
    const button = compose.querySelector<HTMLButtonElement>("button[type=submit]")!;
    button.disabled = true;
    error(compose);
    try {
      const made = await call<{ id: string } & Balance>("/generations", { method: "POST", body: JSON.stringify({ prompt, lesson }) });
      showBalance(made);
      generations.unshift({ id: made.id, prompt, status: "pending", image: null, error: null });
      shown = made.id;
      watch(made.id);
      updateStatus();
      render();
    } catch (err) {
      if (err instanceof Refused) lock(err.message);
      else error(compose, (err as Error).message);
    } finally {
      button.disabled = false;
    }
  });

  // ⌘/Ctrl+Enter generates; the draft survives a reload.
  const draft = `draft:${lesson}`;
  textarea.value = localStorage.getItem(draft) ?? "";
  textarea.addEventListener("input", () => localStorage.setItem(draft, textarea.value));
  textarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) compose.requestSubmit();
  });

  $(".forget").addEventListener("click", () => lock());

  if (code) open(code, true);
}
