# Vantage 1.1

A major rewrite of the Rhai engine. Until now Vantage ran several separate Rhai implementations,
and they disagreed on many things, including the language itself. The language is now one and the
same everywhere. Each place a script can appear in your app turns on only the parts it needs, so a
form's options can read tables, while an action body can also write to them. This makes
background jobs sturdier and greatly extends what the Faker backend can do with sims: live data
that changes while you watch. A blog post about it is coming soon.

## What's new

- `type: memory` is a new datasource holding editable tables in the app, optionally seeded from
  YAML or JSON files.
- In an action body, `row` saves with `row.save()`, and `table("x")` reads or writes any other
  table; `table("x").import_from(...)` replaces `tables.x.import_values(...)`.
- `observe:` scripts narrow to a related table with `scenery("t").where("id", id).ref("rel")`,
  replacing `related(...)`.
- MCP agents can change data when "Allow MCP agents to write data" is on in Settings (off by
  default).
- Old faker keys such as `effect:` stop the datasource from loading with a message naming what
  replaces them.
- Fix: a sim that fails while running now shows a toast instead of the table silently freezing.

## 1.1.1 — 2026-10-03

- Fix: `builtin:pulse` wrote fractional values into whole-number columns.
- Fix: `count()` on a grouped SurrealDB query table showed 0 rows, and deleting a SurrealDB row
  reported it as missing.
- Fix: `.ref(...)` on faker and memory tables failed with "Unknown reference" in action bodies
  and MCP data scripts, and `references()` came back empty.
- Fix: a column still using the removed `lazy:` key failed with an unreadable schema error; the
  error now points to `sugar:`.
- Fix: a faker `fan_out:` over a table on another datasource failed on open with "not a reference
  column"; the table file now loads invalid with a message naming the datasources.
- Fix: a failed SurrealDB connection logged no reason.
- Fix: MCP `preview_query` rejected short table names that `run_data_script` accepts.
- Fix: every launch logged a false "no datasources connected" warning, and composer-backed
  datasources logged a connect error while their services were still starting.

## 1.1.2 — 2026-10-04

- `spawn_sim("name", #{…})` in an action body, wizard worker or MCP data script starts one more
  faker sim; sim names must be unique across datasources.
- Fix: the status bar stayed empty until a grid was clicked, and its text was hard to read.

## 1.1.3 — 2026-10-07

- Writes through narrowed tables stay in their set (action scripts, agent scripts, forms);
  deleting a missing row succeeds; `import_from` reports `rejected`.
- Fix: the status bar counted rows left over from an earlier run as loaded.

## 1.1.4 — 2026-10-07

- Fix: switching to another app froze the window while memory kept growing.
