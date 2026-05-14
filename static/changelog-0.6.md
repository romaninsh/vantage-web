# Vantage 0.6

A focused release for working with tabular data: persistent sort,
auto-refresh, and a dedicated detail sheet for inspecting individual
rows.

## What's new

- **Persistent grid sort.** Click a column header to sort; your
  choice is remembered per project so reopening picks up where you
  left off
  ([vantage-ui#48](https://github.com/romaninsh/vantage-ui/pull/48)).
- **Auto-refresh in tables.** Long-running grid views keep
  themselves current without manual reloads
  ([vantage-ui#48](https://github.com/romaninsh/vantage-ui/pull/48)).
- **Row detail sheet.** Open a single row in a side sheet for a
  clean, scrollable view of every field — no need to widen columns
  or scroll horizontally
  ([vantage-ui#48](https://github.com/romaninsh/vantage-ui/pull/48)).
- **Framework bumps.** Picks up `vantage-aws` 0.4.8 (paginated list
  handling for more services) and `vantage-surrealdb` 0.4.6
  ([vantage-ui#51](https://github.com/romaninsh/vantage-ui/pull/51)).
