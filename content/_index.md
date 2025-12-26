+++
title = "Vantage Framework"
description = "Business logic and persistence abstraction framework written in Rust"
template = "landing.html"

[extra]
version = "v0.4.0"

[[extra.features]]
title = "Full Abstraction"
icon = "layers"
color = "text-primary"
description = "With Vantage, dev teams don't need to know if adding new records happens via SQL INSERT or Kafka publish. Persistence logic is fully abstracted across all languages."

[[extra.features]]
title = "Five Use Patterns"
icon = "category"
color = "text-success"
description = "ORM is too limiting, SQL too verbose? Vantage includes 5 powerful abstraction primitives (Expressions, Query Builders, etc.) that are all interconnected and interoperable."

[[extra.features]]
title = "Type Mapping"
icon = "transform"
color = "text-info"
description = "Different database vendors use different types. Whether VARCHAR2 or GeoSpatial, Vantage allows database vendors to design strict type boundaries."

[[extra.features]]
title = "Sync + Async"
icon = "sync"
color = "text-warning"
description = "Vantage follows a simple principle: query/expression/set building is always sync, while data querying is async. This keeps your UI responsive and error-free."

[[extra.features]]
title = "Cross-Database Operations"
icon = "hub"
color = "text-secondary"
description = "Vantage understands that you can migrate tables from Oracle to PostgreSQL one at a time. Relations, traversal, and sub-queries continue to work seamlessly across databases."

[[extra.features]]
title = "Custom Actions & Hooks"
icon = "extension"
color = "text-danger"
description = "Utilize ACL, Audit, and aggregation in a composable way. No more complex queries. Vantage combines speed with simplicity."

[[extra.features]]
title = "Expose APIs"
icon = "api"
color = "text-primary"
description = "Vantage provides API endpoint builders for frameworks like Axum to easily provide REST and RPC APIs for your data according to your access logic."

[[extra.features]]
title = "Consume APIs"
icon = "cloud_download"
color = "text-success"
description = "Vantage can consume APIs—REST even with pagination—and treats them as regular DataSets, allowing seamless integration and re-integration."

[[extra.features]]
title = "Multi-Language Interface"
icon = "code"
color = "text-info"
description = "Vantage can export your data model across a wide range of programming languages. Use native objects to interact with your data and let the Rust SDK handle the rest."

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
