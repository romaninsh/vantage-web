+++
title = "Vantage Framework"
description = "Rust crates for data abstraction across databases, APIs and infrastructure."
template = "page.html"
+++

# Vantage Framework

**Vantage Framework** is the open-source Rust data-abstraction layer that powers Vantage UI. It is shipping on crates.io at version `0.4.x`, with full documentation per crate on docs.rs and a comprehensive mdBook covering the architecture end to end.

The API is still evolving — expected for a 0.x release — but the framework is production-ready in the sense that it is being used to build real applications today, including Vantage UI itself.

<div class="text-center my-5">
    <a href="https://romaninsh.github.io/vantage/" class="btn btn-lg btn-primary me-2" target="_blank" rel="noopener">
        <span class="material-symbols-outlined align-middle me-1">menu_book</span>
        Read the Book
    </a>
    <a href="https://github.com/romaninsh/vantage" class="btn btn-lg btn-outline-primary" target="_blank" rel="noopener">
        <span class="material-symbols-outlined align-middle me-1">code</span>
        GitHub
    </a>
</div>

## What it gives you

- A **typed Entity model** for your business data, independent of the storage backend.
- A **persistence-aligned type system** that maps Rust types to each backend's native types, with strong type-safety guarantees.
- An **expression layer** that compiles to native queries (SQL, MongoDB pipelines, SurrealDB statements, REST query strings) with push-down where supported and client-side fallback where not.
- **Cross-backend joins and relations**, so a SurrealDB user can join an AWS S3 inventory and a Postgres orders table in one query.
- **UI adapters** for GPUI (used by Vantage UI), egui, Slint, Cursive, ratatui and Tauri.

## Crate map

### Core

| Crate | Purpose |
|---|---|
| [`vantage-core`](https://docs.rs/vantage-core) | Result type, error model, base traits |
| [`vantage-types`](https://docs.rs/vantage-types) | The persistence-aligned type system |
| [`vantage-expressions`](https://docs.rs/vantage-expressions) | Database-agnostic expression AST + push-down |
| [`vantage-dataset`](https://docs.rs/vantage-dataset) | `DataSet` / `ValueSet` traits and idempotency rules |
| [`vantage-table`](https://docs.rs/vantage-table) | `Table<Entity>` abstraction over any backend |

### Backends

| Crate | Backend |
|---|---|
| [`vantage-sql`](https://docs.rs/vantage-sql) | Postgres, MySQL, SQLite via `sqlx` |
| [`vantage-surrealdb`](https://docs.rs/vantage-surrealdb) | SurrealDB native client |
| [`vantage-mongodb`](https://docs.rs/vantage-mongodb) | MongoDB with native pipeline support |
| [`vantage-csv`](https://docs.rs/vantage-csv) | CSV files as a read-only dataset |
| [`vantage-redb`](https://docs.rs/vantage-redb) | Embedded ReDB key-value store |
| [`vantage-aws`](https://docs.rs/vantage-aws) | AWS infrastructure (S3, Lambda, CloudWatch, …) as datasources |
| [`vantage-api-pool`](https://docs.rs/vantage-api-pool) | Paginated REST API client pool |

### Wrappers

| Crate | Purpose |
|---|---|
| [`vantage-live`](https://docs.rs/vantage-live) | Write-through, locally-cached `AnyTable` wrapper backed by ReDB |
| [`vantage-ui-adapters`](https://docs.rs/vantage-ui-adapters) | UI bindings for GPUI, egui, Slint, Cursive, ratatui, Tauri |

## Contribute a data source

Vantage UI's reach is bounded by the framework's connector list. Adding a new backend is a well-defined six-step process documented in the [book's "Adding a New Persistence" chapter](https://romaninsh.github.io/vantage/new-persistence.html):

1. Define the type system
2. Implement expressions
3. Implement operators
4. Build the query builder
5. Wire CRUD on `Table`
6. Add relationships and multi-backend support

If you want to bring a new database, message broker or infrastructure source into Vantage UI, that's the path. Pull requests welcome on [github.com/romaninsh/vantage](https://github.com/romaninsh/vantage).
