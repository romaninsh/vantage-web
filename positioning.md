# Vantage — Positioning, Messaging & Website Copy

A working document for rebuilding the Vantage website. Three parts: **(1) Positioning strategy** —
the thinking. **(2) Homepage copy draft** — paste-ready. **(3) Content outline** — the full site
map.

> **Two open assumptions, flagged for you to resolve:**
>
> - **Platform:** copy below assumes **macOS-only today**. If cross-platform is on the roadmap, swap
>   "for Mac" → "desktop" and add a roadmap line. Decision needed before launch.
> - **Business model:** copy assumes **free download now, open-core later**. If there's a paid Pro
>   tier coming, the final CTA and the framework section should foreshadow it.

---

## Part 1 — Positioning Strategy

### The one-line positioning statement

> **Vantage is an AI-native, config-as-code console for everything you operate — databases, APIs,
> cloud infrastructure and command-line tools — running natively and privately on your own
> machine.**

### The category

You are deliberately **not** an app builder (Appsmith/Budibase) and **not** a database GUI
(Adminer/DBeaver). You're defining a third thing:

**An AI-native, config-as-code internal-tools console.**

- _Adminer / phpMyAdmin_ is the familiar reference point ("point at your data, get a usable UI") —
  but it's single-source, web, refresh-based, no dashboards, no AI.
- _Retool_ is the aspirational reference point (internal tools, ops consoles) — but it's
  cloud-hosted, click-to-build, JavaScript, and your config lives on someone else's platform.

Vantage's wedge against **both** is the same three-part combination nobody else offers together:
**native + local-first**, **config-as-code in git**, and **an AI agent that writes that config for
you over MCP**.

### Who it's for (technical buyers, in priority order)

1. **Internal-tools teams** who don't want to stand up a Retool instance or ship their data to
   someone's cloud.
2. **Developers building admin panels** who are tired of hand-rolling yet another CRUD backend /
   Django-admin clone.
3. **Platform & ops engineers** who want to wrap CLIs, AWS resources and APIs into one navigable,
   dashboard-able console.

Not targeting: no-code citizen developers or agencies. Don't water the message down for them.

### The differentiator pillars (the "unlike everything else" spine)

1. **Built by AI, not by clicking.** Describe the tool you need; an agent authors the config over a
   local MCP server. You stay in the loop — the agent does the typing.
2. **Config-as-code.** Everything is YAML in a folder _you_ own. Version it in git, diff it on
   review, hand it off. No opaque cloud-stored project state.
3. **Local-first & private.** Native app, your data never leaves your machine. No cloud backend, no
   telemetry, works offline.
4. **Native & reactive.** GPU-accelerated (GPUI), virtualised tables handle hundreds of thousands of
   rows. Edit the YAML or change the data — the UI updates live, no refresh.
5. **One console for everything you run.** SQL, SurrealDB, MongoDB, REST APIs, AWS infra, CLI tools
   — all as tables, forms, dialogs, dashboards and (soon) wizards.
6. **No lock-in — graduate out (roadmap).** Export your console to real code repos and container
   images that expose APIs to your frontend or mobile app. Start fast, leave with real code.
7. **Open foundation.** Built on the MIT-licensed Vantage Framework (Rust, on crates.io). The UI is
   one expression of it; build your own on the same crates.

### Messaging do's and don'ts

- ✅ Say **"reactive"** / **"live"**. ❌ Never say **"responsive"** — readers will picture mobile
  breakpoints, then feel misled by a native desktop app. (This is the single most important wording
  fix from your current site.)
- ✅ Pitch the AI confidently but **honestly**: "the agent builds your config — and gets better
  every release." ❌ Don't imply it's fully autonomous; it's shipping but early.
- ✅ Lead with **AI + ownership** (the unique tension). ❌ Don't lead with "navigate your databases"
  — that's the Adminer framing you're trying to escape.
- ✅ Treat **export-to-code** as a stated **vision/roadmap**, clearly future-tense.
- ❌ Avoid "powerful", "seamless", "revolutionary", "unleash". This audience smells fluff.

---

## Part 2 — Homepage Copy Draft (paste-ready)

### Hero

**Headline (primary):**

> Internal tools, built by AI. Owned by you.

**Alternates to A/B:**

> The AI-native console for everything you run. Describe it. The agent builds it. You own the code.

**Subhead:**

> Vantage is a native, local-first console for your databases, APIs, cloud infrastructure and
> command-line tools. Describe what you need — an AI agent writes the config as YAML in your own git
> repo. No cloud, no lock-in, no data leaving your machine.

**CTAs:** `[ Download for Mac — free ]` `[ See how the agent builds it ]`

**Caption under CTA:**

> Free for macOS. Built on the open-source, MIT-licensed Vantage Framework.

---

### "What it is" strip (one breath)

> Point Vantage at your data sources — or let an AI agent do it for you over a local MCP server —
> and it renders a native console: tables, forms, dashboards and dialogs across SQL, SurrealDB,
> MongoDB, REST and AWS. Everything is described in YAML you keep in git. Everything runs on your
> machine.

---

### "Unlike everything else" section (3 pillars — the spine)

**Built by AI, not by clicking** Retool and Appsmith make you drag widgets. Adminer makes you build
nothing at all. Vantage's agent reads your schema and writes the YAML — pages, tables, forms,
dashboards — over a local MCP server. You review and commit. The agent does the typing.

**Config-as-code, in your git repo** Your console is a folder of YAML you own. Diff it in a pull
request, roll it back, hand it to a teammate. No project state trapped in someone's cloud. Nothing
to migrate out of later.

**Runs on your machine, not someone's cloud** Native and GPU-accelerated. Your databases, your
config, your data — all local. No web server to host, no telemetry, no round-trip. Works on a plane.

