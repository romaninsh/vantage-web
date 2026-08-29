+++
title = "Vantage UI"
template = "index.html"

[extra]
hero_headline = "AI-first low-code App Builder"
hero_subhead = "Vantage builds custom, real-time, data-heavy apps — forms, grids, wizards, dialogs, dashboards — for your existing databases, APIs and infrastructure. Enterprise-ready. Runs on your hardware."
hero_caption = "**Free for personal use and SMEs.** Built on [Vantage Framework](https://github.com/romaninsh/vantage) (MIT). Windows/Web coming soon. [Contact us](/solutions/enterprise/) for custom enterprise builds."

# ---- Feature tour ----
[extra.features_intro]
heading = "Don't bootstrap that team yet, build the app yourself in minutes"
body = "The Vantage app builder is on another level — compared to other low-code solutions, here's why:"

[[extra.features]]
title = "AI-first, by design"
icon = "smart_toy"
status = "now"
description = "Appsmith and Retool bolted a \"copilot\" onto canvases designed for humans. Vantage was built from the ground up in 2025, for the era of AI: bring your own LLM, explain what you need, the app is ready in minutes."

[[extra.features]]
title = "Dashboards & charts"
icon = "bar_chart"
status = "now"
description = "Compose bar, line and pie charts onto a dashboard page, with dropdown controls that re-filter the whole view reactively."

[[extra.features]]
title = "Query-sourced tables"
icon = "function"
status = "now"
description = "Define a table whose rows come from an arbitrary SELECT — GROUP BY, joins, computed columns — written as a Rhai script. Sorting, filtering and drill-down still work."

[[extra.features]]
title = "Tabs & drill-downs"
icon = "account_tree"
status = "now"
description = "Open related records in child tabs, pin the ones you keep, and chain multi-hop drill-downs from a row's context menu."

[[extra.features]]
title = "Million-row tables, reactive"
icon = "table_rows"
status = "now"
description = "Only on-screen rows are fetched; a shared cache keeps every view in sync and refreshes in the background — no flicker, no reload."

[[extra.features]]
title = "Forms, dialogs & actions"
icon = "edit_note"
status = "now"
description = "Add and edit records in form dialogs, confirm destructive steps, run status workflows, and fire HTTP requests at your own services."

# ---- How it works ----
[extra.howitworks]
heading = "How it works"
body = "From a fresh data source to a working console, with your agent doing the typing."

[[extra.howitworks_steps]]
icon = "link"
title = "1. Connect"
body = "Point Vantage at a config folder. Datasources are described as YAML — connection strings, schemas, tables."

[[extra.howitworks_steps]]
icon = "smart_toy"
title = "2. Describe"
body = "Ask your coding agent — in your IDE or CLI — to author the config (YAML and Rhai) from your schema, over the local MCP server. Pages, tables, forms, dashboards, logic."

[[extra.howitworks_steps]]
icon = "bolt"
title = "3. Run"
body = "Browse, search, filter and edit natively. Change the YAML or the data and the UI reacts live — no refresh, no rebuild."

# ---- Framework band ----
[extra.framework_callout]
heading = "Built on the open Vantage Framework"
body = "Vantage UI is one expression of the open-source, MIT-licensed **[Vantage Framework](/framework/)** — a set of Rust crates for data abstraction across databases, APIs and infrastructure, published on crates.io with a full mdBook. Use the app as your console, or build directly on the crates to power APIs, middleware or your own tools."
+++
