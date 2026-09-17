# Vantage 0.16

An agent working on your project's YAML can read and query its data, not only its logs. It can load
a model and run a small read-only query — pull a few rows, count them, follow a reference — to
confirm that a table or a drill-down returns what you expect, reading the same data the app shows.
The "Allow MCP agents to read data" toggle on the dashboard governs it.

## What's new

- A REST datasource that reports a row total pages rows in as you scroll, instead of fetching the
  whole table up front, so a big API-backed table opens fast and fills in as you go.
- Flag a column as a label and it renders as a small coloured tag next to the row's name rather than
  taking a column of its own, which suits status and state fields.
