# Solutions Section Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the three disconnected `/solutions/` pages with a four-page adoption ladder (Console → Live → Mesh → Enterprise) per the approved spec at `docs/superpowers/specs/2026-07-30-solutions-restructure-design.md`.

**Architecture:** Zola static site (`vantage-web2`). Content pages are markdown with TOML front matter in `content/solutions/`, rendered by `themes/vantage/templates/page.html` (hero from front matter, body through `prose`). The section index gets a dedicated template `solutions.html` (site convention: every major page has its own template). Old URLs survive via Zola `aliases`. A `zola serve` is ALWAYS running on port 1111 with auto-reload — never start or stop it; verify with `curl http://127.0.0.1:1111/...`.

**Tech Stack:** Zola (Tera templates), Tailwind v4 utility classes already defined by the theme (`card`, `kicker`, `btn`, `layer-stack`, `swap-benefits`, `journey-note`, `cap-card`, `code-card`), Material Symbols icons, vanilla JS module for the lead form.

## Global Constraints

- **No internal codenames** on any Solutions page: never `Diorama`, `Dio`, `Scenery`, `Lens`, `Vista`, `Servo`. Use "local cache", "live cache", "reactive views". Codenames remain only on `/framework/`.
- **Platform claim, exact string wherever platforms are mentioned in this section:** "macOS & Linux today; Windows builds are delivered for enterprise customers."
- **Privacy qualifier, exact string wherever telemetry/privacy is claimed:** "The free version bundles crash analytics; enterprise builds can disable it or point it at your own account."
- **Voice:** pain-first, engineer-to-engineer, short declaratives, "not X — Y" contrasts. No "powerful/seamless/revolutionary".
- **Commits:** single-line messages, no attribution lines, no Co-Authored-By (user rule overrides any default).
- **Never `sed -i` or heredoc rewrites** — use Read/Edit/Write tools only.
- **Do not run `zola serve`** — it is already running on port 1111 and auto-reloads on save.
- Every stage page ends with a "next rung" footer link; every page uses `template = "page.html"` except the section index.

---

### Task 1: Section index — ladder template + content

**Files:**
- Create: `themes/vantage/templates/solutions.html`
- Modify: `content/solutions/_index.md` (full replacement)

**Interfaces:**
- Produces: URLs `/solutions/internal-tools/`, `/solutions/live-data/`, `/solutions/data-mesh/`, `/solutions/enterprise/` are hardcoded in the template; Tasks 2–5 must create pages at exactly those paths.

- [ ] **Step 1: Write the new template**

Create `themes/vantage/templates/solutions.html`:

```html
{% extends "base.html" %}
{% import "macros/navigation.html" as nav %}

{% block title %}{{ section.title }} | {{ config.title }}{% endblock title %}

{% block content %}
{{ nav::header() }}

<!-- Section hero -->
<section class="relative overflow-hidden">
    <div class="glow -top-40 left-1/2 h-80 w-[36rem] -translate-x-1/2 opacity-70"></div>
    <div class="relative mx-auto max-w-6xl px-4 pt-16 pb-12 text-center sm:px-6 md:pt-24 md:pb-16">
        <p class="kicker mb-4">Solutions</p>
        <h1 class="text-display mx-auto max-w-3xl">{{ section.title }}</h1>
        {% if section.content %}
            <div class="prose mx-auto mt-5 max-w-2xl text-lg">{{ section.content | safe }}</div>
        {% endif %}
    </div>
</section>

<!-- The ladder: three stages -->
<section class="mx-auto max-w-6xl px-4 sm:px-6">
    <div class="grid gap-5 lg:grid-cols-3">
        <a href="/solutions/internal-tools/" class="card card-hover group flex flex-col p-6 no-underline">
            <span class="font-mono text-xs font-semibold tracking-[0.18em] text-accent-400">STAGE 01</span>
            <span class="material-symbols-outlined mt-4 mb-3 !text-[2.2rem] text-accent-400">space_dashboard</span>
            <h3 class="text-[1.05rem]">One console over the data you already have</h3>
            <p class="mt-2 text-sm leading-relaxed text-text-2">Point an AI agent at your systems; it authors one console over your databases, APIs, cloud and CLI tools — at the full power of your backends. Days, not months.</p>
            <span class="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-accent-400 transition-colors group-hover:text-accent-300">
                Explore<span class="material-symbols-outlined !text-[1rem] transition-transform group-hover:translate-x-0.5">arrow_forward</span>
            </span>
        </a>
        <a href="/solutions/live-data/" class="card card-hover group flex flex-col p-6 no-underline">
            <span class="font-mono text-xs font-semibold tracking-[0.18em] text-accent-400">STAGE 02</span>
            <span class="material-symbols-outlined mt-4 mb-3 !text-[2.2rem] text-accent-400">bolt</span>
            <h3 class="text-[1.05rem]">Everything live</h3>
            <p class="mt-2 text-sm leading-relaxed text-text-2">Open screens update by themselves, pushed not polled. Edits flow back. A draft survives a failed save. Dashboards stop lying.</p>
            <span class="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-accent-400 transition-colors group-hover:text-accent-300">
                Explore<span class="material-symbols-outlined !text-[1rem] transition-transform group-hover:translate-x-0.5">arrow_forward</span>
            </span>
        </a>
        <a href="/solutions/data-mesh/" class="card card-hover group flex flex-col p-6 no-underline">
            <span class="font-mono text-xs font-semibold tracking-[0.18em] text-accent-400">STAGE 03</span>
            <span class="material-symbols-outlined mt-4 mb-3 !text-[2.2rem] text-accent-400">hub</span>
            <h3 class="text-[1.05rem]">Wire in a real-time data mesh</h3>
            <p class="mt-2 text-sm leading-relaxed text-text-2">Dozens of partner services and your own systems, wired into one live fabric — then mint facade APIs, sidecars and embedded apps from it.</p>
            <span class="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-accent-400 transition-colors group-hover:text-accent-300">
                Explore<span class="material-symbols-outlined !text-[1rem] transition-transform group-hover:translate-x-0.5">arrow_forward</span>
            </span>
        </a>
    </div>

    <!-- Enterprise band -->
    <a href="/solutions/enterprise/" class="card card-hover group mt-5 flex flex-col gap-4 p-6 no-underline sm:flex-row sm:items-center">
        <span class="material-symbols-outlined !text-[2.2rem] text-accent-400">corporate_fare</span>
        <div class="flex-1">
            <h3 class="text-[1.05rem]">Vantage for your organisation</h3>
            <p class="mt-2 text-sm leading-relaxed text-text-2">A custom-built distribution — your datasources, your widgets, your telemetry — plus training and an architecture partner. Source escrow, MIT framework underneath, no seat-counting code in anything you deploy.</p>
        </div>
        <span class="inline-flex items-center gap-1 text-sm font-medium text-accent-400 transition-colors group-hover:text-accent-300">
            Explore<span class="material-symbols-outlined !text-[1rem] transition-transform group-hover:translate-x-0.5">arrow_forward</span>
        </span>
    </a>
</section>

<!-- Closing band: Rust for the enterprise -->
<section class="mt-20 border-y border-line bg-surface-1/60 py-16 md:py-20">
    <div class="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 class="text-h2">Rust is ready for the enterprise</h2>
        <p class="mx-auto mt-4 max-w-2xl text-text-2">Java carried enterprise software in 2000. Rust is already in your phone and your kernel — Vantage brings it to your business apps: seeing your data, acting on it, and building your own thing on tools that are yours.</p>
        <div class="mt-6">
            <a href="/solutions/enterprise/" class="btn btn-lg btn-primary">Talk to us about your organisation</a>
        </div>
    </div>
</section>

{{ nav::footer() }}
{% endblock content %}
```

