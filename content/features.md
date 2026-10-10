+++
title = "Features"
description = "Use Vantage to build your own data-heavy applications. Vantage stores its project files in a folder, constantly monitoring them for changes — so the app can be easily modified from the outside."
template = "features.html"

[extra]
kicker = "Vantage UI"

# Capability rows, grouped. `key` matches a field on each backend's `caps`;
# `term` is the row's entry in data/glossary.toml, shown as a tooltip.
# Reading/listing rows is baseline for every source, so it isn't listed here —
# only the capabilities drivers differ on.
retrieve_rows = [
  { key = "filter", term = "cap-filter", label = "Filter by conditions" },
  { key = "filter_ops", term = "cap-filter-ops", label = "Comparison filters — >, <, in, contains" },
  { key = "sort", term = "cap-sort", label = "Server-side sort" },
  { key = "search", term = "cap-search", label = "Quick search" },
  { key = "count", term = "cap-count", label = "Count" },
  { key = "aggregate", term = "cap-aggregate", label = "Aggregate — sum / avg / min / max" },
  { key = "page_size", term = "cap-page-size", label = "Custom page size" },
  { key = "fetch_page", term = "cap-fetch-page", label = "Random-access pages" },
  { key = "fetch_next", term = "cap-fetch-next", label = "Progressive (cursor) load" },
  { key = "fetch_window", term = "cap-fetch-window", label = "Load rows as you scroll" },
  { key = "traverse_record", term = "cap-traverse-record", label = "Drill to related record" },
  { key = "traverse_set", term = "cap-traverse-set", label = "Drill across a dataset" },
  { key = "traverse_columns", term = "cap-traverse-columns", label = "Columns from related tables — client.name" },
  { key = "ref_script", term = "cap-ref-script", label = "Relations defined in Rhai" },
  { key = "watch", term = "cap-watch", label = "Live updates — the source pushes changes" },
]
edit_rows = [
  { key = "insert", term = "cap-insert", label = "Add records" },
  { key = "update", term = "cap-update", label = "Update records" },
  { key = "delete", term = "cap-delete", label = "Delete records" },
  { key = "import", term = "cap-import", label = "Bulk import in one transaction" },
]

# Free build vs. enterprise distribution. Each row is one capability; `free` and
# `ent` render as a tick for "yes", a dash for "no", and as plain text otherwise.
# A row with only `group` set draws a section heading instead of a comparison.
compare = [
  { group = "Build your app" },
  { label = "Datasources out of the box", free = "12", ent = "12 + your own" },
  { label = "Colour themes", free = "36", ent = "36 + one that's yours" },
  { label = "Native types mapped per source", free = "up to 24", ent = "+ types you define" },
  { label = "Grids past a million rows", free = "yes", ent = "yes" },
  { label = "Charts, KPI cards, dashboards", free = "yes", ent = "yes" },
  { label = "Multi-step wizards & CSV import", free = "yes", ent = "yes" },
  { label = "Custom form layouts", free = "yes", ent = "yes" },
  { label = "Auto-refresh in the background", free = "yes", ent = "yes" },
  { label = "Push-style instant refresh", free = "SurrealDB, MongoDB", ent = "+ CDC: Kafka, Debezium, custom listeners" },
  { label = "Your AI agent builds it over MCP", free = "yes", ent = "yes" },
  { label = "MCP debugging — query preview, error check", free = "yes", ent = "+ BDD suite, run at build" },

  { group = "Custom tables" },
  { label = "Custom queries & aggregates", free = "Rhai", ent = "Rhai + Rust" },
  { label = "Actions", free = "Rhai", ent = "Rhai + Rust" },
  { label = "Internal API", free = "Rhai", ent = "Rhai + Rust" },
  { label = "Custom datasources", free = "OSS, community", free_href = "https://github.com/romaninsh/vantage", ent = "yours or ours", href = "https://romaninsh.github.io/vantage/new-persistence.html" },
  { label = "UI widgets", free = "21 built in", ent = "+ your own in Rust" },
  { label = "Third-party WASM plugins", free = "no", ent = "yes" },

  { group = "Internal distribution control" },
  { label = "Application distribution", free = "vantage-ui.com, or clone by hand", ent = "internal catalog, apps auto-update" },
  { label = "Platforms", free = "macOS, Linux", ent = "+ API/MCP" },
  { label = "Verifiable builds, on demand", free = "no", ent = "your components in the binary" },
  { label = "Your name, icon and About box", free = "no", ent = "yes" },
  { label = "Turn off what you don't need", free = "no", ent = "yes" },
  { label = "Your own release channel", free = "no", ent = "signed & notarised" },
  { label = "vantage:// install allowlist", free = "no", ent = "your apps only" },
  { label = "Central credentials & SSO sign-in", free = "no", ent = "yes" },
  { label = "Crash telemetry", free = "optional", ent = "your own Sentry account" },

  { group = "What you're standing on" },
  { label = "MIT framework underneath", free = "forever", ent = "forever" },
  { label = "Architecture partner & training", free = "no", ent = "yes" },
  { label = "Support", free = "community", ent = "Slack Connect", ent_href = "https://slack.com/intl/en-gb/blog/collaboration/slack-shared-channels" },
  { label = "Price for personal and commercial use", free = "$0 forever", ent = "talk to us", ent_href = "/solutions/enterprise/#ent-form" },
]

