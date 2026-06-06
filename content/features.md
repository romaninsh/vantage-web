+++
title = "Features"
description = "A native console built from config you own — declarative YAML for structure, Rhai for logic, written by your AI agent."
template = "features.html"

[extra]
kicker = "Vantage UI"

# Capability rows, grouped. `key` matches a field on each backend's `caps`.
# Reading/listing rows is baseline for every source, so it isn't listed here —
# only the capabilities drivers differ on.
retrieve_rows = [
  { key = "filter", label = "Filter by conditions" },
  { key = "sort", label = "Server-side sort" },
  { key = "search", label = "Quick search" },
  { key = "count", label = "Count" },
  { key = "aggregate", label = "Aggregate — sum / avg / min / max" },
  { key = "page_size", label = "Custom page size" },
  { key = "fetch_page", label = "Random-access pages" },
  { key = "fetch_next", label = "Progressive (cursor) load" },
  { key = "traverse_record", label = "Drill to related record" },
  { key = "traverse_set", label = "Drill across a dataset (subquery)" },
]
edit_rows = [
  { key = "insert", label = "Add records" },
  { key = "update", label = "Update records" },
  { key = "delete", label = "Delete records" },
]

# Roadmap deck — click to flip through. Order here is the initial stack order.
roadmap = [
  { icon = "conversion_path", title = "Wizards", body = "Multi-step flows for guided data entry and operations — collect input across screens, then commit in one go." },
  { icon = "api", title = "Server-side facade APIs", body = "Turn the same config — data sources plus Rhai logic — into real backend APIs your own frontend or mobile app can call. Start in the console; graduate to code." },
  { icon = "deployed_code", title = "Export to real code", body = "No lock-in: export your console to a code repository or container image you own and run anywhere. Start in low-code, leave with real code." },
  { icon = "sensors", title = "Live tables", body = "Connect change-data-capture and live database events so tables update in real time, not just on refresh." },
]

# UI gallery — `image` paths are placeholders; swap each for a real screenshot of
# that element. Notes render under each image.
[[extra.gallery]]
title = "Data grids"
image = "images/vantage-ui-app.png"
notes = [
  "Virtualized — stays smooth past a million rows.",
  "Persistent sort, quick search and column resize, per project.",
  "Background refresh with no flicker, on change or a schedule.",
]

[[extra.gallery]]
title = "Tabs & drill-downs"
image = "images/vantage-ui-app.png"
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
title = "Detail sheet"
image = "images/vantage-ui-app.png"
notes = [
  "Inspect a single row in a side sheet — every field, scrollable.",
  "No widening columns or scrolling sideways to read a record.",
]