- [ ] **Step 2: Replace the section index content**

Replace `content/solutions/_index.md` entirely with:

```markdown
+++
title = "Where Vantage fits"
description = "Vantage adoption happens in stages — a console over your existing data, everything live, then a real-time data mesh. Each stage is useful on its own."
template = "solutions.html"
sort_by = "weight"
+++

Vantage adoption happens in stages, and each stage is useful on its own. Start with one console over the data you already have. Make it live. Then wire your organisation into a real-time mesh — and when you roll it out org-wide, we partner with you.
```

- [ ] **Step 3: Verify the page renders**

Run: `curl -s http://127.0.0.1:1111/solutions/ | grep -c "STAGE 0"`
Expected: `3`

Run: `curl -s http://127.0.0.1:1111/solutions/ | grep -o "Rust is ready for the enterprise"`
Expected: `Rust is ready for the enterprise`

(The four card links 404 until Tasks 2–5 land — that is expected at this point.)

- [ ] **Step 4: Commit**

```bash
git add themes/vantage/templates/solutions.html content/solutions/_index.md
git commit -m "solutions: ladder index page with dedicated template"
```

---

### Task 2: Stage 1 page — internal-tools

**Files:**
- Create: `content/solutions/internal-tools.md`
- Delete: `content/solutions/internal-tools-teams.md`

**Interfaces:**
- Consumes: URL contract from Task 1 (`/solutions/internal-tools/`).
- Produces: alias serving the old `/solutions/internal-tools-teams/` URL; next-rung link to `/solutions/live-data/` (Task 3).

- [ ] **Step 1: Create the new page**

Create `content/solutions/internal-tools.md`. The `share-flow` and `connect-hub` HTML blocks are carried over from the old page unchanged except where noted:

