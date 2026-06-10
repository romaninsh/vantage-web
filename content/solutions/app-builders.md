+++
title = "Build your own apps"
description = "Use the open Vantage framework as your app's data backbone — typed Rust, a local cache on a background thread, and best-practice persistence over the network. The same engine behind Vantage UI."
template = "page.html"
weight = 3

[extra]
kicker = "Solutions"
icon = "developer_board"
+++

Mobile, tablet and embedded apps live or die on how they talk to the network. Hand-rolled API calls turn into slow screens, stale data and unresponsive UIs — and every team rebuilds the same caching, retry and state-sync plumbing from scratch.

The **Vantage framework** is built to be the backbone of that app. It's written in Rust, slots into any architecture, and gives you a data-abstraction layer with **local caches, running on a background thread, implementing best-practice persistence over the network** — so your UI thread stays smooth and your data stays fresh.

It's the same engine that powers Vantage UI. The difference: it's **fully open-source**, so you can build your own app directly on top of it.

## Where it sits in your app

<div class="layer-stack">
<div class="layer"><h4>Your app</h4><small>UI &amp; business logic — native, mobile, embedded or desktop</small></div>
<div class="layer-link"><span class="material-symbols-outlined">swap_vert</span>typed, safe Rust API</div>
<div class="layer mid"><h4>Vantage data layer</h4><small>typed models · local cache · reactive events · background thread</small></div>
<div class="layer-link"><span class="material-symbols-outlined">swap_vert</span>best-practice persistence over the network</div>
<div class="layer"><h4>Your data</h4><small>SQL · SurrealDB · MongoDB · REST · GraphQL</small></div>
</div>

## What you get

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
<div class="cap-card"><span class="material-symbols-outlined cap-icon">verified</span><h5>Typed &amp; safe</h5><p>Model entities as native Rust types. The compiler catches mismatches, and capability traits stop you calling <code>insert</code> on a read-only source.</p></div>
<div class="cap-card"><span class="material-symbols-outlined cap-icon">swap_horiz</span><h5>Swap backends, keep your code</h5><p>Move an entity between SQLite, Postgres, SurrealDB, Mongo or a REST API without changing your app logic.</p></div>
<div class="cap-card"><span class="material-symbols-outlined cap-icon">bolt</span><h5>Local cache, off the main thread</h5><p>Diorama keeps a local copy in memory or on disk, serves reads instantly, and refreshes on a background task — even when the backend is slow or rate-limited.</p></div>
<div class="cap-card"><span class="material-symbols-outlined cap-icon">sync</span><h5>Reactive &amp; live</h5><p>When data changes, everything watching hears about it — grids re-render, forms update. Build reactive UIs without hand-rolling state sync.</p></div>
<div class="cap-card"><span class="material-symbols-outlined cap-icon">table_rows</span><h5>Virtualized loading</h5><p>Viewport-driven sparse paging fetches only the rows on screen, so a million-row list stays smooth.</p></div>
<div class="cap-card"><span class="material-symbols-outlined cap-icon">science</span><h5>Mock-testable</h5><p>Mocks at the SDK level let you unit-test business logic with no database and no network — fast, deterministic CI.</p></div>
</div>

## The framework, in full

- **Entity framework for Rust** — model Client, Order, Invoice as native types and keep business logic type-safe across a large codebase.
- **SQL builder with dialects & extensions** — a typed query builder that speaks SQLite, Postgres and MySQL, and reaches vendor extensions like CTEs, window functions and JSONB.
- **Instant model traversal (sync)** — follow one-to-many and many-to-many references synchronously; traversal just rewrites conditions, even across databases.
- **Typed entities for a shared library** — define your entities once in a crate the whole org versions and reuses.
- **Aggregation with expressions** — sum, avg, min and max built from composable expressions that compile to native queries.
- **Active Record & Active Entity** — load a record, mutate it and call `save()`, or work entity-first when that fits better.
- **Unit-test your persistence logic** — swap in a mock persistence and test business logic with no database and no network.
- **Custom type systems** — per-backend type universes (CBOR for SurrealDB, BSON for Mongo, native SQL) with strict, no-silent-cast conversions.
- **Roll your own datasource** — implement the traits to add a backend Vantage doesn't ship yet — Oracle, a message queue, your internal store — and everything above works on it.

## One model, any backend

<div class="code-card">
<div class="code-card-head"><span class="dot rhai"></span>Rust</div>
<pre class="code-card-body"><code class="language-rust">// A typed entity, queried without writing SQL.
let clients = Client::table(db)
    .with_condition(clients.is_paying().eq(true));

// Reads come from a local cache, refreshed on a background task —
// the same handle works over SQLite, Postgres, SurrealDB or Mongo.
let lens = Lens::new()
    .cache_at("./cache.redb")
    .refresh_every(Duration::from_secs(30))
    .build()?;</code></pre>
</div>

## Ship it across your org

Build your model once as an ordinary Rust crate, version it internally, and let every team build on the same typed foundation. Because it's just a Rust library, you expose it to other languages with the usual binding crates — you can even link it straight into an existing service.

- **Rust — first-class, today.** The core, query builders, the Diorama cache and reactive handles all ship on [crates.io](https://crates.io/search?q=vantage-) at 0.5.x.
- **Python — today, via PyO3.** A working binding keeps business logic in pure Rust and calls it from Python.
- **TypeScript & Java — same pattern.** The type-erased core is built to bridge out; wire it up with the binding crate for your target.
- **Rust UI toolkits.** Ready-made DataGrid adapters for GPUI, egui, Slint, Tauri, ratatui and Cursive (`vantage-ui-adapters`).
- **Browser (WASM) — on the way.** Running the data layer in the browser is on the roadmap, not shipping yet.

<p class="journey-note"><span class="material-symbols-outlined">check_circle</span><span>The Rust data layer is production-ready and published today. Language bridges beyond Python and WASM/browser targets are still maturing — build on the Rust core now, and grow into the rest.</span></p>

## Start here

<div class="my-4">
    <a href="https://romaninsh.github.io/vantage/" class="btn btn-lg btn-primary me-2" target="_blank" rel="noopener">
        <span class="material-symbols-outlined align-middle me-1">menu_book</span>
        Read the Book
    </a>
    <a href="https://crates.io/search?q=vantage-" class="btn btn-lg btn-outline-primary me-2" target="_blank" rel="noopener">
        <span class="material-symbols-outlined align-middle me-1">deployed_code</span>
        crates.io
    </a>
    <a href="/framework/" class="btn btn-lg btn-outline-primary">
        Framework overview
    </a>
</div>
