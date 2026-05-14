# Vantage 0.4

First 0.4-line release: more backends, a project-aware shell, and a
built-in macOS auto-updater.

## What's new

- Connect to SurrealDB, MongoDB, REST APIs, AWS CloudWatch Logs, and
  CSV files alongside SQLite.
- Browse AWS CloudWatch Logs: pick a group, drill into events, follow
  master/detail.
- New master-detail page layouts (vertical and horizontal).
- Edit inventory YAML and the open page rebuilds in place — no
  restart.
- Results cache to disk; reopening a project is near-instant.
- Project switcher with recently-opened list.
- Sidebar groups pages per data source with collapsible sub-menus.
- Computed columns from inline expressions.

## 0.4.1

- Built-in auto-update with progress in the title bar; native Mac
  download from the website.

## 0.4.2

- Fix: SQLite datasources work when launched from Finder.
- Fix: AWS list views walk all pages
  ([vantage#231](https://github.com/romaninsh/vantage/pull/231)).
- `AWS_PROFILE` and SSO logins supported
  ([vantage#230](https://github.com/romaninsh/vantage/pull/230)).
- DynamoDB `begins_with` sort-key filter + scan-filter fix
  ([vantage#230](https://github.com/romaninsh/vantage/pull/230)).

## 0.4.3

- Fix: auto-updater no longer offers to "update" 0.4.2 to itself
  on every launch.