# Roadmap deck — click to flip through. Order here is the initial stack order.
roadmap = [
  { icon = "desktop_windows", title = "Windows", body = "macOS and Linux today. A signed Windows build brings the same app to the laptops most of your colleagues actually use — no VM, no remote desktop." },
  { icon = "language", title = "The web", body = "The same YAML and Rhai, rendered in a browser. Hand someone a link instead of an install, and put a screen in front of people who will never open a terminal." },
  { icon = "api", title = "Server-side facade APIs", body = "Turn the same config — data sources plus Rhai logic — into real backend APIs your own frontend or mobile app can call. Start in the app; graduate to code." },
  { icon = "deployed_code", title = "Export to real code", body = "No lock-in: export your app to a code repository or container image you own and run anywhere. Start in low-code, leave with real code." },
]

# UI gallery — `image` paths are placeholders; swap each for a real screenshot of
# that element. Notes render under each image.
[[extra.gallery]]
title = "Data grids"
image = "images/features/data-grids.webp"
full = "images/features/data-grids-full.webp"
notes = [
  "Virtualized — stays smooth past a million rows.",
  "Persistent sort, quick search and column resize, per project.",
  "Background refresh with no flicker, on change or a schedule.",
]

[[extra.gallery]]
title = "Tabs & drill-downs"
image = "images/features/drill-downs.webp"
full = "images/features/drill-downs-full.webp"
notes = [
  "Open related records in child tabs; pin the ones you keep.",
  "Chain multi-hop drill-downs from a row's context menu.",
]

[[extra.gallery]]
title = "Forms, dialogs & actions"
image = "images/vantage-ui-app.png"
notes = [
  "Add and edit records in form dialogs; confirm destructive steps.",
  "Right-click actions run operations or call your own services.",
  "Status workflows offer only the valid next transitions.",
]

[[extra.gallery]]
title = "Wizards"
image = "images/features/wizard.webp"
full = "images/features/wizard-full.webp"
notes = [
  "Multi-step flows for guided data entry and operations.",
  "Collect input across screens, then commit in one go.",
  "Fully scripted interactions — full access to all tables.",
  "A reactive UI to display progress bars or logs.",
]

[[extra.gallery]]
title = "Charts & dashboards"
image = "images/features/charts-dashboards.webp"
full = "images/features/charts-dashboards-full.webp"
notes = [
  "Stacked bars, lines, pies and KPI cards on one dashboard grid.",
  "Filter dropdowns narrow the query itself, so every figure recomputes.",
  "Deltas colour by meaning — a rising cost reads red, not green.",
]

[[extra.gallery]]
title = "Log viewer"
image = "images/vantage-ui-app.png"
notes = [
  "Browse structured logs in-app, newest first, filtered by level.",
  "Auto-refreshes as new entries arrive — no tailing a terminal.",
  "Reads AWS CloudWatch and other log sources as a live table.",
  "Attach logs to one-click feedback straight from the view.",
]

