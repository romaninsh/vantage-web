# Vantage 0.16

Vantage moves onto the new 0.6 data layer, and the agent feedback loop grows teeth: an AI agent
working in your project can now read and query its data, not just its logs. REST-backed tables
stream in as you scroll, and status columns render as inline tags.

## What's new

- **Agents can read your data.** Beyond inspecting the app's logs, an agent working on your
  project's YAML can now load a model and run a small read-only query — pull a few rows, count them,
  follow a reference — to confirm a table or drill-down returns what you expect. It reads the same
  data the app shows. Governed by the **Allow MCP agents to read data** toggle on the dashboard.
- **REST tables load as you scroll.** A REST datasource that reports a row total now pages rows in
  on demand as you scroll, instead of fetching the whole table up front — big API-backed tables open
  fast and fill in on the fly.
- **Status columns show up as tags.** Flag a column as a label and it renders as a small colored tag
  next to the row's name instead of taking its own column — a tidy fit for status and state fields.