[[extra.gallery]]
title = "Charts & dashboards"
image = "images/vantage-ui-app.png"
notes = [
  "Bar, line and pie charts arranged on a dashboard grid.",
  "Dropdown controls re-filter the whole dashboard reactively.",
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
note = "The most complete driver — full querying, aggregation, pagination and dataset-level traversal."
caps = { filter = true, sort = true, search = true, count = true, aggregate = true, page_size = true, fetch_page = true, fetch_next = true, traverse_record = true, traverse_set = true, insert = true, update = true, delete = true }

[[extra.backends]]
slug = "sqlite"
name = "SQLite"
icon = "database"
mode = "Read / write"
wire = "Native (sqlx)"
note = "Full SQL driver via sqlx — sort, search, aggregation, offset pagination and subquery traversal."
caps = { filter = true, sort = true, search = true, count = true, aggregate = true, page_size = true, fetch_page = true, fetch_next = true, traverse_record = true, traverse_set = true, insert = true, update = true, delete = true }

[[extra.backends]]
slug = "postgres"
name = "PostgreSQL"
icon = "database"
mode = "Read / write"
wire = "Native (sqlx)"
note = "CRUD, aggregation and dataset traversal via the SQL query builder; interactive sort/search push-down is being wired up."
caps = { filter = true, sort = false, search = false, count = true, aggregate = true, page_size = false, fetch_page = false, fetch_next = false, traverse_record = true, traverse_set = true, insert = true, update = true, delete = true }

[[extra.backends]]
slug = "mysql"
name = "MySQL"
icon = "database"
mode = "Read / write"
wire = "Native (sqlx)"
note = "CRUD, aggregation and dataset traversal via the SQL query builder; interactive sort/search push-down is being wired up."
caps = { filter = true, sort = false, search = false, count = true, aggregate = true, page_size = false, fetch_page = false, fetch_next = false, traverse_record = true, traverse_set = true, insert = true, update = true, delete = true }

[[extra.backends]]
slug = "mongodb"
name = "MongoDB"
icon = "data_object"
mode = "Read / write"
wire = "BSON"
note = "Native aggregation pipeline with sort, search and pagination; record-level traversal."
caps = { filter = true, sort = true, search = true, count = true, aggregate = true, page_size = true, fetch_page = true, fetch_next = true, traverse_record = true, traverse_set = false, insert = true, update = true, delete = true }

[[extra.backends]]
slug = "dynamodb"
name = "DynamoDB"
icon = "table"
mode = "Read-focused"
wire = "JSON"
note = "Key and scan-filter queries with cursor pagination. Often paired as a read source with writes routed elsewhere."
caps = { filter = true, sort = false, search = false, count = true, aggregate = false, page_size = true, fetch_page = false, fetch_next = true, traverse_record = true, traverse_set = false, insert = false, update = false, delete = false }

[[extra.backends]]
slug = "graphql"
name = "GraphQL"
icon = "polyline"
mode = "Read-only"
wire = "JSON"
note = "Generic and Hasura dialects. Read rows, filter, and drill into related records."
caps = { filter = true, sort = false, search = false, count = true, aggregate = false, page_size = false, fetch_page = false, fetch_next = false, traverse_record = true, traverse_set = false, insert = false, update = false, delete = false }

[[extra.backends]]
slug = "rest"
name = "REST APIs"
icon = "api"
mode = "Read-only"
wire = "JSON"
note = "Paginated REST endpoints as tables, with filtering and record-level drill-down."
caps = { filter = true, sort = false, search = false, count = true, aggregate = false, page_size = false, fetch_page = false, fetch_next = false, traverse_record = true, traverse_set = false, insert = false, update = false, delete = false }

[[extra.backends]]
slug = "aws"
name = "AWS"
icon = "cloud"
mode = "Read-only"
wire = "JSON"
note = "Infrastructure (CloudWatch, IAM, S3 and more) browsed as tables, with equality filters pushed down to the API."
caps = { filter = true, sort = false, search = false, count = true, aggregate = false, page_size = false, fetch_page = false, fetch_next = false, traverse_record = false, traverse_set = false, insert = false, update = false, delete = false }

[[extra.backends]]
slug = "cli"
name = "CLI tools"
icon = "terminal"
mode = "Read-only"
wire = "JSON"
note = "Wrap a command (aws, kubectl, gh…) and read the JSON it prints as rows."
caps = { filter = false, sort = false, search = false, count = true, aggregate = false, page_size = false, fetch_page = false, fetch_next = false, traverse_record = false, traverse_set = false, insert = false, update = false, delete = false }

[[extra.backends]]
slug = "csv"
name = "CSV files"
icon = "table_view"
mode = "Read-only"
wire = "Typed text"
note = "Local files as tables, with in-memory filtering and record-level traversal."
caps = { filter = true, sort = false, search = false, count = true, aggregate = false, page_size = false, fetch_page = false, fetch_next = false, traverse_record = true, traverse_set = false, insert = false, update = false, delete = false }

[[extra.backends]]
slug = "logs"
name = "Append logs"
icon = "receipt_long"
mode = "Append-only"
wire = "JSONL"
note = "Append-only JSONL log files — write structured entries that the log viewer reads back live."
caps = { filter = false, sort = false, search = false, count = false, aggregate = false, page_size = false, fetch_page = false, fetch_next = false, traverse_record = false, traverse_set = false, insert = true, update = false, delete = false }
+++
