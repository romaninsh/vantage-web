+++
title = "Download Vantage UI"
description = "Native macOS build, free download. Latest release pulled from the live manifest at build time."
template = "download.html"
+++

## Vantage 0.4 — What's new

Curated highlights from this release line. Sourced from the PR history of `vantage-ui` and the per-crate `CHANGELOG.md` files in the `vantage` workspace.

- **More data sources out of the box** — Connect to SurrealDB, REST APIs, AWS CloudWatch Logs, MongoDB, CSV files, and embedded RedB — all alongside the existing SQLite support.
- **Browse AWS CloudWatch Logs** — Pick a log group, drill into its events, and walk the master/detail chain end-to-end without leaving the admin.
- **Master-detail page layouts** — New `burger` (vertical) and `fence` (horizontal) layouts let pages stack related views — select a row on the left, the detail pane rebuilds on the right.
- **Hot reload your inventory** — Edit a `table/*.yaml`, `page/*.yaml`, or `menu/*.yaml` and the open page rebuilds in place. No restart, no losing state.
- **Persistent results cache** — REST and live tables now cache to disk via redb. Reopen a project and the data is there in microseconds instead of refetching.
- **Project switcher with recents** — Switch between inventory projects from the sidebar header. Recently opened projects are remembered between sessions.
- **Hierarchical sidebar** — Pages now group into sections per data source, with collapsible sub-menus for nested links.
- **Schema-validated YAML** — Each inventory folder ships a JSON Schema; modern editors give you autocomplete and error squiggles inline.
- **Cleaner error handling** — Every backend now reports through one structured `VantageError` type, so failures surface with actionable context instead of stack-trace soup.
- **Faster row navigation in REST tables** — A new perpetual-grid mode loads pages on demand for sources that can't report a total row count (JSONPlaceholder, etc.) so you can keep scrolling instead of being stuck on "Page 1 of 1".
- **Computed columns via Rhai** — Tables can declare `expressions:` blocks that compute values server-side; the editor picks them up automatically.
- **Inventory viewer & scaffolding** — A built-in viewer to inspect catalog state, plus auto-scaffolding so a fresh folder turns into a usable inventory project on first launch.

<p class="text-muted mt-4">
    Raw changelog file: <a href="/changelog-0.4.1.md"><code>changelog-0.4.1.md</code></a>
</p>
