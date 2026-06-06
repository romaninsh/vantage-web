+++
title = "Web & mobile backends"
description = "Go from idea to a working app backend — Vantage scaffolds the admin on a schemaless database, you add logic in Rhai, then export a restricted API your web and mobile clients call."
template = "page.html"
weight = 2

[extra]
kicker = "Solutions"
icon = "rocket_launch"
+++

You're building a new product. Before the first screen ships you already need a database, an admin to see and fix data, business logic, and eventually an API for your web and mobile clients. That's days of plumbing before you've tested a single idea.

**Vantage collapses the early backend into one flow** — and lets you graduate to real, served APIs when you're ready.

## From idea to API

<div class="journey">
<div class="journey-phase">Available today</div>
<div class="journey-step today"><span class="journey-num">1</span><div class="journey-body"><h4>The idea</h4><p>A new product or feature gets the green light. You don't know the final data shape yet — and that's fine.</p></div></div>
<div class="journey-step today"><span class="journey-num">2</span><div class="journey-body"><h4>Describe it to Vantage</h4><p>Tell your agent what you're building. It scaffolds a UI on a schemaless SurrealDB — no migrations to write before you can click around.</p></div></div>
<div class="journey-step today"><span class="journey-num">3</span><div class="journey-body"><h4>Shape data &amp; logic</h4><p>Tweak records, add business rules in Rhai, wire up actions, and confirm the whole thing actually works end to end.</p></div></div>
<div class="journey-phase next-phase">On the roadmap</div>
<div class="journey-step next"><span class="journey-num">4</span><div class="journey-body"><h4>Add a restricted role <span class="soon-tag">soon</span></h4><p>Define a scoped role that exposes only what a public client should ever see.</p></div></div>
<div class="journey-step next"><span class="journey-num">5</span><div class="journey-body"><h4>Export the API <span class="soon-tag">soon</span></h4><p>Publish that role as a standalone endpoint — your data plus your Rhai logic, served as a real backend.</p></div></div>
<div class="journey-step next last"><span class="journey-num">6</span><div class="journey-body"><h4>Wire up your apps <span class="soon-tag">soon</span></h4><p>Point your web and mobile clients at the endpoint. The admin you built and the API your users hit share one source of truth.</p></div></div>
</div>

<p class="journey-note"><span class="material-symbols-outlined">construction</span><span>Steps 1–3 ship today. Roles and API export are the <a href="/features/">server-side facade APIs</a> on the roadmap — built on the Vantage Framework, which already powers facade services in Rust.</span></p>

## A gradual path, not a rewrite

In an existing codebase, Vantage is complementary. Stand up a facade or middleware API in front of the databases you already have, move a frontend onto it one screen at a time, then delete the legacy code behind it — no risky big-bang cutover.

<div class="stack-swap">
<div class="swap-row"><span class="swap-label">Today</span><div class="swap-flow"><div class="swap-node"><span class="material-symbols-outlined">database</span><b>Your database</b></div><span class="swap-arrow material-symbols-outlined">arrow_forward</span><div class="swap-node swap-legacy"><span class="material-symbols-outlined">dns</span><b>Backend API</b><small>hand-rolled · you maintain it</small></div><span class="swap-arrow material-symbols-outlined">arrow_forward</span><div class="swap-node"><span class="material-symbols-outlined">devices</span><b>Web &amp; mobile</b></div></div></div>
<div class="swap-row"><span class="swap-label accent">With Vantage</span><div class="swap-flow"><div class="swap-node"><span class="material-symbols-outlined">database</span><b>Any database</b><small>swap freely</small></div><span class="swap-arrow material-symbols-outlined">arrow_forward</span><div class="swap-node swap-vantage"><span class="material-symbols-outlined">bolt</span><b>Vantage API <span class="soon-tag">soon</span></b><small>generated · open-source Rust</small><span class="swap-tags"><i>Rust</i><i>Kubernetes</i><i>yours</i></span></div><span class="swap-arrow material-symbols-outlined">arrow_forward</span><div class="swap-node"><span class="material-symbols-outlined">devices</span><b>Web &amp; mobile</b><small>unchanged</small></div></div></div>
</div>

<div class="swap-benefits">
<div class="swap-benefit"><span class="material-symbols-outlined">delete_sweep</span><div><b>Delete the backend tier</b><p>No hand-rolled API to keep alive — generation handles the CRUD, the logic and the serving.</p></div></div>
<div class="swap-benefit"><span class="material-symbols-outlined">swap_horiz</span><div><b>Swap databases freely</b><p>Vantage is database-agnostic, so you can move to a new DB underneath without your clients noticing.</p></div></div>
<div class="swap-benefit"><span class="material-symbols-outlined">lock_open</span><div><b>Open-source &amp; yours</b><p>High-performance modern Rust that runs on your own Kubernetes — fully open-source and forever in your control.</p></div></div>
</div>

## Why developers pick it

- **Config-as-code, in your repo.** No generated-and-forgotten scaffolding — the backend is YAML plus Rhai you diff in a pull request.
- **Schemaless to start.** SurrealDB means no migration treadmill while the data shape is still moving.
- **Talks to what you already have.** SQL, SurrealDB, MongoDB, GraphQL, REST — read from one backend and write through another while you migrate.
- **Native and fast.** GPU-accelerated, virtualised tables that stay smooth past a million rows.

## See it in action

The **[SpaceX GraphQL example](/examples/)** points the console at a public GraphQL API — launches, rockets and capsules as browsable, drillable tables — so you can see exactly how a schema becomes a UI.

<div class="my-4">
    <a href="/examples/" class="btn btn-primary me-2">See the GraphQL example</a>
    <a href="/features/" class="btn btn-outline-primary">All features</a>
</div>
