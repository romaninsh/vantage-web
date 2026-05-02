+++
title = "Vantage UI"
template = "index.html"

[extra]
version = "v0.4.0"
license = "**Free download** for macOS. Built on the open-source, MIT-licensed [Vantage Framework](/framework/)."

[extra.features_intro]
heading = "What Vantage UI does"
body = "Point Vantage UI at a folder of YAML config — or let an AI agent author it for you over a local MCP server — and it renders a native, multi-database admin interface. SQL, SurrealDB, MongoDB, REST, AWS infrastructure: all browsable from one sidebar. Local-first; no web server, no data leaves your machine."

[[extra.features]]
title = "Multi-Database Sidebar"
icon = "database"
color = "text-primary"
status = "now"
description = "Point at SQLite, Postgres, MySQL, SurrealDB, MongoDB and REST endpoints from one config. Each datasource shows up as its own group in the sidebar."

[[extra.features]]
title = "Native macOS App"
icon = "desktop_mac"
color = "text-success"
status = "now"
description = "Built on GPUI for GPU-accelerated rendering. Virtualised tables handle hundreds of thousands of rows without breaking a sweat."

[[extra.features]]
title = "Local-First & Private"
icon = "lock"
color = "text-info"
status = "now"
description = "Everything runs on your machine: the app, your databases, your config. No telemetry, no cloud round-trip, no shared backend."

[[extra.features]]
title = "YAML-Configured Pages"
icon = "description"
color = "text-warning"
status = "now"
description = "Pages, tables, forms and menus are described as YAML in a folder you control. Version it in git. Hand it off. Diff it on review."

[[extra.features]]
title = "AWS Infrastructure as Data"
icon = "cloud"
color = "text-secondary"
status = "now"
description = "Browse S3 buckets, Lambdas and CloudWatch log groups as if they were database tables. Your infrastructure becomes navigable like any other dataset."

[[extra.features]]
title = "Agent-Driven (MCP)"
icon = "smart_toy"
color = "text-danger"
status = "soon"
description = "A local MCP server lets coding agents introspect your data, propose YAML, and build UI for you. You stay in the loop; the agent does the typing."

[extra.howitworks]
heading = "How it works"
body = "Three steps from a fresh database to a working admin UI."

[[extra.howitworks_steps]]
icon = "link"
title = "1. Connect"
body = "Point Vantage UI at a config folder. Datasources are described as YAML — connection strings, schemas, tables."

[[extra.howitworks_steps]]
icon = "edit_note"
title = "2. Configure"
body = "Write the YAML by hand, or (coming soon) let an AI agent generate it for you over the local MCP server."

[[extra.howitworks_steps]]
icon = "explore"
title = "3. Navigate"
body = "Browse, search, filter and edit records natively. Edit your YAML and the UI updates in place (hot reload — coming soon)."

[extra.framework_callout]
heading = "Built on the Vantage Framework"
body = "Vantage UI is powered by the open-source [Vantage Framework](/framework/) — a set of Rust crates for data abstraction across databases, APIs and infrastructure. Use the framework directly to build facade services, middleware or your own apps. Published on crates.io with a full mdBook covering every layer."
+++

A native **macOS app** for navigating your **databases**, **APIs** and **infrastructure** — from a single sidebar. Open SQL, SurrealDB, MongoDB, REST endpoints and AWS resources side by side, browse and edit records with a fast, GPU-accelerated UI.

Vantage UI is **agent-driven**: pages, tables and forms are described in **YAML** that you (or your AI coding agent) author. A local **MCP server** lets agents introspect your data and build the UI for you, while everything stays on your machine.

Built on the open-source **Vantage Framework** — a Rust data-abstraction layer running on **crates.io** with a comprehensive mdBook. Use the UI as a desktop client, or use the framework directly to power facade services, middleware or your own apps.
