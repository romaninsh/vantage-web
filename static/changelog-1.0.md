# Vantage 1.0

Along with the first major version comes a new layout engine. Until now every app looked much the
same: a menu on the left and pages in tabs on the right. Layouts are far more flexible. Elements
can be placed where you want them, more zones are available, and any of them can be hidden
entirely. A dedicated blog post will follow once the engine settles. Apps can also sign in to an
API for you through `oauth2_login`, keeping the tokens in the project's `.env`.

## What's new

- `sugar:` on a grid, list, chart or record adds columns computed by a Rhai script, never stored.
- A button's `enabled:` can follow the grid selection, a grid's `double_click:` runs a button, and
  `navigate()` opens a page in a new tab.
- Record page titles can use `${record.name}`.
- Form fields marked `masked: true` hide their value behind a show/hide toggle.
- REST tables with `pagination:` load the whole collection page by page as you scroll.
- Fix: scrolling over a map zoomed it and scrolled the page at the same time.

## 1.0.1 — 2026-09-29

- An app can choose its window layout: add `layout/<name>.yaml`, name it with `layout:` in
  `application.yaml`, and pick the first page with `home:` and a welcome pop-up with `intro:`.
- A layout places a menu, icon rail, tree or vertical tabs on the left, panels on the right and
  bottom, a status bar, and a title row with a page selector and a tray of compact icons.
- Pages open in tabs, one at a time, or in a stack with Back; pop-ups open as a modal, sheet or
  drawer, and a side panel can follow the row you click in a grid.
- Grids fill the page, colour rows and cells, show progress bars and times such as "in 4 min",
  and open a compact drawer under the selected row.
- Fake datasources can run live scenarios: a flight board with aircraft in the air, and scripted
  sims that book, move and deliver records while you watch.
- Editing a layout file applies at once and keeps open pages where they still fit.
