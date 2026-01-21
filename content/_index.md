+++
title = "Vantage Framework"
template = "index.html"
[extra]
version = "v0.4.0"
license = "**Open Source** MIT Licensed. Still in **rapid development**."

[[extra.features]]
title = "Full Abstraction"
icon = "layers"
color = "text-primary"
description = "Vantage hides persistence detail (SQL, API, Facade, CSV, etc) from your apps. Devs operate with data as if would be in-memory and infallable."

[[extra.features]]
title = "Five Use Patterns"
icon = "category"
color = "text-success"
description = "Tired of ORM vs RAW QUERY debate? Vantage supports 5 ways to interract with data, each suitable for the right kind of task - fully interoperable"

[[extra.features]]
title = "Type Mapping"
icon = "transform"
color = "text-info"
description = "Vantage converts VARCHAR2 or GeoSpatial json into Native type of your language transparently using strong type system"

[[extra.features]]
title = "Async + Streaming"
icon = "sync"
color = "text-warning"
description = "Simple 'foreach' block can become locally-cached, rate-limited, high-performance multi-threaded progressive pre-fetch stream with automatic retries built in"

[[extra.features]]
title = "Cross-Database Operations"
icon = "hub"
color = "text-secondary"
description = "Migrate to a new Database Engine or resolve parts of query through RestAPI without changing your code thanks to multi-db relations traversal and joins and async query parameters"


[[extra.features]]
title = "Custom Actions & Hooks"
icon = "extension"
color = "text-danger"
description = "Vantage has extensions for implementing ACL, Audit, Pagination and aggregation in a composable way. Build a vantage-powered Facade layer while keeping client code unchanged"

[[extra.features]]
title = "Expose APIs"
icon = "api"
color = "text-primary"
description = "With Vantage, building RestAPIs and RPC is as simple as consuming. Use Axum or Warp with Vantage endpoint builders for creating high-performance API layer"

[[extra.features]]
title = "Consume APIs"
icon = "cloud_download"
color = "text-success"
description = "Vantage runs on your mobile device/web app ensuring reliable, cacheable communication, conflict resolution and guaranteed delayed write operations over your own APIs"

[[extra.features]]
title = "Multi-Language Interface"
icon = "code"
color = "text-info"
description = "Vantage data access patterns and your own model schemas are available in Rust with/without type-erasure, WASM as well as wide range of languages supporting Rusts FFI"

[[extra.pattern_tabs]]
id = "expressions"
title = "Expressions"
content_file = "tabs/expressions.md"
icon = "code"
active = true

[[extra.pattern_tabs]]
id = "querybuilder"
title = "QueryBuilder"
content_file = "tabs/querybuilder.md"
icon = "build"
active = false

[[extra.pattern_tabs]]
id = "table"
title = "Table<Entity>"
content_file = "tabs/table-entity.md"
icon = "table_view"
active = false

[[extra.pattern_tabs]]
id = "dataset"
title = "DataSet"
content_file = "tabs/dataset.md"
icon = "dataset"
active = false

[[extra.pattern_tabs]]
id = "entity"
title = "Entity"
content_file = "tabs/entity-any.md"
icon = "dynamic_form"
active = false
+++

# Vantage Framework

A Rust framework for **Business logic** and **persistence abstraction** designed for **enterprise**
use with strong **type safety**. Vantage is unique, because persistences can span across multiple
**databases** or **APIs**.

Vanage provides **five** patterns to interract with structured data for Rust native apps and other
languages like Python, Node or Mobile Apps over FFI.

Aimed at larger organisations - Vantage reduces operational complexity, abstracting away specifics
of your SQL/API/Event interfaces across microservices and legacy apps. Vantage supports server-side
data aggregation and client-side in-memory caching.

SECTION_BREAK

## What kind of challenges Vantage is designed to solve?

As engineering teams grow adopting new database systems and introduce multi-regional deployment,
interaction between Apps and Databases/APIs becomes more and more complex and fragmented. Mergers or
technological transitions will further scatter operational data. Network layer introduces latency
and possible failure your code must account for.

SECTION_BREAK

## Data Abstraction Patterns

Queries, ORM or ActiveRecord? Vantage supports those and 2 other patterns when it comes to
interracting with data - making it suitable for any developers personal taste. Those patterns can
also be combined - `Expression` can be part of `Query` or other way around. Lets explore how to use
those patterns in Rust:

SECTION_BREAK