```markdown
+++
title = "One console over the data you already have"
description = "Replace the drawer of homegrown tools with one AI-authored console over your databases, APIs, cloud and CLI tools — at the full power of your backends."
template = "page.html"
weight = 1
aliases = ["/solutions/internal-tools-teams/"]

[extra]
kicker = "Solutions · Stage 1"
icon = "space_dashboard"
+++

Engineering and SRE teams end up running a platform through a drawer full of old custom-built tools — a script here, a half-maintained dashboard there, an internal admin nobody wants to touch. Every one of them is one more thing to keep alive. The usual alternative is a Retool-class builder: rigid, working against its own database, with role management on a vendor's server and code that counts your seats.

**Vantage UI is a third option.** Point an AI agent at your systems; it authors the console — declarative YAML plus Rhai logic — over a local MCP server, verifying its own work as it goes. And it runs at the full power of your backends: Postgres with subqueries and all, Salesforce, your internal APIs, AWS, CI, CLI tools — as up-to-date records, logs and, when you want them, charts. Months of development becomes days.

Unlike a tool like DataDog, which pulls all your data into its own cloud to show it back to you, Vantage leaves the data where it already lives and reads it in real time. Nothing to ingest, nothing to ship out — and you can finally retire those old custom-built things.

## One console, unlimited uses

- **Monitor multi-cluster infrastructure in real time** — without opening Datadog.
- **Aggregate temperature-sensor data** from the devices on your floor.
- **Show your delivery vehicles on a live map** — and reassign a route from the same screen.

Wildly different jobs, same console: if it holds data or takes a command, Vantage can show it and act on it.

## Build once, share with the whole team

One person builds the tool. Everyone else just opens a link. Because a Vantage app is only config, sharing it is sharing a git repo — the console travels, the data never does.

<div class="share-flow" aria-label="How a Vantage app is built once and shared with a team">
  <div class="share-node">
    <span class="share-num">1</span>
    <span class="material-symbols-outlined share-ico">smart_toy</span>
    <h4>You build it</h4>
    <p>Download Vantage and let your local coding agent wire up the whole app — pages, tables, Rhai logic — over MCP.</p>
  </div>

  <div class="share-link">
    <span class="share-tag">app config</span>
    <span class="share-track"><span class="share-dot"></span></span>
  </div>

  <div class="share-node share-hub">
    <span class="share-num">2</span>
    <span class="material-symbols-outlined share-ico">publish</span>
    <h4>Publish to GitHub</h4>
    <p>Push the folder of YAML + Rhai to your corporate GitHub space. It's just code — no data, no credentials.</p>
  </div>

  <div class="share-link">
    <span class="share-tag">a link</span>
    <span class="share-track"><span class="share-dot"></span></span>
  </div>

  <div class="share-node share-team">
    <span class="share-num">3</span>
    <span class="share-avatars"><i></i><i></i><i></i></span>
    <h4>The team opens it</h4>
    <p>One link installs Vantage and pulls the app from GitHub. Each person authorizes their own database connection — and they're in.</p>
  </div>
</div>

<p class="share-footnote"><span class="material-symbols-outlined">shield</span> App config stays private to your organisation, and access credentials are only ever stored locally — password-manager style. OAuth and SSO login loops are supported: a window opens, the user signs in, and the token is cached locally.</p>

## One console, every backend

Internal work is scattered across tools: the AWS console in one tab, your own API in another, GitHub, a terminal for that one script, the database client. Vantage pulls them into a single sidebar — each becomes a group of tables, forms and actions.

<div class="connect-hub">
<svg class="connect-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><line x1="50" y1="50" x2="17" y2="18" vector-effect="non-scaling-stroke"/><line x1="50" y1="50" x2="50" y2="14" vector-effect="non-scaling-stroke"/><line x1="50" y1="50" x2="83" y2="18" vector-effect="non-scaling-stroke"/><line x1="50" y1="50" x2="17" y2="82" vector-effect="non-scaling-stroke"/><line x1="50" y1="50" x2="83" y2="82" vector-effect="non-scaling-stroke"/></svg>
<div class="connect-grid">
<div class="connect-node cn-aws"><span class="material-symbols-outlined cn-ico">cloud</span><span class="cn-text"><b>AWS</b><small>infrastructure</small></span></div>
<div class="connect-node cn-db"><span class="material-symbols-outlined cn-ico">table</span><span class="cn-text"><b>DynamoDB</b><small>tables &amp; items</small></span></div>
<div class="connect-node cn-api"><span class="material-symbols-outlined cn-ico">api</span><span class="cn-text"><b>Your APIs</b><small>REST &amp; GraphQL</small></span></div>
<div class="connect-node cn-hub"><span class="material-symbols-outlined cn-hub-ico">space_dashboard</span><b>Vantage UI</b><small>one purpose-built console</small></div>
<div class="connect-node cn-gh"><span class="material-symbols-outlined cn-ico">code</span><span class="cn-text"><b>GitHub</b><small>repos &amp; issues</small></span></div>
<div class="connect-node cn-tools"><span class="material-symbols-outlined cn-ico">terminal</span><span class="cn-text"><b>Custom tools</b><small>any CLI you run</small></span></div>
</div>
</div>

<p class="connect-benefit"><span class="material-symbols-outlined">bolt</span> Instead of juggling five tools and copy-pasting IDs between tabs, you get one console built for exactly your job — and because it's just config, it evolves as fast as you can describe the next thing.</p>

## Why teams pick it

- **Fast and reactive.** A smart local cache keeps big grids instant, tables refresh in the background, and logs stream in real time — no spinners, no manual reloads.
- **Far less friction than the AWS console.** One purpose-built screen instead of clicking through a clunky web console hunting for the resource you need.
- **Customise everything.** Make any cell clickable, define your own actions and workflows, and wire up exactly the buttons your team needs — not a fixed set someone else chose.
- **Peace of mind, locally.** It all runs on your own machine. You can read every line of YAML and Rhai, see exactly what the tool does, and keep evolving it as the work changes.

## The DBeaver test

If a database client on a cleared laptop passes your security review, Vantage has the same model — and your existing development practice applies unchanged:

- **Dev credentials while building.** You develop against your dev environment; production credentials only exist where the app is live.
- **The agent reads, it doesn't write.** The AI agent's MCP access to a running Vantage is read-only — debug queries and logs. Writes happen only through the app, by whoever is driving it, under their own credentials.
- **The PII-cleared team gets the prod build.** Publish the app as a zip; the cleared team installs and connects with production access. Developers — and their agents — never see it.
- **Nothing phones home unqualified.** The free version bundles crash analytics; enterprise builds can disable it or point it at your own account.

## See it in action

**Periscope** is this shape for Kubernetes — a full control room built entirely from YAML, drilling from namespaces to workloads to pods. The **AWS control console example** wraps the `aws` CLI to surface exactly the resources you operate, nothing more. (Landing in the examples repo soon.)

<div class="my-4">
    <a href="/examples/" class="btn btn-primary me-2">Browse the examples</a>
    <a href="/download/" class="btn btn-outline-primary">Download — free</a>
</div>

<p class="journey-note"><span class="material-symbols-outlined">arrow_forward</span><span><b>Next rung:</b> your console is already live — open screens update by themselves. <a href="/solutions/live-data/">Here's what that means →</a></span></p>
```

