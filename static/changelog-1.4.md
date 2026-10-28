# Vantage 1.4

Pages can show a table as a tree. `kind: tree` nests each row under the row its `parent:` column
names, so epics hold their stories and stories their sub-tasks, and rows fold and unfold by
clicking or with the arrow keys. Extra columns can total each subtree: a sum of points, a count,
or the share of rows that are done. With `reparent:` or a `rank:` column, rows can be dragged
under another row or into a new order, and a refused write puts the row back.

## What's new

- `kind: tree` shows a table's rows nested by a `parent:` column, folded to `expand:` levels.
- Tree columns can roll up each subtree with `sum`, `count`, `avg` or a done percentage.
- Tree columns take the grid's column keys (`render: progress`, `color:`, `labels:`, …), and
  rollups draw with them; a done percentage draws as a progress bar by default.
- Rows whose parent is missing go to an `orphans:` bucket instead of the top level.
- Drag a row onto another to re-parent it (`reparent: true`) or between rows to re-rank it
  (`rank:`); `allowed:` can refuse a move.
- `quick_filters:` chips work on trees too.

## 1.4.1 — 2026-10-12

- The log button is now a feeds menu, with level and text filters.

## 1.4.2 — 2026-10-12

- APIs from `api/*.yaml` run while the project is open and show in Services with a link, their
  status and their own log feed; compose services gain port links, Restart and Rebuild.
- A new backend or profile restarts APIs on their ports, keeping the last good version and the feed.
- Editing an action reloads the APIs that expose it.
- An API with no `auth:` entry for the active profile doesn't start; other profiles without one show a warning.
- A container that crashes on start gets a feed; feeds keep following when the stack fails.
- The feeds menu shows each feed's state (`live · 2 clients`, `disabled`); the viewer follows a
  restarted feed.
- `list_logs` on API and service feeds needs "Allow MCP agents to read data".
- Fix: `list_logs` paging with `since_seq` could skip lines.
