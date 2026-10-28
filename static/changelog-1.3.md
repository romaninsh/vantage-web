# Vantage 1.3

An app can now know who is using it. A `user:` block in `application.yaml` names a table of
people, and the title bar shows a picker in place of the role icon. The choice is remembered per
project, and when the app is signed in, the person with the matching email is picked for you.
Pages read the choice as `${user.id}` and `${user.label}`, so a grid can show only the rows
assigned to the person at the keyboard.

## What's new

- `user:` in `application.yaml` adds a title-bar user picker; pages read the choice as
  `${user.id}` / `${user.label}`.
- `quick_filters:` on `grid` and `kanban` adds toggle chips, each a Rhai `where`, with live counts.
- Starting the app with `--ui-perf` (or `VANTAGE_UI_PERF=1`) turns on a performance mode: two
  title-bar icons toggle a frame-time HUD and a frame overlay, `perf_stats` reports per-window
  frame times and slow-frame incidents, and each incident is written to the app's `diagnostics`
  folder as a line of JSON.
- Fix: a progress bar with a value and no total no longer shows the loading animation.

## 1.3.1 — 2026-10-11

- Components bind data with `observe:` only; the old `table:` spelling no longer loads.