# Each backend's advertised capabilities, taken from the driver factories in the
# Vantage framework. The UI renders only the controls a driver advertises.
[[extra.backends]]
slug = "surrealdb"
name = "SurrealDB"
icon = "hub"
mode = "Read / write"
wire = "CBOR"
note = "Full querying, aggregation, pagination, related columns and dataset-level traversal, with relations you can define in Rhai. Tables update themselves when data changes, through LIVE queries — nothing to set up."
caps = { filter = true, filter_ops = true, sort = true, search = true, count = true, aggregate = true, page_size = true, fetch_page = true, fetch_next = true, fetch_window = true, traverse_record = true, traverse_set = true, traverse_columns = true, ref_script = true, insert = true, update = true, delete = true, import = false, watch = true }
extras = [
  "Tables refresh themselves through LIVE queries — no triggers, no polling.",
  "Related columns follow record links natively, several hops deep: `batch.course.name`.",
  "Views built from a Rhai query, or derived from another table with `base:`, taking arguments from the page.",
  "`modify:` scripts add SurrealQL conditions that YAML can't express.",
  "Embedded objects and arrays open as their own editable tables.",
  "Record ids, datetimes, durations and decimals keep their native types.",
]

[[extra.backends]]
slug = "sqlite"
name = "SQLite"
icon = "database"
mode = "Read / write"
wire = "Native (sqlx)"
note = "Full SQL driver via sqlx — sort, search, aggregation, pagination, subquery traversal and columns from related tables."
caps = { filter = true, filter_ops = true, sort = true, search = true, count = true, aggregate = true, page_size = true, fetch_page = true, fetch_next = true, fetch_window = true, traverse_record = true, traverse_set = true, traverse_columns = true, ref_script = false, insert = true, update = true, delete = true, import = false, watch = false }
extras = [
  "One file on disk — no server to run or credentials to manage.",
  "Related columns become correlated subqueries, so `client.name` sorts and filters like any column.",
  "Views built from a Rhai query, or derived from another table with `base:`, taking arguments from the page.",
  "JSON columns open as their own editable tables.",
]

[[extra.backends]]
slug = "postgres"
name = "PostgreSQL"
icon = "database"
mode = "Read / write"
wire = "Native (sqlx)"
note = "Full SQL driver via sqlx — sort, search, aggregation, pagination, subquery traversal and columns from related tables. The framework can also read live changes from a NOTIFY trigger you install; turning that on from the app is next."
caps = { filter = true, filter_ops = true, sort = true, search = true, count = true, aggregate = true, page_size = true, fetch_page = true, fetch_next = true, fetch_window = true, traverse_record = true, traverse_set = true, traverse_columns = true, ref_script = false, insert = true, update = true, delete = true, import = false, watch = false }
extras = [
  "Related columns become correlated subqueries, so `client.name` sorts and filters like any column.",
  "Views built from a Rhai query, or derived from another table with `base:`, taking arguments from the page.",
  "JSON columns open as their own editable tables.",
  "The framework reads live changes from a `LISTEN/NOTIFY` trigger you install.",
]

[[extra.backends]]
slug = "mysql"
name = "MySQL"
icon = "database"
mode = "Read / write"
wire = "Native (sqlx)"
note = "CRUD, aggregation, comparison filters, subquery traversal and columns from related tables. Server-side sort, search and pagination are not wired up yet."
caps = { filter = true, filter_ops = true, sort = false, search = false, count = true, aggregate = true, page_size = false, fetch_page = false, fetch_next = false, fetch_window = false, traverse_record = true, traverse_set = true, traverse_columns = true, ref_script = false, insert = true, update = true, delete = true, import = false, watch = false }
extras = [
  "Related columns become correlated subqueries.",
  "Views built from a Rhai query, or derived from another table with `base:`, taking arguments from the page.",
  "JSON columns open as their own editable tables.",
]

[[extra.backends]]
slug = "mongodb"
name = "MongoDB"
icon = "data_object"
mode = "Read / write"
wire = "BSON"
note = "Filters, sort and search push down to the server, including nested fields. Related columns run as $lookup joins, read-only views come from aggregation pipelines in YAML, and edits keep ObjectId, date and decimal types. On a replica set, tables update live through change streams and bulk imports run in one transaction."
caps = { filter = true, filter_ops = true, sort = true, search = true, count = true, aggregate = true, page_size = true, fetch_page = true, fetch_next = true, fetch_window = true, traverse_record = true, traverse_set = true, traverse_columns = true, ref_script = true, insert = true, update = true, delete = true, import = true, watch = true }
extras = [
  "On a replica set, tables update live through change streams — edits from any client appear in place.",
  "Read-only views from an aggregation pipeline written in YAML, or built by a Rhai script.",
  "`client.name` columns joined server-side with `$lookup`, several hops deep.",
  "Nested fields as columns — `nested_path: address.city` — searchable and filterable like any other.",
  "Embedded objects and arrays open as their own editable tables.",
  "Edits keep ObjectId, date and decimal types; `datetime` and `decimal` columns check what you type.",
  "Bulk imports run in one transaction and fire the same hooks as a single insert.",
  "Rhai filters are plain maps: `self.with_condition(#{price: #{\"$gt\": 100}})`.",
]

