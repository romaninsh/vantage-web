+++
title = "Features"
description = "Use Vantage to build your own data-heavy applications. Vantage stores its project files in a folder, constantly monitoring them for changes — so the app can be easily modified from the outside."
template = "features.html"

[extra]
kicker = "Vantage UI"

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

# Capability sections. Each row's `key` is a field on every backend's `caps`;
# `term` is its entry in data/glossary.toml, shown as a tooltip. A cap value is
# `true` (supported), `false` (not supported) or a string: a partial
# implementation, shown as a ~ whose tooltip is that string. Use partial
# sparingly. Reading/listing rows is baseline for every source, so it isn't
# listed. `side` picks the panel column.
[[extra.cap_sections]]
title = "Retrieving data"
side = "left"
rows = [
  { key = "filter", term = "cap-filter", label = "Filter by conditions" },
  { key = "filter_ops", term = "cap-filter-ops", label = "Conditional operators" },
  { key = "sort", term = "cap-sort", label = "Server-side sort" },
  { key = "search", term = "cap-search", label = "Quick search" },
  { key = "count", term = "cap-count", label = "Count" },
  { key = "aggregate", term = "cap-aggregate", label = "Column aggregates" },
  { key = "fetch_page", term = "cap-fetch-page", label = "Random-access pages" },
  { key = "fetch_next", term = "cap-fetch-next", label = "Progressive (cursor) load" },
]

[[extra.cap_sections]]
title = "Relations"
side = "left"
rows = [
  { key = "one_to_many", term = "cap-one-to-many", label = "One-to-many relations" },
  { key = "many_to_many", term = "cap-many-to-many", label = "Many-to-many relations" },
  { key = "rel_aggregate", term = "cap-rel-aggregate", label = "Relation aggregation" },
  { key = "expressions", term = "cap-expressions", label = "Arbitrary expressions" },
  { key = "related_columns", term = "cap-traverse-columns", label = "Column from related table" },
  { key = "contained_expr", term = "cap-contained-expr", label = "Contained record expressions" },
  { key = "ref_script", term = "cap-ref-script", label = "Relations defined in Rhai" },
]

[[extra.cap_sections]]
title = "Live updates"
side = "left"
rows = [
  { key = "watch_record", term = "cap-watch-record", label = "Record changed" },
  { key = "watch_set", term = "cap-watch-set", label = "Record set changed" },
  { key = "watch_table", term = "cap-watch-table", label = "Table changed" },
  { key = "watch_related", term = "cap-watch-related", label = "Related record changed" },
]

[[extra.cap_sections]]
title = "Editing data"
side = "right"
rows = [
  { key = "insert", term = "cap-insert", label = "Add records" },
  { key = "update", term = "cap-update", label = "Update records" },
  { key = "delete", term = "cap-delete", label = "Delete records" },
  { key = "import", term = "cap-import", label = "Atomic import" },
  { key = "bulk_modify", term = "cap-bulk-modify", label = "Bulk modify" },
]

[[extra.cap_sections]]
title = "Custom tables"
side = "right"
rows = [
  { key = "custom_query", term = "cap-custom-query", label = "Tables from custom queries" },
  { key = "table_aggregate", term = "cap-table-aggregate", label = "Table aggregate" },
  { key = "server_actions", term = "cap-server-actions", label = "Server-side actions" },
]