- [ ] **Step 2: Delete the old page**

```bash
git rm content/solutions/internal-tools-teams.md
```

- [ ] **Step 3: Verify page and alias**

Run: `curl -s http://127.0.0.1:1111/solutions/internal-tools/ | grep -o "The DBeaver test"`
Expected: `The DBeaver test`

Run: `curl -s http://127.0.0.1:1111/solutions/internal-tools-teams/ | grep -o 'http-equiv="refresh"'`
Expected: `http-equiv="refresh"` (Zola alias redirect page)

Run: `curl -s http://127.0.0.1:1111/solutions/internal-tools/ | grep -ci "diorama"`
Expected: `0`

- [ ] **Step 4: Commit**

```bash
git add content/solutions/internal-tools.md
git commit -m "solutions: stage-1 internal-tools page replaces internal-tools-teams"
```

---

### Task 3: Stage 2 page — live-data

**Files:**
- Create: `content/solutions/live-data.md`

**Interfaces:**
- Consumes: URL contract from Task 1 (`/solutions/live-data/`); linked from Task 2's next-rung note.
- Produces: next-rung link to `/solutions/data-mesh/` (Task 4).

- [ ] **Step 1: Create the page**

Create `content/solutions/live-data.md`:

```markdown
+++
title = "Everything live"
description = "Open screens update by themselves within about a second — pushed, not polled. Edits flow back, and a draft survives a failed save."
template = "page.html"
weight = 2

[extra]
kicker = "Solutions · Stage 2"
icon = "bolt"
+++

Dashboards lie. Between polls the numbers are stale, the refresh button is a confession, and by the time an ops person acts on a row, the row has moved on. Retool-class tools poll; a fast poll is still a poll.

**In Vantage, open screens update by themselves** — when data changes anywhere in the organisation, every screen showing it catches up within about a second. No refresh button. Changes are pushed from the source where the source can push, and the local cache paints instantly either way.

And the data flows both ways. Edit a cell, submit a form, trigger an action — writes go back through the same layer. Fields you haven't touched keep tracking upstream changes live; fields you have touched hold your value until you save. **A draft survives a failed save.**

## Honest freshness, per backend

Not every backend can push, and Vantage never pretends otherwise. Each connection advertises exactly what it delivers — push where the source supports it, polling where it doesn't, stated up front:

| Backend | Mechanism | Freshness |
| --- | --- | --- |
| SurrealDB | live queries | **push** — no setup |
| SpacetimeDB | subscriptions | **push** — no setup |
| PostgreSQL | notify channels | **push** — one trigger, explicit opt-in |
| SQLite · MySQL · MongoDB · REST · GraphQL · AWS · Kubernetes · CLI | background refresh | **poll** — interval you choose |

A capability the backend doesn't have is an explicit "not supported", never a silent guess — so what the screen shows is what the source knows.

## Built to ride a bad backend

The **Launch Control** example runs against a deliberately slow, flaky API — injected latency and random 503s. The grids ride straight through: rows never blank out on an error, the last known state stays on screen, and the refresh catches up when the backend does.

<div class="my-4">
    <a href="/examples/launch-control/" class="btn btn-primary me-2">Tour Launch Control</a>
    <a href="/examples/" class="btn btn-outline-primary">Browse the examples</a>
</div>

<p class="journey-note"><span class="material-symbols-outlined">arrow_forward</span><span><b>Next rung:</b> your console is live on your desk — now ship that liveness to your users. <a href="/solutions/data-mesh/">Wire in a real-time data mesh →</a></span></p>
```

- [ ] **Step 2: Verify**

Run: `curl -s http://127.0.0.1:1111/solutions/live-data/ | grep -o "Honest freshness, per backend"`
Expected: `Honest freshness, per backend`

Run: `curl -s http://127.0.0.1:1111/solutions/live-data/ | grep -ciE "diorama|scenery|servo"`
Expected: `0`

- [ ] **Step 3: Commit**

```bash
git add content/solutions/live-data.md
git commit -m "solutions: stage-2 live-data page"
```

---

### Task 4: Stage 3 page — data-mesh

**Files:**
- Create: `content/solutions/data-mesh.md`
- Delete: `content/solutions/developers.md`

**Interfaces:**
- Consumes: URL contract from Task 1 (`/solutions/data-mesh/`); linked from Task 3's next-rung note.
- Produces: alias serving `/solutions/developers/`; next-rung link to `/solutions/enterprise/` (Task 5).

- [ ] **Step 1: Create the page**

Create `content/solutions/data-mesh.md`. The `layer-stack`, `swap-benefits`, `journey`, and `code-card` blocks are carried over from the old developers page with codenames removed as shown:

