# Vantage 0.4

The first 0.4-line release: more backends, a project-aware shell and a built-in macOS auto-updater.
Alongside SQLite you can connect to SurrealDB, MongoDB, REST APIs, AWS CloudWatch Logs and CSV
files, with CloudWatch browsable in its own right — pick a log group, drill into events, follow
master/detail. Editing inventory YAML rebuilds the open page in place, and results cache to disk, so
reopening a project is near-instant.

## What's new

- New master-detail page layouts, vertical and horizontal.
- A project switcher with a recently-opened list, and a sidebar that groups pages per data source
  with collapsible sub-menus.
- Computed columns from inline expressions.

## 0.4.1

- Built-in auto-update with progress in the title bar, and a native Mac download from the website.

## 0.4.2

- Fix: SQLite datasources work when launched from Finder, and AWS list views walk all pages.
- `AWS_PROFILE` and SSO logins are supported, and DynamoDB gained a `begins_with` sort-key filter.

## 0.4.3

- Fix: the auto-updater offered to "update" 0.4.2 to itself on every launch.
