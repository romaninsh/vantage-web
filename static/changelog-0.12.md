# Vantage 0.12

Query-sourced tables let you define a SurrealDB table whose rows come from an arbitrary `SELECT` —
including `GROUP BY` aggregation, joins, and computed columns — instead of mapping one-to-one onto a
physical table.

## What's new

- **Query-sourced tables.** Add a `surreal: { rhai: | … | }` block to any table YAML and write the
  query as a Rhai script that builds a SurrealQL `SELECT`. The result rows populate the table as
  usual — sorting, filtering, drill-down, and chart binding all work.
- **Derived tables.** A `base:` + `inherit:` shorthand lets you start from an existing table and
  narrow or transform it (e.g. "show me clients with a negative balance").
- **Dashboard examples.** The Surreal bakery demo now includes query-sourced tables for daily
  revenue, order totals, low-stock products, and debtors — each powered by a different aggregation
  pattern.

## 0.12.1

- **The app is now just "Vantage".** Same app, shorter name — you'll see it in the menu bar, window
  title, and the download.
