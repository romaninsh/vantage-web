# Vantage 0.12

A SurrealDB table can be defined by an arbitrary `SELECT` rather than mapped one-to-one onto a
physical table. Add a `surreal: { rhai: | … | }` block to the table YAML and write the query as a
Rhai script that builds SurrealQL, `GROUP BY` aggregation, joins and computed columns included. The
result rows populate the table as usual, so sorting, filtering, drill-down and chart binding all
work.

## What's new

- A `base:` + `inherit:` shorthand starts from an existing table and narrows or transforms it —
  "clients with a negative balance".
- The Surreal bakery demo has query-sourced tables for daily revenue, order totals, low-stock
  products and debtors, each on a different aggregation pattern.

## 0.12.2

- The app is now just "Vantage" — same app, shorter name, in the menu bar, window title and the
  download. The change breaks auto-update from older builds, so grab this version manually from the
  download page; updates flow normally after that.
