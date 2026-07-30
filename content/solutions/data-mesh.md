+++
title = "Wire your organisation into a real-time data mesh"
description = "Your business runs on dozens of partner services plus your own systems — today held together by consoles, credentials and polling scripts. Vantage weaves them into one live mesh, then mints facade APIs, sidecars and embedded data layers from it."
template = "page.html"
weight = 3
aliases = ["/solutions/developers/"]

[extra]
kicker = "Solutions · Stage 3"
icon = "hub"
+++

<style>
.dm-figure{margin:2.5rem 0;padding:1.5rem 1.25rem 1.1rem;border:1px solid var(--color-line);border-radius:1rem;background:var(--color-surface-1);}
.dm-figure img{display:block;width:100%;height:auto;margin:0;}
.dm-figcap{margin:1rem auto 0;max-width:34rem;font-size:.85rem;line-height:1.55;color:var(--color-text-3);text-align:center;}
.dm-plumbing{margin:2rem 0;padding:1.1rem 1.4rem;border-left:3px solid var(--color-accent-400);border-radius:0 .75rem .75rem 0;background:var(--color-surface-1);color:var(--color-text-2);}
.dm-plumbing b{color:var(--color-text-1);}
</style>

An enterprise doesn't run on one database. It runs on dozens of external partners — one sends the email, one keeps the sales data, one analyses the images, one runs the AI workflows, one aggregates the big data — plus its own databases, APIs and infrastructure. Day to day, that is dozens of consoles, dozens of credentials, and a crontab of polling scripts written by people who have since left. There is no single fabric. There are threads — and right now, you are the loom.

**Vantage wires it all into one internal, live data mesh.** The mesh is defined declaratively, and Vantage UI is where you see it and shape it — your AI agent doing the tweaking while the result runs in front of your eyes. And it is not a viewing gallery: the mesh carries writes, actions and scripts, so the fabric you monitor is the same fabric you operate.

<figure class="dm-figure">
  <img src="/images/solutions/dm-weave.svg" alt="Loose, crossing threads from email, CRM, image AI, AI workflows, big data, Postgres, your APIs and Kubernetes pass through a bar labelled Vantage — one declarative mesh — and emerge below as a tight over-under weave" width="720" height="430" loading="lazy">
  <figcaption class="dm-figcap">Disparate threads in, one fabric out. Every partner service and every internal system becomes a strand — named, typed and live — in a weave you define once.</figcaption>
</figure>

Vantage doesn't try to control everything; it gives you the tools to build your own thing. The tools underneath are free forever, MIT-licensed: a query builder, an entity manager, active record, and the machinery for live data in multi-threaded apps.

## Mint artifacts from the mesh

A defined mesh isn't only something to look at in a console — it's a die. Rust's versatility is the payoff: the same definitions that drive your screens compile into deployable software, struck from one metal.

<figure class="dm-figure">
  <img src="/images/solutions/dm-mint.svg" alt="A coin die engraved with the mesh weave stamps three coins bearing the same emblem: a sidecar or edge proxy, a facade API, and an embedded data layer" width="720" height="320" loading="lazy">
  <figcaption class="dm-figcap">One die, three coins. Every artifact carries the same mesh definition — only the shape changes.</figcaption>
</figure>

<div class="swap-benefits">
<div class="swap-benefit"><span class="material-symbols-outlined">cloud_done</span><div><b>Facade APIs</b><p>A cache-at-edge that reacts — instant reads for your web and mobile apps, changes streamed as they happen. The flagship artifact, detailed below.</p></div></div>
<div class="swap-benefit"><span class="material-symbols-outlined">settings_ethernet</span><div><b>Sidecars &amp; edge proxies</b><p>Thin Rust services that sit beside your workloads — deployed as a Lambda or on Kubernetes, fully yours, no vendor runtime underneath.</p></div></div>
<div class="swap-benefit"><span class="material-symbols-outlined">smartphone</span><div><b>Embedded in your apps</b><p>Link the data layer straight into a mobile, desktop or embedded app — a live cache on a background thread, reactive events to your UI.</p></div></div>
</div>

## The facade API, up close