---

### Feature blocks (recategorised from your current site + new capabilities)

**Multi-source sidebar** — _Now_ SQLite, Postgres, MySQL, SurrealDB, MongoDB and REST endpoints from
one config. Each source is its own group in the sidebar.

**AWS infrastructure as data** — _Now_ Browse S3 buckets, Lambdas and CloudWatch log groups as if
they were tables. Your infra becomes navigable like any other dataset.

**CLI tools as tables** — _Now_ Wrap a command-line tool and render its output as a live, sortable
table. Turn shell scripts into a console anyone on the team can use.

**Dashboards & graphs** — _Now_ Compose tables, metrics and graphs onto a dashboard page. One view
of the systems you run.

**Dialogs & API commands** — _Now_ Define dialogs and fire commands at your APIs from the UI — not
just read data, but act on it.

**Agent-driven via MCP** — _Now (and expanding)_ A local MCP server lets coding agents introspect
your data and author the YAML for you. Early, improving every release, and entirely on your machine.

**Reactive, no refresh** — _Now_ Edit the YAML and save — the UI updates in place. New data lands in
a table — it appears. No reload, no rebuild.

**Native performance** — _Now_ Built on GPUI for GPU-accelerated rendering. Virtualised tables
handle hundreds of thousands of rows without breaking a sweat.

**Wizards** — _Coming soon_ Multi-step flows for guided data entry and operations.

> _Tag each block Now / Coming soon so visitors trust the live ones. Don't bury shipped AI under a
> "coming soon" label like the current site does — that undercuts your headline._

---

### Three ways teams use it (since you're leaning all three equally)

**Admin panels for your app** Stop hand-rolling another CRUD backend. Point the agent at your
database and get a native admin panel in minutes — versioned in git, not generated-and-forgotten.

**Ops & infra consoles** Wrap your CLIs and AWS resources as tables, add dashboards, fire API
commands. An operational console with nothing to host.

**Internal tools, without the cloud** Ship a back-office tool to your team without standing up
Retool or sending your data to a third party. It runs where your data already lives.

---

### How it works (3 steps — updated)

**1. Connect** — Point Vantage at a config folder. Data sources are described as YAML: connection
strings, schemas, tables.

**2. Describe** — Write the YAML, or ask the agent over MCP to author it from your schema. Pages,
tables, forms, dashboards.

**3. Run** — Browse, search, filter and edit natively. Change the YAML or the data and the UI reacts
live — no refresh.

---

### Built on the Vantage Framework

Vantage is powered by the open-source **Vantage Framework** — a set of Rust crates for data
abstraction across databases, APIs and infrastructure, published on crates.io with a full mdBook.
Use the app as your console, or build directly on the framework to power facade services, middleware
or your own tools.

`[ Explore the Framework ]` `[ Read the Book ]`

---

### Where it's going (vision / roadmap teaser)

> **Today** you describe a console in YAML and an agent helps you build it. **Next** Vantage exports
> that console as a real code repository or container image — one that serves APIs to your own
> frontend, mobile app or services.
>
> Start in low-code. Leave with real code. No lock-in was ever the point.

`[ See the roadmap ]`

---

### Final CTA

> **Build your first console in an afternoon.** Free for macOS. Open-source framework underneath.
> Your data never leaves your machine.

`[ Download for Mac — free ]`

---

## Part 3 — Content Outline (site map)

### Home `/`

Hero → What-it-is strip → "Unlike everything else" (3 pillars) → Feature blocks (Now / Coming soon)
→ Three use cases → How it works → Framework → Vision/roadmap teaser → Final CTA.

### How it works / The agent `/how-it-works` _(new — high priority)_

Your biggest differentiator deserves its own page. Show the actual loop: a real prompt → the YAML
the agent writes → the rendered console. A short screen-recording or before/after. Explain MCP
plainly for the technical buyer. Be honest about current limits.

### Use Cases `/use-cases`

One section per audience, each with a concrete scenario and the YAML/agent flow:

- Admin panel for an app database
- Ops console (CLIs + AWS + dashboards)
- Internal back-office tool for a team Real screenshots, not stock illustrations.

### Why Vantage / vs the alternatives `/why` _(new — optional but valuable)_

A calm, honest comparison framing rather than a feature-checkbox war:

- vs Retool → local-first, config-as-code, no cloud
- vs Adminer/phpMyAdmin → multi-source, dashboards, AI, native
- vs Appsmith/Budibase → not drag-drop; config you own; agent-authored Keep it factual; technical
  readers punish overclaiming.

### Config-as-code `/config` _(new — optional)_

For the git-native buyer: what the YAML looks like, how it lives in a repo, how to diff and review
it, how to hand it off. This is where you win trust.

### Download `/download`

Mac download, system requirements, "what's free." Foreshadow open-core/Pro here if relevant.

### Framework `/framework`

Overview of the Rust crates, link to the Book and crates.io. Position as "the app is one expression
of the framework; build your own."

### Roadmap `/roadmap`

Keep, but elevate the **export-to-code / container-image / API** vision as the headline item. This
is your most ownable long-term differentiator.

### The Book `/` (mdBook) & GitHub

Keep as-is in nav.

---

### Suggested nav (top bar)

`Download · How it works · Use Cases · Why Vantage · Framework · Roadmap · GitHub`

### Sequencing recommendation

1. Fix the **"responsive" → "reactive"** wording everywhere (fastest, highest-trust win).
2. Rewrite the **hero + 3 pillars** (re-categorises you out of "DB navigator").
3. Un-bury the **AI/MCP** features as _Now_.
4. Add the **How it works / agent** page.
5. Elevate **export-to-code** on the roadmap.
