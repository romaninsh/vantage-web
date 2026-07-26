+++
title = "Reactive web & mobile"
description = "Your existing app is slow because every screen round-trips a distant backend. Vantage puts a reactive facade API in front — a live cache you deploy close to your users that streams changes straight into your frontend. That's Dio and Scenery at work."
template = "page.html"
weight = 2

[extra]
kicker = "Solutions"
icon = "bolt"
+++

Your web and mobile apps are only as fast as the network between them and your backend. Every screen round-trips a database that's hundreds of milliseconds away, so lists arrive with a spinner, data goes stale the moment it lands, and every team ends up rebuilding the same caching, retry and state-sync plumbing by hand.

**Vantage puts a reactive facade API in front of your data** — a small service you deploy close to your users that keeps a live local copy of the data, answers reads instantly from it, and streams every change back into your app as it happens. Your frontend stops polling and starts *reacting*.

That live layer is **Dio** (the cache) and **Scenery** (the reactive views) — the same engine behind Vantage UI, open-source Rust with a full guide today.

## Where it sits in your stack

<div class="layer-stack">
<div class="layer"><h4>Your web &amp; mobile app</h4><small>unchanged frontend — it renders from a cache and watches for changes</small></div>
<div class="layer-link"><span class="material-symbols-outlined">swap_vert</span>instant reads + a live change stream</div>
<div class="layer mid"><h4>Vantage facade API</h4><small>Dio cache · Scenery views · deployed at the edge, close to your users</small></div>
<div class="layer-link"><span class="material-symbols-outlined">swap_vert</span>backend-agnostic reads &amp; writes over the network</div>
<div class="layer"><h4>Your data</h4><small>SQL · SurrealDB · MongoDB · REST · GraphQL — however far away</small></div>
</div>

The facade is a plain Rust service, so you run it wherever your users are — one per region, at the edge — while your database of record stays put. The distant round-trip happens once, in the background; your app talks to something milliseconds away.

## What your frontend gets

<div class="swap-benefits">
<div class="swap-benefit"><span class="material-symbols-outlined">bolt</span><div><b>Instant reads</b><p>The screen paints from the local cache the moment it opens — no waiting on the backend for the first frame.</p></div></div>
<div class="swap-benefit"><span class="material-symbols-outlined">sync</span><div><b>Changes stream in</b><p>Every open view holds a watch connection; when data changes, the update arrives on its own — no polling loop to write.</p></div></div>
<div class="swap-benefit"><span class="material-symbols-outlined">visibility</span><div><b>Only what's on screen</b><p>The facade fetches details for the rows the user is actually looking at, so a million-row list stays cheap.</p></div></div>
</div>

## How the reactive layer works

Each connected client opens a **Scenery** — a standing view onto the Dio's cache — and drives it in one repeating loop. It's the same loop whether the consumer is a desktop grid, a terminal, or a browser tab across the network.

<div class="journey">
<div class="journey-step today"><span class="journey-num">1</span><div class="journey-body"><h4>The client declares what it shows</h4><p>Open a page, and it hands the facade a viewport — "these are the rows on screen." Nothing more.</p></div></div>
<div class="journey-step today"><span class="journey-num">2</span><div class="journey-body"><h4>It paints instantly from cache</h4><p>Rows appear straight from the Dio's local copy, with <code>…</code> standing in for details still pending. No frozen prompt, even on a cold start.</p></div></div>
<div class="journey-step today"><span class="journey-num">3</span><div class="journey-body"><h4>Hydration follows attention</h4><p>The Scenery fetches details only for the viewport rows. Scroll, and the window moves with the user; off-screen rows never cost a download.</p></div></div>
<div class="journey-step today"><span class="journey-num">4</span><div class="journey-body"><h4>Changes stream back</h4><p>Each landed value streams to the client as a watch event — the cell flips from <code>…</code> to a number the moment its data arrives, and every open tab stays current.</p></div></div>
<div class="journey-step today last"><span class="journey-num">5</span><div class="journey-body"><h4>Closing the view withdraws its work</h4><p>Disconnect, and the Scenery's queued fetches are dropped. A closed tab stops pulling data — the load matches what's actually being watched.</p></div></div>
</div>

Under many viewers at once, the Dio coordinates the fetches: **one flight per row.** Two clients watching the same page share a single download, fanned out to both; clients on different pages interleave fairly, so neither starves behind the other's backlog.

## On the wire, and in the frontend

The facade answers a plain `GET` with a snapshot from the cache, and the same URL with `?watch=true` keeps the connection open and streams changes as [Kubernetes-style](https://kubernetes.io/docs/reference/using-api/api-concepts/#efficient-detection-of-changes) NDJSON — one line per change:

<div class="code-card">
<div class="code-card-head"><span class="dot rust"></span>watch stream</div>
<pre class="code-card-body"><code class="language-json">{"type":"ADDED",   "object":{"index":3,"filename":"…","rows":null,  "latest":null}}
{"type":"MODIFIED","object":{"index":3,"filename":"…","rows":143676,"latest":"20260531"}}</code></pre>
</div>

The frontend reads that stream straight off `fetch` — no client library, and the rows fill themselves in:

<div class="code-card">
<div class="code-card-head"><span class="dot rust"></span>React client</div>
<pre class="code-card-body"><code class="language-jsx">const res = await fetch(`/api/files?offset=${offset}&limit=${LIMIT}&watch=true`)
const reader = res.body.getReader()
// …split the stream on '\n'…
const event = JSON.parse(line)
setRows(rs => ({ ...rs, [event.object.index]: event.object }))</code></pre>
</div>

The table renders immediately, and each cell flips as its value lands. Paging away aborts the fetch, which closes the connection, which drops the Scenery server-side — the whole lifecycle, for free.

## A gradual path, not a rewrite

You don't cut over all at once. Stand a Vantage facade up in front of the databases you already have, move one screen onto it, and let the rest keep hitting the old backend. Migrate at your pace, then delete the legacy tier behind it — no risky big-bang.

<div class="swap-benefits">
<div class="swap-benefit"><span class="material-symbols-outlined">swap_horiz</span><div><b>Swap databases underneath</b><p>The facade is backend-agnostic — read from one store and write through another while you migrate, without your clients noticing.</p></div></div>
<div class="swap-benefit"><span class="material-symbols-outlined">delete_sweep</span><div><b>Delete plumbing you own</b><p>No more hand-rolled caching, retry and state-sync in the client — the facade does it once, correctly, for every screen.</p></div></div>
<div class="swap-benefit"><span class="material-symbols-outlined">lock_open</span><div><b>Open-source &amp; yours</b><p>High-performance modern Rust that runs on your own infrastructure — fully open-source and forever in your control.</p></div></div>
</div>

<p class="journey-note"><span class="material-symbols-outlined">construction</span><span>The framework — Dio, Scenery and the watch adapter — ships open-source on <a href="https://crates.io/search?q=vantage-" target="_blank" rel="noopener">crates.io</a> with a full guide today; build the reactive facade now. Generating and hosting these facades for you — geographically distributed as a managed service — is on the <a href="/features/">roadmap</a>.</span></p>

## Start here

<div class="my-4">
    <a href="https://romaninsh.github.io/vantage/intro/step5-sql-dio.html" class="btn btn-lg btn-primary me-2" target="_blank" rel="noopener">
        <span class="material-symbols-outlined align-middle me-1">menu_book</span>
        Read the guide
    </a>
    <a href="/framework/" class="btn btn-lg btn-outline-primary me-2">
        Framework overview
    </a>
    <a href="/examples/" class="btn btn-lg btn-outline-primary">
        See an example
    </a>
</div>
