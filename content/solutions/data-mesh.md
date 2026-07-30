+++
title = "Wire your organisation into a real-time data mesh"
description = "Your business runs on dozens of partner services plus your own systems — today held together by consoles, credentials and polling scripts. Vantage weaves them into one live mesh you serve natively in Rust, as a REST facade, or as an embedded sidecar."
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
.dm-journey{display:flex;align-items:center;gap:.45rem;margin-top:1.25rem;font-family:var(--font-mono,ui-monospace,SFMono-Regular,Menlo,monospace);}
.dm-jstep{position:relative;display:inline-flex;flex-direction:column;align-items:center;}
.dm-jstep b{font-weight:500;font-size:.62rem;line-height:1;color:var(--color-text-1);border:1px solid var(--color-line-strong);border-radius:6px;background:var(--color-surface-2);padding:4px 8px;white-space:nowrap;}
.dm-jstep:last-child b{border-color:color-mix(in srgb,var(--color-accent-400) 55%,transparent);color:var(--color-accent-300);}
.dm-jstep small{position:absolute;top:-.95rem;font-size:.52rem;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-3);white-space:nowrap;}
.dm-jarrow{color:var(--color-text-3);font-size:.7rem;}
/* ── gradual path: frameless columns with dividers ── */
.dm-path{display:grid;grid-template-columns:repeat(3,1fr);margin:1.75rem 0;}
.dm-path-col{padding:0 1.4rem;}
.dm-path-col:first-child{padding-left:0;}
.dm-path-col:last-child{padding-right:0;}
.dm-path-col+.dm-path-col{border-left:1px solid var(--color-line);}
.dm-path-col>b{display:block;font-size:.95rem;color:var(--color-text-1);}
.dm-path-col>p{margin:.45rem 0 0;font-size:.83rem;line-height:1.55;color:var(--color-text-2);}
.dm-oss{margin:.8rem 0 0;padding:0;list-style:none;font-family:var(--font-mono,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:.72rem;color:var(--color-text-2);}
.dm-oss li{padding:.22rem 0;}
.dm-oss li::before{content:"·";margin-right:.55rem;color:var(--color-accent-400);}
@media (max-width:48rem){
.dm-path{grid-template-columns:1fr;}
.dm-path-col{padding:1.1rem 0;}
.dm-path-col:first-child{padding-top:0;}
.dm-path-col+.dm-path-col{border-left:none;border-top:1px solid var(--color-line);}
}
/* ── drag-a-database-chip-into-the-field scene ── */
.dm-swap{margin-top:1.1rem;}
.dm-swap-scene{position:relative;width:202px;height:86px;margin:0 auto;}
.dm-slot{position:absolute;top:8px;left:0;right:0;height:32px;border:1px solid var(--color-line-strong);border-radius:7px;background:var(--color-bg);animation:dm-slot 12s linear infinite;}
.dm-slot-label{position:absolute;top:-5px;left:7px;z-index:3;padding:0 4px;background:var(--color-surface-1);font-family:var(--font-mono,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:.56rem;line-height:1;color:var(--color-text-3);}
.dm-chip{position:absolute;top:60px;z-index:1;padding:3px 8px;border:1px solid var(--color-line-strong);border-radius:6px;background:var(--color-surface-2);box-shadow:0 1px 2px rgb(0 0 0/.4);font-family:var(--font-mono,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:.62rem;line-height:1;white-space:nowrap;color:var(--color-text-1);animation:dm-chip 12s ease-in-out infinite;}
.dm-chip-p{animation-delay:-8s;}
.dm-chip-s{animation-delay:-4s;}
.dm-cursor{position:absolute;top:0;left:0;z-index:5;width:15px;height:15px;filter:drop-shadow(0 1px 2px rgb(0 0 0/.5));animation:dm-cur 12s ease-in-out infinite;}
.dm-swap-static{display:none;position:relative;margin:0 auto;max-width:220px;padding:8px 10px;border:1px solid var(--color-line-strong);border-radius:7px;background:var(--color-bg);font-family:var(--font-mono,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:.66rem;text-align:center;color:var(--color-text-1);}
/* one cyclic chip timeline, phase-shifted per chip: seated → pop out → back to shelf → idle → picked → dragged → dropped */
@keyframes dm-chip{
0%,30%{transform:translate(var(--dx),var(--dy));opacity:1;z-index:2}
33%{transform:translate(var(--dx),calc(var(--dy) + 16px)) scale(.8);opacity:0;z-index:1}
33.05%{transform:translate(0,8px) scale(.9);opacity:0;z-index:1}
36.5%{transform:translate(0,0);opacity:1;z-index:1}
86%{transform:translate(0,0);z-index:1}
89%{transform:translate(0,-3px) scale(1.05);z-index:4}
93.5%{transform:translate(calc(var(--dx)*.45),calc(var(--dy)*.5 - 10px)) scale(1.05) rotate(-4deg);z-index:4}
98%{transform:translate(var(--dx),var(--dy)) scale(1.04);z-index:4}
100%{transform:translate(var(--dx),var(--dy)) scale(1);opacity:1;z-index:4}
}
/* the cursor: three pick-drag-drop gestures per 12s, synced to the chips' pick (86%) and drag (89–98%) windows */
@keyframes dm-cur{
0%,6%{transform:translate(180px,2px)}
19.3%{transform:translate(79px,64px)}
19.8%,22.3%{transform:translate(79px,67px)}
26.8%{transform:translate(52px,38px)}
31.3%{transform:translate(24px,20px)}
32.3%{transform:translate(28px,14px)}
39.6%{transform:translate(180px,2px)}
52.6%{transform:translate(151px,64px)}
53.1%,55.6%{transform:translate(151px,67px)}
60.1%{transform:translate(88px,38px)}
64.6%{transform:translate(24px,20px)}
65.6%{transform:translate(28px,14px)}
72.9%{transform:translate(180px,2px)}
86%{transform:translate(20px,64px)}
86.5%,89%{transform:translate(20px,67px)}
93.5%{transform:translate(22px,38px)}
98%{transform:translate(24px,20px)}
98.7%{transform:translate(28px,14px)}
100%{transform:translate(180px,2px)}
}
/* the slot lights up as a drop target while a chip is dragged over it */
@keyframes dm-slot{
0%,25%{border-color:var(--color-line-strong);box-shadow:none}
27.5%,33%{border-color:var(--color-accent-400);box-shadow:0 0 0 3px rgb(56 198 224/.15)}
35.5%,58.4%{border-color:var(--color-line-strong);box-shadow:none}
60.9%,66.3%{border-color:var(--color-accent-400);box-shadow:0 0 0 3px rgb(56 198 224/.15)}
68.8%,91.7%{border-color:var(--color-line-strong);box-shadow:none}
94.2%,99.6%{border-color:var(--color-accent-400);box-shadow:0 0 0 3px rgb(56 198 224/.15)}
100%{border-color:var(--color-line-strong);box-shadow:none}
}
@media (prefers-reduced-motion: reduce){
.dm-swap-scene{display:none;}
.dm-swap-static{display:block;}
}
</style>

An enterprise doesn't run on one database. It runs on dozens of external partners — one sends the email, one keeps the sales data, one analyses the images, one runs the AI workflows, one aggregates the big data — plus its own databases, APIs and infrastructure. Day to day, that is dozens of consoles, dozens of credentials, and a crontab of polling scripts written by people who have since left. There is no single fabric. There are threads — and right now, you are the loom.

**Vantage wires it all into one internal, live data mesh.** The mesh is defined declaratively, and Vantage UI is where you see it and shape it — your AI agent doing the tweaking while the result runs in front of your eyes. And it is not a viewing gallery: the mesh carries writes, actions and scripts, so the fabric you monitor is the same fabric you operate.

<figure class="dm-figure">
  <img src="/images/solutions/dm-weave.svg" alt="Loose, crossing threads from email, CRM, image AI, AI workflows, big data, Postgres, your APIs and Kubernetes pass through a bar labelled Vantage — one declarative mesh — and emerge below as a tight over-under weave" width="720" height="430" loading="lazy">
  <figcaption class="dm-figcap">Disparate threads in, one fabric out. Every partner service and every internal system becomes a strand — named, typed and live — in a weave you define once.</figcaption>
</figure>

Vantage doesn't try to control everything; it gives you the tools to build your own thing. The tools underneath are free forever, MIT-licensed: a query builder, an entity manager, active record, and the machinery for live data in multi-threaded apps.

## Declare once, serve it three ways

A mesh you can only look at is a dashboard. What you declare in Vantage is a definition — and one definition has three ways out:

<div class="swap-benefits">
<div class="swap-benefit"><div><b>Natively in Rust</b><p>Full type safety, real-time or transactional, built for multi-threaded apps — as open-source crates your services link directly.</p></div></div>
<div class="swap-benefit"><div><b>As a REST facade</b><p>Roll the same definition into an API — poll, live-push or websocket, chosen per consumer. Detailed below.</p></div></div>
<div class="swap-benefit"><div><b>As an embedded sidecar</b><p>Drop it into your cloud or mobile apps: a high-frequency cache that knows your business logic, running right beside the code that needs it.</p></div></div>
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
<div class="swap-benefit"><div><b>Instant reads</b><p>The screen paints from the local cache the moment it opens — no waiting on the backend for the first frame.</p></div></div>
<div class="swap-benefit"><div><b>Changes stream in</b><p>Every open view holds a watch connection; when data changes, the update arrives on its own — no polling loop to write.</p></div></div>
<div class="swap-benefit"><div><b>Only what's on screen</b><p>The facade fetches details for the rows the user is actually looking at, so a million-row list stays cheap.</p></div></div>
</div>

## Inside the facade: a scenery

The facade isn't a framework you configure — it's a handful of lines of Rust. A *scenery* is a standing live view onto the cache: open it, read it, subscribe to it. The same interface drives a desktop grid, a terminal, and this facade:

<div class="code-card">
<div class="code-card-head"><span class="dot rust"></span>Rust</div>
<pre class="code-card-body"><code class="language-rust">// The same declaration your console runs — now inside your service.
let dio = lens.make_dio(orders);
let scenery = dio.table_scenery().open().await?;

// Read it now, straight from the live cache…
let row = scenery.row(0);

// …and react when anything changes, from any source.
let mut changes = scenery.subscribe();
while changes.changed().await.is_ok() {
    push_to_clients(&scenery);   // one update per burst of changes
}</code></pre>
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

<div class="dm-path">
<div class="dm-path-col"><b>Swap databases underneath</b><p>The facade is backend-agnostic. Move it — complex queries and all — with near-zero code change; your clients never notice.</p>
<div class="dm-swap" aria-hidden="true">
<div class="dm-swap-scene">
<div class="dm-slot"><span class="dm-slot-label">database</span></div>
<span class="dm-chip" style="--dx:8px;--dy:-46px;left:0">Oracle</span>
<span class="dm-chip dm-chip-p" style="--dx:-51px;--dy:-46px;left:59px">Postgres</span>
<span class="dm-chip dm-chip-s" style="--dx:-123px;--dy:-46px;left:131px">SurrealDB</span>
<svg class="dm-cursor" viewBox="0 0 16 16"><path d="M1 1 L1 12.5 L4.2 9.8 L6.3 14.6 L8.6 13.6 L6.5 8.9 L10.8 8.7 Z" fill="#ecedf2" stroke="#0b0b10" stroke-width="1"/></svg>
</div>
<div class="dm-swap-static"><span class="dm-slot-label">database</span>Oracle → Postgres → SurrealDB</div>
</div>
</div>
<div class="dm-path-col"><b>From idea to production</b><p>Prototype over a CSV file, graduate to SQL, ship behind an API — the screens and the queries stay the same.</p><span class="dm-journey" aria-hidden="true"><span class="dm-jstep"><small>idea</small><b>CSV file</b></span><span class="dm-jarrow">→</span><span class="dm-jstep"><b>SQL</b></span><span class="dm-jarrow">→</span><span class="dm-jstep"><small>production</small><b>API</b></span></span></div>
<div class="dm-path-col"><b>Open-source &amp; yours</b><p>Modern Rust that runs on your own infrastructure — fully open-source, forever in your control, and with no code that counts your seats.</p>
<ul class="dm-oss">
<li>Query builder</li>
<li>ORM</li>
<li>Active Record</li>
<li>Entity modeling</li>
</ul>
</div>
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
