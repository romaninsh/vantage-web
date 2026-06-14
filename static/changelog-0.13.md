# Vantage 0.13

Relationships can now be scripted. Where a related list used to be a plain foreign-key match, you
can hand it a small Rhai script that builds exactly the set you want — filtered, sorted, searched,
or narrowed with a condition plain YAML couldn't express. Same idea, applied to a whole table, lets
you quietly scope it down after it's built.

## What's new

- **Scripted relationships.** Give a relation a `rhai:` script and it builds its own related-record
  set when you drill in — filter by status, sort newest-first, limit the page, or match on a
  computed condition. The parent record is available to the script, so the related list can depend
  on the row you opened it from. Relations without a script keep working exactly as before.
- **Post-build table tweaks.** Add a `surreal: { modify: | … | }` script to a table and it runs as a
  final step once the table is built — the place to add a condition the column and relation YAML
  can't say on their own (e.g. "only paying clients", "balance below zero"). It narrows the table
  without making it read-only.
- **Guided in the agent skills.** The bundled SurrealDB and UI-builder skills now teach these, so
  asking the assistant to "show a client's open orders, newest first" or "limit this table to active
  accounts" produces the right YAML.

## 0.13.1

- **Tables backed by slow sources load instantly.** A table whose rows come from running a command
  or script now shows the list right away and fills in the slower per-row details as they scroll
  into view, instead of freezing until everything has loaded. Switch a filter or sort and the
  details it already fetched stay put — no reloading what you've already seen.
- **Fix:** live data appears on its own. Rows that finish loading in the background now show up as
  soon as they're ready, instead of only appearing once you moved the mouse over the table.

## 0.13.2

- **Every icon is available now.** Give a menu item or button any icon from the built-in set —
  before, only a handful of names worked and anything else quietly showed no icon at all. Your YAML
  editor lists the full set as you type and flags a name that doesn't exist.