```markdown
+++
title = "Wire your organisation into a real-time data mesh"
description = "Your business runs on dozens of partner services plus your own systems. Vantage wires them into one live mesh — then you mint facade APIs, sidecars and embedded apps from it."
template = "page.html"
weight = 3
aliases = ["/solutions/developers/"]

[extra]
kicker = "Solutions · Stage 3"
icon = "hub"
+++

An enterprise doesn't run on one database. It runs on dozens of external partners — sending email, storing sales data, analysing images, running AI workflows, aggregating big data — plus its own databases, APIs and infrastructure. Today that is dozens of consoles, dozens of credentials, and polling scripts holding it together with no single fabric.

**Vantage wires it all into one internal, live data mesh.** The mesh is defined declaratively — and Vantage UI is where you see it and shape it, your AI agent doing the tweaking, until it works in front of your eyes. Not just seeing the data: acting on it.

Rather than controlling everything, Vantage gives you the tools to build your own thing. The framework underneath is free forever, MIT: a query builder, an entity manager, active record, and the tools for live data in multi-threaded apps.

## Mint artifacts from the mesh

Once the mesh is defined, Rust's versatility is the payoff. The same definitions that drive your console become deployable software:

<div class="swap-benefits">
<div class="swap-benefit"><span class="material-symbols-outlined">cloud_done</span><div><b>Facade APIs</b><p>A reactive cache-at-edge your web and mobile apps talk to — instant reads, streamed changes. The flagship artifact, detailed below.</p></div></div>
<div class="swap-benefit"><span class="material-symbols-outlined">settings_ethernet</span><div><b>Sidecars &amp; edge proxies</b><p>Thin Rust services that sit beside your workloads — deployed as Lambda or on Kubernetes, fully yours.</p></div></div>
<div class="swap-benefit"><span class="material-symbols-outlined">smartphone</span><div><b>Embedded in your apps</b><p>Link the data layer straight into a mobile, desktop or embedded app — a local cache on a background thread, reactive events to your UI.</p></div></div>
</div>

## The facade API, up close

Your web and mobile apps are only as fast as the network between them and your backend. Every screen round-trips a database that's hundreds of milliseconds away, so lists arrive with a spinner, data goes stale the moment it lands, and every team ends up rebuilding the same caching, retry and state-sync plumbing by hand.

**A Vantage facade API sits in front of your data** — a small service you deploy close to your users that keeps a live local copy, answers reads instantly from it, and streams every change back into your app as it happens. Your frontend flips from passive REST to an active stream.

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

Putting together a React web app is a simple matter — you can vibe-code it. What's crucial is the plumbing underneath: two-way communication, conflict resolution, horizontal scaling. That's what Vantage solves.

## A gradual path, not a rewrite

You don't cut over all at once. Stand a Vantage facade up in front of the databases you already have, move one screen onto it, and let the rest keep hitting the old backend. Migrate at your pace, then delete the legacy tier behind it — no risky big-bang.

<div class="swap-benefits">
<div class="swap-benefit"><span class="material-symbols-outlined">swap_horiz</span><div><b>Swap databases underneath</b><p>The facade is backend-agnostic — read from one store and write through another while you migrate, without your clients noticing.</p></div></div>
<div class="swap-benefit"><span class="material-symbols-outlined">delete_sweep</span><div><b>Delete plumbing you own</b><p>No more hand-rolled caching, retry and state-sync in the client — the facade does it once, correctly, for every screen.</p></div></div>
<div class="swap-benefit"><span class="material-symbols-outlined">lock_open</span><div><b>Open-source &amp; yours</b><p>High-performance modern Rust that runs on your own infrastructure — fully open-source, no code that counts your seats, forever in your control.</p></div></div>
</div>

<p class="journey-note"><span class="material-symbols-outlined">construction</span><span>The framework — the live cache, reactive views and the watch adapter — ships open-source on <a href="https://crates.io/search?q=vantage-" target="_blank" rel="noopener">crates.io</a> with a full guide today; build the facade now. Generating and hosting these facades for you as a managed service, and managing API routes from inside Vantage UI, are on the <a href="/features/">roadmap</a>.</span></p>

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
```

- [ ] **Step 2: Delete the old page**

```bash
git rm content/solutions/developers.md
```

- [ ] **Step 3: Verify**

Run: `curl -s http://127.0.0.1:1111/solutions/data-mesh/ | grep -o "Mint artifacts from the mesh"`
Expected: `Mint artifacts from the mesh`

Run: `curl -s http://127.0.0.1:1111/solutions/developers/ | grep -o 'http-equiv="refresh"'`
Expected: `http-equiv="refresh"`

Run: `curl -s http://127.0.0.1:1111/solutions/data-mesh/ | grep -cE "\bDio\b|Scenery"`
Expected: `0`

- [ ] **Step 4: Commit**

```bash
git add content/solutions/data-mesh.md
git commit -m "solutions: stage-3 data-mesh page absorbs the developers page"
```

---

### Task 5: Enterprise page + lead form

**Files:**
- Create: `content/solutions/enterprise.md`
- Create: `static/js/enterprise-lead.js`

**Interfaces:**
- Consumes: URL contract from Task 1 (`/solutions/enterprise/`); the SurrealDB leads endpoint already used by `static/js/framework.js` (`https://close-wasp-06fmkfm5uhq2f77ih987dcdac4.aws-euw1.surreal.cloud/signup`, ns `main`, db `vantage-leads`, ac `submit`).
- Produces: `#contact` anchor with a working lead form; Task 6 points the framework page's outro here.

- [ ] **Step 1: Create the form script**

Create `static/js/enterprise-lead.js` (same submit contract as `framework.js` lines 410–462, without the stack picker):

