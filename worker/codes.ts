// Manage invite codes in the Worker's D1 database (SPEC §5).
// Usage (from worker/, add --local to use the `wrangler dev` database):
//   bun codes.ts add <name> [dollars]    new code with a cap (default $3)
//   bun codes.ts list                    every code with what it has spent
//   bun codes.ts cap <code> <dollars>    change a code's cap
//   bun codes.ts revoke <code>           turn a code off for good

const args = process.argv.slice(2).filter((a) => a !== "--local");
const where = process.argv.includes("--local") ? "--local" : "--remote";
const [command, ...rest] = args;

const q = (s: string) => `'${s.replace(/'/g, "''")}'`;
const mills = (dollars: string) => {
  const n = Math.round(Number(dollars) * 1000);
  if (!Number.isFinite(n) || n < 0) throw new Error(`Not an amount in dollars: ${dollars}`);
  return n;
};
const usd = (m: number) => `$${(m / 1000).toFixed(2)}`;

function sql(command: string) {
  const run = Bun.spawnSync(["bunx", "wrangler", "d1", "execute", "studium", where, "--json", "--command", command], {
    cwd: import.meta.dir,
    stderr: "inherit",
  });
  if (run.exitCode !== 0) process.exit(run.exitCode ?? 1);
  return JSON.parse(run.stdout.toString())[0].results as Record<string, any>[];
}

// Ten characters without look-alikes (0/O, 1/I/L), easy to read out or type on a phone.
function newCode() {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(10));
  return [...bytes].map((b) => alphabet[b % alphabet.length]).join("");
}

switch (command) {
  case "add": {
    const [name, dollars = "3"] = rest;
    if (!name) throw new Error("Usage: bun codes.ts add <name> [dollars]");
    const code = newCode();
    sql(`INSERT INTO codes (code, name, cap_mills) VALUES (${q(code)}, ${q(name)}, ${mills(dollars)})`);
    console.log(`${code}  ${name}, cap ${usd(mills(dollars))}`);
    break;
  }
  case "list": {
    const rows = sql(
      "SELECT c.code, c.name, c.cap_mills, c.spent_mills, c.revoked, count(g.id) AS images " +
        "FROM codes c LEFT JOIN generations g ON g.code = c.code AND g.status = 'done' GROUP BY c.code ORDER BY c.created_at",
    );
    for (const r of rows)
      console.log(`${r.code}  ${usd(r.spent_mills)} of ${usd(r.cap_mills)}  ${String(r.images).padStart(3)} images  ${r.name}${r.revoked ? "  (revoked)" : ""}`);
    break;
  }
  case "cap": {
    const [code, dollars] = rest;
    if (!code || !dollars) throw new Error("Usage: bun codes.ts cap <code> <dollars>");
    sql(`UPDATE codes SET cap_mills = ${mills(dollars)} WHERE code = ${q(code.toUpperCase())}`);
    console.log(`${code.toUpperCase()}: cap ${usd(mills(dollars))}`);
    break;
  }
  case "revoke": {
    const [code] = rest;
    if (!code) throw new Error("Usage: bun codes.ts revoke <code>");
    sql(`UPDATE codes SET revoked = 1 WHERE code = ${q(code.toUpperCase())}`);
    console.log(`${code.toUpperCase()}: revoked`);
    break;
  }
  default:
    console.log("Commands: add <name> [dollars], list, cap <code> <dollars>, revoke <code>. Add --local for the dev database.");
}
