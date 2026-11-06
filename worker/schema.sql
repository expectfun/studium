-- Invite codes and generations for the friends-only generator (SPEC §5, §7).
-- Money is in mills (1/1000 USD), so prices like $0.035 stay exact integers.

CREATE TABLE IF NOT EXISTS codes (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  cap_mills INTEGER NOT NULL,
  spent_mills INTEGER NOT NULL DEFAULT 0,
  revoked INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- One row per fal request. The cost is charged at submit and refunded if fal reports a failure.
CREATE TABLE IF NOT EXISTS generations (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL REFERENCES codes(code),
  lesson TEXT,
  prompt TEXT NOT NULL,
  model TEXT NOT NULL,
  cost_mills INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | done | failed
  status_url TEXT NOT NULL,
  response_url TEXT NOT NULL,
  image_url TEXT,
  error TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  finished_at TEXT
);

CREATE INDEX IF NOT EXISTS generations_by_code ON generations (code, created_at);