```js
/* Enterprise lead form: submits straight into SurrealDB via the public
   insert-only record access (no secret in the page, no relay API);
   falls back to a mailto if the request fails. */
const LEADS = {
  endpoint: "https://close-wasp-06fmkfm5uhq2f77ih987dcdac4.aws-euw1.surreal.cloud/signup",
  ns: "main", db: "vantage-leads", ac: "submit",
};

const form = document.getElementById("ent-form");
if (form) form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = new FormData(form);
  const lead = {
    organisation: f.get("org"),
    email: f.get("email"),
    phone: f.get("phone") || "",
    notes: f.get("notes") || "",
    stack: "enterprise page",
    config_url: location.href,
  };

  const mailtoFallback = () => {
    const body =
      `Organisation: ${lead.organisation}\nEmail: ${lead.email}\nPhone: ${lead.phone || "-"}\n\n` +
      `Notes:\n${lead.notes || "-"}`;
    location.href = "mailto:hello@vantage-ui.com" +
      `?subject=${encodeURIComponent("Enterprise enquiry — " + lead.organisation)}` +
      `&body=${encodeURIComponent(body)}`;
  };

  const btn = form.querySelector("button[type=submit]");
  if (btn) btn.disabled = true;
  try {
    const res = await fetch(LEADS.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ns: LEADS.ns, db: LEADS.db, ac: LEADS.ac, ...lead }),
    });
    const data = res.ok ? await res.json().catch(() => ({})) : {};
    if (!res.ok || !data.token) throw new Error(`lead signup failed (${res.status})`);
    const thanks = document.createElement("p");
    thanks.className = "mx-auto max-w-xl text-text-2";
    thanks.textContent = "Thank you — we'll come back with a proposed stack.";
    form.replaceChildren(thanks);
  } catch (err) {
    if (btn) btn.disabled = false;
    mailtoFallback();
  }
});
```

- [ ] **Step 2: Create the page**

Create `content/solutions/enterprise.md`. The form reuses the `.fw3-form` styles, which live in `framework.html`'s inline CSS — so the form carries its own minimal inline styles instead (plain Tailwind-ish utilities used site-wide):

```markdown
+++
title = "Vantage for your organisation"
description = "A custom-built distribution of Vantage UI — your datasources, your widgets, your telemetry — plus training, framework support and source escrow."
template = "page.html"
weight = 4

[extra]
kicker = "Solutions · Enterprise"
icon = "corporate_fare"
+++

Everything on the previous pages — the console, the live layer, the mesh — packaged and partnered for an organisation. Not a seat license on somebody else's cloud: a build of Vantage that is yours, a team that trains yours, and an exit position in writing.

## Your own distribution of Vantage UI

The enterprise version is a custom build, assembled for your organisation:

- **Your datasources.** Choose which of the built-in backends ship in it — and add custom ones built on the open framework, up to Debezium-grade change-data-capture for the databases you actually run: Oracle, SQL Server, Db2.
- **Your widgets.** Custom UI components — developed by us or by your own team — compiled into your build.
- **Your telemetry.** The free version bundles crash analytics; enterprise builds can disable it or point it at your own account.
- **Your install domain.** `vantage://` app installs restricted to an allowlist you control — your organisation's apps, nobody else's.
- **Your data models, typed.** Beyond YAML: entity models in Rust via the open framework — custom triggers, custom validation, versioned as an ordinary crate your whole org shares.

**Build and distribution pipeline, set up for you.** You deliver the tweak; we re-package. Certify the build and pre-install it across your fleet. macOS & Linux today; Windows builds are delivered for enterprise customers.

## An architecture partner, not a license vendor

We help you design the mesh, and we train your teams — how to build with Vantage, and how to rely on AI properly, so the codebase your agents produce stays reviewable engineering instead of turning into slop.

## Built so you can leave

The parts of Vantage you deploy are the parts you keep:

- **Source escrow.** If Vantage is discontinued through bankruptcy or acquisition, you receive the Vantage UI source code.
- **MIT underneath.** The framework — query builder, entity manager, active record, live-data tools — is open source, forever.
- **Your facades, your domain.** Every API, sidecar and app you generate runs on your infrastructure, and none of it contains code that counts your seats.

Java carried enterprise software in 2000. Rust is already in your phone and your kernel — with Vantage, it's ready to carry your business apps.

## Talk to us

<form id="ent-form" style="margin:2rem auto 0;max-width:34rem;display:grid;grid-template-columns:1fr 1fr;gap:.75rem">
  <input style="grid-column:1/-1" class="rounded-lg border border-line bg-surface-1 px-4 py-3" name="org" placeholder="Organisation name" required autocomplete="organization">
  <input type="email" class="rounded-lg border border-line bg-surface-1 px-4 py-3" name="email" placeholder="Contact email" required autocomplete="email">
  <input type="tel" class="rounded-lg border border-line bg-surface-1 px-4 py-3" name="phone" placeholder="Phone (optional)" autocomplete="tel">
  <textarea style="grid-column:1/-1" class="rounded-lg border border-line bg-surface-1 px-4 py-3" name="notes" rows="4" placeholder="Tell us about your data landscape — the sources you run, scale, timelines"></textarea>
  <button type="submit" style="grid-column:1/-1;justify-self:center;min-width:15rem" class="btn btn-lg btn-primary">
    <span class="material-symbols-outlined">send</span>
    Get in touch
  </button>
</form>

<p class="mx-auto mt-6 max-w-xl text-center text-sm text-text-3">Tell us about your data landscape — we'll come back with a proposed stack.</p>