[[extra.backends]]
slug = "dynamodb"
name = "DynamoDB"
icon = "table"
mode = "Read-focused"
wire = "JSON"
note = "Key and scan-filter queries with cursor pagination. Often paired as a read source with writes routed elsewhere."
caps = { filter = true, filter_ops = false, sort = false, search = false, count = true, aggregate = false, page_size = true, fetch_page = false, fetch_next = true, fetch_window = false, traverse_record = true, traverse_set = false, traverse_columns = false, ref_script = false, insert = false, update = false, delete = false, import = false, watch = false }

[[extra.backends]]
slug = "graphql"
name = "GraphQL"
icon = "polyline"
mode = "Read-only"
wire = "JSON"
note = "Generic and Hasura dialects. Read rows, filter, and drill into related records."
caps = { filter = true, filter_ops = false, sort = false, search = false, count = true, aggregate = false, page_size = false, fetch_page = false, fetch_next = false, fetch_window = false, traverse_record = true, traverse_set = false, traverse_columns = false, ref_script = false, insert = false, update = false, delete = false, import = false, watch = false }

[[extra.backends]]
slug = "rest"
name = "REST APIs"
icon = "api"
mode = "Read-only"
wire = "JSON"
note = "Paginated REST endpoints as tables, with filtering and record-level drill-down."
caps = { filter = true, filter_ops = false, sort = false, search = false, count = true, aggregate = false, page_size = false, fetch_page = false, fetch_next = false, fetch_window = false, traverse_record = true, traverse_set = false, traverse_columns = false, ref_script = false, insert = false, update = false, delete = false, import = false, watch = false }

[[extra.backends]]
slug = "aws"
name = "AWS"
icon = "cloud"
mode = "Read-only"
wire = "JSON"
note = "Infrastructure (CloudWatch, IAM, S3 and more) browsed as tables, with equality filters pushed down to the API."
caps = { filter = true, filter_ops = false, sort = false, search = false, count = true, aggregate = false, page_size = false, fetch_page = false, fetch_next = false, fetch_window = false, traverse_record = false, traverse_set = false, traverse_columns = false, ref_script = false, insert = false, update = false, delete = false, import = false, watch = false }

[[extra.backends]]
slug = "cli"
name = "CLI tools"
icon = "terminal"
mode = "Read-only"
wire = "JSON"
note = "Wrap a command (aws, kubectl, gh…) and read the JSON it prints as rows."
caps = { filter = false, filter_ops = false, sort = false, search = false, count = true, aggregate = false, page_size = false, fetch_page = false, fetch_next = false, fetch_window = false, traverse_record = false, traverse_set = false, traverse_columns = false, ref_script = false, insert = false, update = false, delete = false, import = false, watch = false }

[[extra.backends]]
slug = "csv"
name = "CSV files"
icon = "table_view"
mode = "Read-only"
wire = "Typed text"
note = "Local files as tables, with in-memory filtering and record-level traversal."
caps = { filter = true, filter_ops = false, sort = false, search = false, count = true, aggregate = false, page_size = false, fetch_page = false, fetch_next = false, fetch_window = false, traverse_record = true, traverse_set = false, traverse_columns = false, ref_script = false, insert = false, update = false, delete = false, import = false, watch = false }

[[extra.backends]]
slug = "logs"
name = "Append logs"
icon = "receipt_long"
mode = "Append-only"
wire = "JSONL"
note = "Append-only JSONL log files — write structured entries that the log viewer picks up on its next refresh."
caps = { filter = false, filter_ops = false, sort = false, search = false, count = false, aggregate = false, page_size = false, fetch_page = false, fetch_next = false, fetch_window = false, traverse_record = false, traverse_set = false, traverse_columns = false, ref_script = false, insert = true, update = false, delete = false, import = false, watch = false }
+++