[[extra.cap_sections]]
title = "Misc"
side = "right"
rows = [
  { key = "auto_id", term = "cap-auto-id", label = "Auto-ID" },
  { key = "idempotent", term = "cap-idempotent", label = "Idempotency" },
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
title = "Custom UI elements"
image = "images/features/kanban.webp"
full = "images/features/kanban-full.webp"
notes = [
  "Reactively bind to tables.",
  "Kanban, maps and many other custom UI widgets.",
  "Allow scripting and custom actions.",
]

# Each backend's advertised capabilities, taken from the driver factories in the
# Vantage framework. The UI renders only the controls a driver advertises.
# `vendor_url`, `driver_url` (the Vantage crate's docs) and `query_url` (the
# source's query-language reference; `query_name` overrides its label) are
# optional links shown under the backend's name.
[[extra.backends]]
slug = "surrealdb"
vendor_url = "https://surrealdb.com"
driver_url = "https://docs.rs/vantage-surrealdb"
query_url = "https://surrealdb.com/docs/surrealql"
query_name = "SurrealQL"
name = "SurrealDB"
icon = "hub"
mode = "Read / write"
wire = "CBOR"
note = "Full querying, aggregation, pagination, related columns and dataset-level traversal, with relations you can define in Rhai. Tables update themselves when data changes, through LIVE queries — nothing to set up."
caps = { filter = true, filter_ops = true, sort = true, search = true, count = true, aggregate = true, fetch_page = true, fetch_next = true, one_to_many = true, many_to_many = true, rel_aggregate = true, expressions = true, related_columns = true, contained_expr = true, ref_script = true, watch_record = true, watch_set = true, watch_table = true, insert = true, update = true, delete = true, custom_query = true, table_aggregate = true, auto_id = true, idempotent = true }

[[extra.backends]]
slug = "sqlite"
vendor_url = "https://sqlite.org"
driver_url = "https://docs.rs/vantage-sql"
query_url = "https://sqlite.org/lang.html"
query_name = "SQLite SQL"
name = "SQLite"
icon = "database"
mode = "Read / write"
wire = "Native (sqlx)"
note = "Full SQL driver via sqlx — sort, search, aggregation, pagination, subquery traversal and columns from related tables."
caps = { filter = true, filter_ops = true, sort = true, search = true, count = true, aggregate = true, fetch_page = true, fetch_next = true, one_to_many = true, many_to_many = true, rel_aggregate = "From Rust (`Table::with_expression`), or as a column of a read-only `rhai:` / `base:` table. There is no `expr:` column in SQL YAML yet.", expressions = "From Rust (`Table::with_expression`), or as a column of a read-only `rhai:` / `base:` table. There is no `expr:` column in SQL YAML yet.", related_columns = true, ref_script = true, insert = true, update = true, delete = true, custom_query = true, table_aggregate = true, auto_id = true, idempotent = true }
extras = [
  "One file on disk — no server to run or credentials to manage.",
  "Related columns become correlated subqueries, so `client.name` sorts and filters like any column.",
  "Views built from a Rhai query, or derived from another table with `base:`, taking arguments from the page.",
  "JSON columns open as their own editable tables.",
]

[[extra.backends]]
slug = "postgres"
vendor_url = "https://www.postgresql.org"
driver_url = "https://docs.rs/vantage-sql"
query_url = "https://www.postgresql.org/docs/current/sql-commands.html"
query_name = "PostgreSQL SQL"
name = "PostgreSQL"
icon = "database"
mode = "Read / write"
wire = "Native (sqlx)"
note = "Full SQL driver via sqlx — sort, search, aggregation, pagination, subquery traversal and columns from related tables. The framework can also read live changes from a NOTIFY trigger you install; turning that on from the app is next."
caps = { filter = true, filter_ops = true, sort = true, search = true, count = true, aggregate = true, fetch_page = true, fetch_next = true, one_to_many = true, many_to_many = true, rel_aggregate = "From Rust (`Table::with_expression`), or as a column of a read-only `rhai:` / `base:` table. There is no `expr:` column in SQL YAML yet.", expressions = "From Rust (`Table::with_expression`), or as a column of a read-only `rhai:` / `base:` table. There is no `expr:` column in SQL YAML yet.", related_columns = true, ref_script = true, watch_table = "Needs a LISTEN/NOTIFY trigger you install, and the app doesn't switch it on yet. Changes arrive as \"re-read the table\", without the changed row.", insert = true, update = true, delete = true, custom_query = true, table_aggregate = true, auto_id = true, idempotent = true }
extras = [
  "Related columns become correlated subqueries, so `client.name` sorts and filters like any column.",
  "Views built from a Rhai query, or derived from another table with `base:`, taking arguments from the page.",
  "JSON columns open as their own editable tables.",
  "The framework reads live changes from a `LISTEN/NOTIFY` trigger you install.",
]

[[extra.backends]]
slug = "mariadb"
vendor_url = "https://mariadb.org"
driver_url = "https://docs.rs/vantage-sql"
query_url = "https://mariadb.com/docs/server/reference/sql-statements"
query_name = "MariaDB SQL"
name = "MariaDB"
icon = "database"
mode = "Read / write"
wire = "Native (sqlx)"
note = "Full SQL driver via sqlx — sort, search, aggregation, pagination, subquery traversal, columns from related tables, transactional imports and relations scripted in Rhai. Tested on MariaDB 11; the same driver runs MySQL 8."
caps = { filter = true, filter_ops = true, sort = true, search = true, count = true, aggregate = true, fetch_page = true, fetch_next = true, one_to_many = true, many_to_many = true, rel_aggregate = "From Rust (`Table::with_expression`), or as a column of a read-only `rhai:` / `base:` table. There is no `expr:` column in SQL YAML yet.", expressions = "From Rust (`Table::with_expression`), or as a column of a read-only `rhai:` / `base:` table. There is no `expr:` column in SQL YAML yet.", related_columns = true, contained_expr = true, ref_script = true, insert = true, update = true, delete = true, import = true, custom_query = true, table_aggregate = true, auto_id = true, idempotent = true }
extras = [
  "Related columns become correlated subqueries, so `client.name` sorts and filters like any column.",
  "Bulk imports run in one transaction, match ids the way the column's collation does, and fire the same hooks as a single insert.",
  "Views built from a Rhai query, or derived from another table with `base:`, taking arguments from the page.",
  "`modify:` scripts add SQL conditions that YAML can't express: `self.with_condition(ident(\"total\") > 100)`.",
  "JSON columns open as their own editable tables.",
  "No live updates: MariaDB has no push channel short of reading the binlog.",
]

[[extra.backends]]
slug = "mongodb"
vendor_url = "https://www.mongodb.com"
driver_url = "https://docs.rs/vantage-mongodb"
query_url = "https://www.mongodb.com/docs/manual/reference/operator/query/"
query_name = "MongoDB query operators"
name = "MongoDB"
icon = "data_object"
mode = "Read / write"
wire = "BSON"
note = "Filters, sort and search push down to the server, including nested fields. Related columns run as $lookup joins, read-only views come from aggregation pipelines in YAML, and edits keep ObjectId, date and decimal types. On a replica set, tables update live through change streams and bulk imports run in one transaction."
caps = { filter = true, filter_ops = true, sort = true, search = true, count = true, aggregate = true, fetch_page = true, fetch_next = true, one_to_many = true, many_to_many = "Matches with in against the related ids, fetched first — not as a subquery.", related_columns = true, contained_expr = true, ref_script = true, watch_record = "Needs a replica set: change streams don't run on a standalone server.", watch_set = "Needs a replica set: change streams don't run on a standalone server.", watch_table = "Needs a replica set: change streams don't run on a standalone server.", insert = true, update = true, delete = true, import = "Needs a replica set: the import runs in a transaction.", custom_query = true, auto_id = true, idempotent = true }
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
vendor_url = "https://aws.amazon.com/dynamodb/"
driver_url = "https://docs.rs/vantage-aws"
query_url = "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html"
query_name = "DynamoDB Query"
name = "DynamoDB"
icon = "table"
mode = "Read-focused"
wire = "JSON"
note = "Key and scan-filter queries with cursor pagination. Often paired as a read source with writes routed elsewhere."
caps = { filter = true, count = true, fetch_next = true, one_to_many = true }

[[extra.backends]]
slug = "graphql"
vendor_url = "https://graphql.org"
driver_url = "https://docs.rs/vantage-api-client"
query_url = "https://graphql.org/learn/queries/"
query_name = "GraphQL queries"
name = "GraphQL"
icon = "polyline"
mode = "Read-only"
wire = "JSON"
note = "Generic and Hasura dialects. Read rows, filter, and drill into related records. With Hasura, sort, search and operator filters run on the server."
caps = { filter = true, filter_ops = "Hasura dialect only.", sort = "Hasura dialect only.", search = "Hasura dialect only.", count = true, fetch_page = "`limit` / `offset` are rendered when the table sets `paginate: true`, but the grid doesn't page with them yet.", one_to_many = true, ref_script = true }

[[extra.backends]]
slug = "rest"
driver_url = "https://docs.rs/vantage-api-client"
name = "REST APIs"
icon = "api"
mode = "Read-only"
wire = "JSON"
note = "REST endpoints as tables. Filters, sort and paging map onto the URL as configured per API, and work when the API honours them."
caps = { filter = "Equality only, as a URL path segment or `?field=value`; the API has to honour it. Can be set to filter in the app instead.", sort = "When the API has a sort parameter (`OrderingParams`); one column at a time.", count = "Exact when the API reports a total (`total_key`); otherwise the rows are fetched and counted.", fetch_page = "When page/limit or skip/limit parameters are configured and the API supports them.", one_to_many = true, ref_script = true }

[[extra.backends]]
slug = "aws"
vendor_url = "https://aws.amazon.com"
driver_url = "https://docs.rs/vantage-aws"
name = "AWS"
icon = "cloud"
mode = "Read-only"
wire = "JSON"
note = "Infrastructure (CloudWatch, IAM, S3 and more) browsed as tables, with equality filters pushed down to the API."
caps = { filter = true, count = true, one_to_many = true }

[[extra.backends]]
slug = "cli"
driver_url = "https://docs.rs/vantage-cmd"
name = "CLI tools"
icon = "terminal"
mode = "Read-only"
wire = "JSON"
note = "Wrap a command (aws, kubectl, gh…) and read the JSON it prints as rows."
caps = { count = true, ref_script = true }

[[extra.backends]]
slug = "csv"
driver_url = "https://docs.rs/vantage-csv"
query_url = "https://www.rfc-editor.org/rfc/rfc4180"
query_name = "CSV format (RFC 4180)"
name = "CSV files"
icon = "table_view"
mode = "Read-only"
wire = "Typed text"
note = "Local files as tables, with in-memory filtering and record-level traversal."
caps = { filter = true, count = true, one_to_many = true, ref_script = true }

[[extra.backends]]
slug = "logs"
driver_url = "https://docs.rs/vantage-log-writer"
query_url = "https://jsonlines.org"
query_name = "JSON Lines format"
name = "Append logs"
icon = "receipt_long"
mode = "Append-only"
wire = "JSONL"
note = "Append-only JSONL log files — write structured entries that the log viewer picks up on its next refresh."
caps = { insert = true, ref_script = true }

[[extra.backends]]
slug = "memory"
driver_url = "https://docs.rs/vantage-memory"
name = "Memory"
icon = "memory"
mode = "Read / write"
wire = "In-process"
note = "Tables held in the app's own memory — what Faker simulations and tests run on. Every operator, sort, search, paging, atomic import and live updates, with no server."
caps = { filter = true, filter_ops = true, sort = true, search = true, count = true, aggregate = true, fetch_page = true, one_to_many = true, ref_script = true, many_to_many = "Matches with in against the related ids, fetched first — not as a subquery.", watch_record = true, watch_set = true, watch_table = true, insert = true, update = true, delete = true, import = true, auto_id = true, idempotent = true }
extras = [
  "Faker simulations write into it on a schedule, so grids, charts and logs have moving data to show.",
  "Live updates are scoped to the vista's query: a row that stops matching arrives as a delete.",
  "No server, no files — the data lasts as long as the app runs.",
]
+++
