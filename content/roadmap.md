+++
title = "Roadmap"
description = "What ships today, what's in flight, what's next."
template = "page.html"
+++

# Roadmap

Vantage UI is in pre-alpha. We publish this roadmap so you know exactly where the project is, and so the screenshots below are dated proof of progress rather than marketing renders.

## Shipped now

- Multi-database sidebar (SQLite, Postgres, MySQL, SurrealDB, MongoDB, REST, AWS).
- Native macOS rendering on GPUI with virtualised tables.
- YAML-driven page, table, form and menu configuration.
- Tab-based navigation with stack history.
- Local-first execution — no telemetry, no cloud round-trip.
- Reading and browsing records, with sort / filter / pagination.

## In progress

- Reference traversal between datasources (Postgres → S3 → CloudWatch as one navigation flow).
- Editing records with typed field support across more backends.
- More AWS resource types as datasources.
- Live caching of remote data via [`vantage-live`](https://docs.rs/vantage-live).

## Coming soon

- **Hot reload** — edit YAML and see the UI update in place without losing scroll, filter or selection state.
- **Local MCP server** — let coding agents introspect your data and author config for you.
- **Custom Rhai actions** — wire scriptable buttons and row actions into pages.
- **Signed installer** with auto-update.
- **Linux and Windows builds** — once the macOS build stabilises.

## Recent progress

Snapshots from active development. Each is a real screenshot taken on the date noted, not a mockup.

<div class="row g-4 my-4">
    <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100">
            <img src="/images/evolution/2026-04-28-record-editing.png" class="card-img-top" alt="Record editing with typed fields">
            <div class="card-body">
                <h5 class="card-title">Record editing with typed fields</h5>
                <p class="card-text text-muted small">2026-04-28 — Edit dialog with typed inputs (text, number, toggle) wired across multiple backends.</p>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100">
            <img src="/images/evolution/2026-04-28-reference-traversal.png" class="card-img-top" alt="Reference traversal and list view">
            <div class="card-body">
                <h5 class="card-title">Reference traversal & list view</h5>
                <p class="card-text text-muted small">2026-04-28 — Navigate from a record into related rows in a different datasource.</p>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100">
            <img src="/images/evolution/2026-04-28-arbitrary-api-access.png" class="card-img-top" alt="Arbitrary REST API access">
            <div class="card-body">
                <h5 class="card-title">Arbitrary REST API access</h5>
                <p class="card-text text-muted small">2026-04-28 — Treat any paginated REST endpoint as a typed table alongside SQL and Mongo sources.</p>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100">
            <img src="/images/evolution/2026-04-26-inventory-viewer.png" class="card-img-top" alt="Inventory viewer testing catalog reloading">
            <div class="card-body">
                <h5 class="card-title">Inventory viewer & catalog reload</h5>
                <p class="card-text text-muted small">2026-04-26 — Internal tool for testing live config reload across the catalog layer.</p>
            </div>
        </div>
    </div>
</div>