<script type="module" src="/js/enterprise-lead.js"></script>
```

- [ ] **Step 3: Verify**

Run: `curl -s http://127.0.0.1:1111/solutions/enterprise/ | grep -o "ent-form"`
Expected: `ent-form` (twice is fine)

Run: `curl -s http://127.0.0.1:1111/js/enterprise-lead.js | grep -o "vantage-leads"`
Expected: `vantage-leads`

- [ ] **Step 4: Manually check the form once in a browser**

Open `http://127.0.0.1:1111/solutions/enterprise/`, submit a test lead ("Test Org" / a real-looking email), confirm the thank-you replaces the form. This writes one test row into the `vantage-leads` SurrealDB — acceptable; it is the same database the framework page already writes to.

- [ ] **Step 5: Commit**

```bash
git add content/solutions/enterprise.md static/js/enterprise-lead.js
git commit -m "solutions: enterprise page with lead form"
```

---

### Task 6: Retire app-builders; repoint framework outro and tour buttons

**Files:**
- Delete: `content/solutions/app-builders.md`
- Modify: `content/framework.md` (add alias)
- Modify: `themes/vantage/templates/framework.html:450-470` (outro: form → link)
- Modify: `themes/vantage/templates/launch-control.html:801`, `themes/vantage/templates/periscope.html:1198`, `themes/vantage/templates/periscope2.html:477`

**Interfaces:**
- Consumes: `/solutions/enterprise/` (Task 5), `/solutions/` (Task 1).