Your web and mobile apps are only as fast as the network between them and your backend. Every screen round-trips a database that's hundreds of milliseconds away, so lists arrive with a spinner, data goes stale the moment it lands, and every team ends up rebuilding the same caching, retry and state-sync plumbing by hand.

**A Vantage facade API sits in front of your data** — a small service you deploy close to your users that keeps a live local copy, answers reads instantly from it, and streams every change back into your app as it happens. Your frontend stops polling a distant REST tier and starts reading a cache that reacts.

<div class="layer-stack">
<div class="layer"><h4>Your web &amp; mobile app</h4><small>unchanged frontend — it renders from a cache and watches for changes</small></div>
<div class="layer-link"><span class="material-symbols-outlined">swap_vert</span>instant reads + a live change stream</div>
<div class="layer mid"><h4>Vantage facade API</h4><small>live cache · reactive views · deployed at the edge, close to your users</small></div>
<div class="layer-link"><span class="material-symbols-outlined">swap_vert</span>backend-agnostic reads &amp; writes over the network</div>
<div class="layer"><h4>Your data &amp; partners</h4><small>SQL · SurrealDB · MongoDB · REST · GraphQL — however far away</small></div>
</div>

The facade is a plain Rust service, so you run it wherever your users are — one per region, at the edge — while your database of record stays put. The distant round-trip happens once, in the background; your app talks to something milliseconds away.

## What your frontend gets

<div class="swap-benefits">
<div class="swap-benefit"><span class="material-symbols-outlined">bolt</span><div><b>Instant reads</b><p>The screen paints from the local cache the moment it opens — no waiting on the backend for the first frame.</p></div></div>
<div class="swap-benefit"><span class="material-symbols-outlined">sync</span><div><b>Changes stream in</b><p>Every open view holds a watch connection; when data changes, the update arrives on its own — no polling loop to write.</p></div></div>
<div class="swap-benefit"><span class="material-symbols-outlined">visibility</span><div><b>Only what's on screen</b><p>The facade fetches details for the rows the user is actually looking at, so a million-row list stays cheap.</p></div></div>
</div>

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

<p class="dm-plumbing">Putting together a React web app is a simple matter — <b>you can vibe-code it</b>. What's crucial is the plumbing underneath: two-way communication, conflict resolution, horizontal scaling. <b>That's what Vantage solves.</b></p>

## A gradual path, not a rewrite

You don't cut over all at once. Stand a facade up in front of the databases you already have, move one screen onto it, and let the rest keep hitting the old backend. Migrate at your pace, then delete the legacy tier behind it — no risky big-bang.

<div class="swap-benefits">
<div class="swap-benefit"><span class="material-symbols-outlined">swap_horiz</span><div><b>Swap databases underneath</b><p>The facade is backend-agnostic — read from one store and write through another while you migrate, without your clients noticing.</p></div></div>
<div class="swap-benefit"><span class="material-symbols-outlined">delete_sweep</span><div><b>Delete plumbing you own</b><p>No more hand-rolled caching, retry and state-sync in the client — the facade does it once, correctly, for every screen.</p></div></div>
<div class="swap-benefit"><span class="material-symbols-outlined">lock_open</span><div><b>Open-source &amp; yours</b><p>Modern Rust that runs on your own infrastructure — fully open-source, forever in your control, and with no code that counts your seats.</p></div></div>
</div>

<p class="journey-note"><span class="material-symbols-outlined">construction</span><span>The framework — the live cache, the reactive views and the watch adapter — ships on <a href="https://crates.io/search?q=vantage-" target="_blank" rel="noopener">crates.io</a> with a <a href="https://romaninsh.github.io/vantage/intro/step5-sql-dio.html" target="_blank" rel="noopener">full guide</a> today; you can build the facade now. Generating and hosting these facades for you as a managed service, and managing API routes from inside Vantage UI, are on the <a href="/features/">roadmap</a>.</span></p>

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

<p class="journey-note"><span class="material-symbols-outlined">arrow_forward</span><span><b>Next rung:</b> rolling this out across an organisation — custom builds, training, partnership. <a href="/solutions/enterprise/">Vantage for your organisation →</a></span></p>