- [ ] **Step 1: Delete app-builders and alias its URL to /framework/**

```bash
git rm content/solutions/app-builders.md
```

Edit `content/framework.md` front matter to add the alias:

```toml
+++
title = "Framework"
description = "Cut the Vantage stack open. Six layers of a compiled Rust data engine — Vantage UI, Scenery, Diorama, Vista, Entity Tables and a multi-dialect query builder at the core. Every layer swaps."
template = "framework.html"
aliases = ["/solutions/app-builders/"]
+++
```

- [ ] **Step 2: Replace the framework outro form with a link to the enterprise page**

In `themes/vantage/templates/framework.html`, replace the block from `<form id="fw3-form" ...>` through its closing `</form>` plus the following `<p ...>Our customer care team will be in touch...</p>` line (lines 458–468) with:

```html
        <div class="mt-8">
            <a href="/solutions/enterprise/" class="btn btn-lg btn-primary">
                <span class="material-symbols-outlined">corporate_fare</span>
                Discuss your stack with us
            </a>
        </div>
        <p class="mx-auto mt-6 max-w-xl text-sm text-text-3">Custom builds, training and support live on the <a href="/solutions/enterprise/">enterprise page</a>. Curious about the internals first? The <a href="{{ book }}" target="_blank" rel="noopener">book</a> has them.</p>
```

Leave the `fw3-config` stack table and the `#fw3-cta` section intact. (`framework.js` null-checks `#fw3-form`, so removing the form is safe; the dead lead-submit code in `framework.js` can stay.)

Also update the outro lead line (line 453) and its JS-swapped variants: in `framework.html` line 453 change the text to `You have selected custom components — we can assemble this stack for your organisation:`, and in `static/js/framework.js` lines 405–406 change the two strings to `"You have selected custom components — we can assemble this stack for your organisation:"` and `"This is your stack — every layer built into Vantage UI. Swap any layer above, or ask us to shape one around your systems:"`.

- [ ] **Step 3: Repoint the three tour buttons**

In each of `launch-control.html:801`, `periscope.html:1198`, `periscope2.html:477`, change:

```html
<a href="/solutions/app-builders/" class="btn btn-outline-secondary">
```

to:

```html
<a href="/solutions/" class="btn btn-outline-secondary">
```

and change each button's label text (the line(s) inside the `<a>`) to `Where Vantage fits`.

- [ ] **Step 4: Verify**

Run: `curl -s http://127.0.0.1:1111/solutions/app-builders/ | grep -o 'http-equiv="refresh"'`
Expected: `http-equiv="refresh"`

Run: `curl -s http://127.0.0.1:1111/framework/ | grep -c "fw3-form"`
Expected: `0` (CSS class definitions may remain; the grep target is the form id — if CSS rules still match, refine to `grep -c 'id="fw3-form"'` expecting 0)

Run: `curl -s http://127.0.0.1:1111/examples/launch-control/ | grep -o "Where Vantage fits"`
Expected: `Where Vantage fits`

- [ ] **Step 5: Commit**

```bash
git add content/framework.md themes/vantage/templates/framework.html static/js/framework.js themes/vantage/templates/launch-control.html themes/vantage/templates/periscope.html themes/vantage/templates/periscope2.html
git commit -m "solutions: retire app-builders, repoint framework outro and tour buttons"
```

---

### Task 7: Navigation, examples catalog, homepage link

**Files:**
- Modify: `content/navigation.yaml:5-13`
- Modify: `static/examples-catalog.yaml` (six `persona`/`persona_url` pairs)
- Modify: `themes/vantage/templates/index.html` (insert one band after the how-it-works section, line 147)
- Modify: `/Users/rw/Work/vantage-ui-examples/catalog.yaml` (same six persona pairs — separate repo, separate commit)

**Interfaces:**
- Consumes: all four page URLs from Tasks 2–5.

- [ ] **Step 1: Update the nav dropdown**

In `content/navigation.yaml`, replace the Solutions entry (lines 5–13) with:

```yaml
  - title: "Solutions"
    url: "/solutions/"
    dropdown:
      - title: "Internal tools"
        url: "/solutions/internal-tools/"
      - title: "Live data"
        url: "/solutions/live-data/"
      - title: "Data mesh"
        url: "/solutions/data-mesh/"
      - title: "Enterprise"
        url: "/solutions/enterprise/"
```

- [ ] **Step 2: Remap the catalog persona badges (fallback copy)**

In `static/examples-catalog.yaml`, apply exactly these changes:

- `launch-control`: `persona: "Live data"`, `persona_url: "/solutions/live-data/"`
- `periscope`: `persona: "Internal tools"`, `persona_url: "/solutions/internal-tools/"`
- `library-story`: `persona: "Internal tools"`, `persona_url: "/solutions/internal-tools/"`
- `bakery`: `persona: "Internal tools"`, `persona_url: "/solutions/internal-tools/"`
- `spacex`: `persona: "Data mesh"`, `persona_url: "/solutions/data-mesh/"`
- `aws-console`: `persona: "Internal tools"`, `persona_url: "/solutions/internal-tools/"`

- [ ] **Step 3: Add the homepage band**

In `themes/vantage/templates/index.html`, insert immediately after the how-it-works section's closing `</section>` (line 147):

```html
<!-- ── Solutions ladder teaser ─────────────────────────── -->
<section class="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
    <h2 class="text-h2">Where Vantage fits</h2>
    <p class="mx-auto mt-4 max-w-2xl text-text-2">Adoption happens in stages — one console over the data you already have, everything live, then a real-time data mesh across your organisation. Each stage is useful on its own.</p>
    <div class="mt-6">
        <a href="/solutions/" class="btn btn-lg btn-outline-primary">Explore solutions</a>
    </div>
</section>
```

- [ ] **Step 4: Verify site-side changes**

Run: `curl -s http://127.0.0.1:1111/ | grep -o "Where Vantage fits"`
Expected: `Where Vantage fits`

Run: `curl -s http://127.0.0.1:1111/ | grep -o "/solutions/enterprise/"` (nav dropdown renders on every page)
Expected: at least one match

Run: `curl -s http://127.0.0.1:1111/examples/ | grep -c "/solutions/internal-tools-teams/\|/solutions/app-builders/\|/solutions/developers/"`
Expected: `0` — but note the examples page loads the REMOTE catalog at build time and falls back to the local copy; if old URLs still appear, they come from the remote `catalog.yaml` and Step 6 fixes the source (the fallback is what we control here).

- [ ] **Step 5: Commit (vantage-web2)**

```bash
git add content/navigation.yaml static/examples-catalog.yaml themes/vantage/templates/index.html
git commit -m "solutions: nav dropdown, catalog persona badges, homepage teaser band"
```

- [ ] **Step 6: Update the upstream catalog (separate repo)**

In `/Users/rw/Work/vantage-ui-examples/catalog.yaml`, apply the same six persona changes as Step 2. Then, in that repo:

```bash
git -C /Users/rw/Work/vantage-ui-examples status
```

If the working tree is otherwise clean and on the default branch, commit:

```bash
git -C /Users/rw/Work/vantage-ui-examples add catalog.yaml
git -C /Users/rw/Work/vantage-ui-examples commit -m "catalog: remap persona badges to restructured solutions pages"
```

Do NOT push either repo — the user reviews and pushes.

---

### Task 8: Final QA sweep

**Files:** none (verification only; fix-in-place if a check fails)

- [ ] **Step 1: Codename sweep**

Run: `grep -riE "diorama|scenery|\bdio\b|\bvista\b|servo|\blens\b" /Users/rw/Work/vantage-web2/content/solutions/`
Expected: the only match is the guide URL `intro/step5-sql-dio.html` in `data-mesh.md` (a docs link, not prose); no other matches. (`content/framework.md` keeping codenames is correct — only `content/solutions/` prose must be clean.)

- [ ] **Step 2: Platform + privacy claim sweep within the section**

Run: `grep -riE "\bmacOS\b|\bwindows\b|\blinux\b|for Mac" /Users/rw/Work/vantage-web2/content/solutions/`
Expected: the only platform statement is the exact global-constraints string on `enterprise.md`. The download CTA on `internal-tools.md` says "Download — free" (no platform named).

Run: `grep -ri "crash analytics" /Users/rw/Work/vantage-web2/content/solutions/`
Expected: the exact qualifier string on `internal-tools.md` and `enterprise.md`.

- [ ] **Step 3: Full build check**

Run: `cd /Users/rw/Work/vantage-web2 && zola build --output-dir /tmp/zola-qa --force 2>&1 | tail -5`
Expected: `Done in ...` with no errors. (This does not touch the running `zola serve`.)

- [ ] **Step 4: Ladder walk**

Run each and expect one match apiece:

```bash
curl -s http://127.0.0.1:1111/solutions/internal-tools/ | grep -o "/solutions/live-data/" | head -1
curl -s http://127.0.0.1:1111/solutions/live-data/ | grep -o "/solutions/data-mesh/" | head -1
curl -s http://127.0.0.1:1111/solutions/data-mesh/ | grep -o "/solutions/enterprise/" | head -1
```

- [ ] **Step 5: Report**

No commit. Report the QA results to the user, including the reminder that the remote `catalog.yaml` fetch means the examples page shows old persona badges until `vantage-ui-examples` is pushed/merged.
```
