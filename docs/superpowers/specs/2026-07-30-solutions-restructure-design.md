# Solutions section restructure — design

Date: 2026-07-30
Scope: the `/solutions/` section of vantage-ui.com (repo `vantage-web2`), plus the
minimal cross-site changes it forces (nav, catalog badges, redirects, one homepage link).

## Goal

Replace the current three disconnected solutions pages with one coherent
adoption story aimed at enterprise and technical-team buyers. The section
resolves the site's identity problem: it presents the desktop app and the
open-source framework as stages of a single journey, not as unrelated products.

## Positioning foundation (from brainstorm, 2026-07-30)

These statements are the source of truth for the section's copy:

- **The adoption ladder.** Plug into the data you already have (console) →
  make it live (push, cache, bi-directional edits) → wire your organisation
  into a real-time mesh and mint deployable artifacts from it. Enterprise is
  the org-wide wrapper around all three.
- **Anti-Retool stance.** Retool-class tools are rigid, work against their own
  database, put role management in a vendor server, and count your seats.
  Vantage taps existing data structures at full power (Postgres subqueries and
  all, Salesforce, internal APIs) and produces thin, open artifacts you deploy
  yourself — no seat-counting code in anything you run.
- **AI-authored, verified.** The agent writes YAML + Rhai and verifies its own
  work over a local MCP loop. Months of development becomes days. The result
  of a simple query is a functional page or dashboard.
- **Security model in one sentence.** "If a database client (DBeaver) on a
  cleared laptop passes your review, Vantage has the same model." Dev
  credentials while building, prod credentials only for the cleared team,
  agent MCP access is read-only, credentials never travel with the app
  (password-manager-style `.env`, OAuth/SSO loops supported).
- **Not just data — action.** Vantage shows your data *and* lets you act on
  it: CRUD, actions, scripts, operational buttons. And rather than
  controlling everything, it gives you tools to build your own thing.
- **Free forever (MIT):** query builder, entity manager, active record, and
  the tools for live data in multi-threaded apps.
- **The frontend is commodity; the plumbing is the product.** A React web app
  is vibe-codeable. Two-way communication, conflict resolution, horizontal
  scaling — that is what Vantage solves.
- **Platform truth (state once, everywhere the same):** macOS and Linux today;
  Windows builds delivered for enterprise customers (GPUI is ported). Browser
  users are served by thin web apps over a facade API, not by a WASM build.
- **Privacy claim, qualified:** the free version bundles crash analytics
  (Sentry); enterprise builds can disable it or point it at your own account.
- **Rust-for-enterprise narrative:** Java carried enterprise software in 2000.
  Rust is already in your phone and your kernel; Vantage brings it to
  business apps.

## Structure

```
/solutions/                  Where Vantage fits (ladder index)
/solutions/internal-tools/   Stage 1 — One console over the data you already have
/solutions/live-data/        Stage 2 — Everything live
/solutions/data-mesh/        Stage 3 — Wire your organisation into a real-time data mesh
/solutions/enterprise/       Vantage for your organisation
```

Retired from Solutions:

- `/solutions/internal-tools-teams/` → redirect (Zola alias) to `/solutions/internal-tools/`.
- `/solutions/developers/` ("Reactive web & mobile") → redirect to `/solutions/data-mesh/`.
- `/solutions/app-builders/` ("Build your own apps") → redirect to `/framework/`.
  Its Rust-data-backbone content belongs to the Framework story; fold anything
  worth keeping into the framework page's orbit in a later pass.

## Page designs

### `/solutions/` — "Where Vantage fits"

- One intro paragraph: adoption happens in stages, each useful on its own.
- Ladder visual: three stages stacked (Console → Live → Mesh), Enterprise as
  a band beside/below them.
- Two-sentence teaser + "Explore →" per stage; Enterprise card visually
  distinct.
- Closing band: the Rust-for-enterprise narrative (the section's exit note).
- CTAs light: Download as secondary only. This page routes; it does not convert.

### `/solutions/internal-tools/` — "One console over the data you already have"

- Pain opening (keep the site's pain-first voice): the drawer of homegrown
  tools — and the Retool-class alternative that is rigid, works against its
  own database, and counts your seats.
- Promise: point your AI agent at your systems; it authors the console over a
  local MCP loop, verifying its own work — at the full power of your
  backends: Postgres subqueries and all, Salesforce, internal APIs. Days, not
  months.
- Keep the "Build once, share with the whole team" block: git/zip,
  `vantage://` install, credentials never travel; OAuth/SSO login loops.
- Security sidebar, "The DBeaver test": dev/prod separation, MCP read-only,
  credentials local, PII-cleared team gets the prod build.
- Use-case vignettes (one-liners proving breadth): monitor multi-cluster
  infrastructure in real time without opening Datadog · aggregate
  temperature-sensor data · show your delivery vehicles on a live map.
  Deeper vignette: a logistics delivery command center. Link to Periscope
  and the AWS console example.
- CTAs: Download free · Browse the examples.
- Footer rung: "Your console is already live — here's what that means →"
  (to `/solutions/live-data/`).

### `/solutions/live-data/` — "Everything live"

- Pain: dashboards that lie — refresh buttons, polling, stale rows between
  polls. Retool-class tools poll.
- Promise: open screens update within about a second, pushed not polled; the
  local cache paints instantly; edits flow both ways; a draft survives a
  failed save.
- The honest per-backend freshness matrix, reused from the docs (fine push /
  coarse push / poll). Honesty is the feature.
- Vignette: Launch Control's deliberately flaky backend — grids that never
  blank on a 503.
- CTAs: open a live example · live-data docs.
- Footer rung: "Now ship that liveness to your users →" (to `/solutions/data-mesh/`).

### `/solutions/data-mesh/` — "Wire your organisation into a real-time data mesh"

- Pain at enterprise scope: the business already runs on dozens of external
  partners — email delivery, sales data, image analysis, AI workflows,
  big-data aggregation — plus its own databases and APIs. Today that is
  dozens of consoles, credentials, and polling scripts with no single fabric.
- Promise: Vantage wires them into one internal, live mesh — defined
  declaratively, visualised and shaped in Vantage UI with your AI agent doing
  the tweaking. Not just seeing the data: acting on it.
- Philosophy paragraph: rather than controlling everything, Vantage gives you
  the tools to build your own thing. Free forever, MIT: query builder, entity
  manager, active record, live-data tools for multi-threaded apps.
- Artifacts you mint once the mesh is defined (Rust's versatility is the
  payoff): **facade APIs** (flagship — keeps the current developers page's
  stack diagram, "what your frontend gets", and "a gradual path, not a
  rewrite" sections), sidecars, edge proxies, Vantage embedded in mobile apps.
- The frontend line: the React layer is vibe-codeable; the mesh plumbing is
  what Vantage solves.
- Honesty note kept: build the facade today from crates.io with the guide;
  managed hosting and in-app API route management are roadmap.
- CTAs: Read the guide · Framework overview.
- Footer rung: → `/solutions/enterprise/`.

### `/solutions/enterprise/` — "Vantage for your organisation"

- Framing: everything above, packaged and partnered for an organisation.
- The custom distribution, five items: choose your datasources (including
  custom ones — Debezium-grade CDC for Oracle/SQL Server — built on the open
  framework) · custom UI widgets (ours or yours) · your own telemetry or none
  · allowlisted `vantage://` install domains · typed entity models with
  custom triggers and validation via the entity framework.
- Build & distribution pipeline: you deliver the tweak, we re-package;
  certify and pre-install across your fleet.
- Partnership pillar: an enterprise architecture partner, not a license
  vendor — we train your teams to build with Vantage and to rely on AI
  properly, so the codebase does not turn into slop.
- Trust block: source escrow on bankruptcy/acquisition · MIT framework
  underneath · facade APIs fully in your domain · no seat-counting code in
  anything you deploy.
- Platform stated once: macOS & Linux today; Windows builds delivered for
  enterprise customers.
- Echo of the Rust-for-enterprise narrative.
- The lead form moves here from `/framework/` (framework page keeps a link).
  Form voice goes neutral: "Tell us about your data landscape — we'll come
  back with a proposed stack." No "customer care team" phrasing.

## Cross-cutting rules

- No internal codenames (Dio, Diorama, Lens, Scenery, Vista, Servo) on
  Solutions pages — plain words: "live cache", "reactive views". Codenames
  stay on `/framework/`.
- Privacy claim qualified wherever it appears in the section.
- One platform claim, identical everywhere in the section.
- Now/Soon honesty badges retained as a house device.
- Every stage page ends with a next-rung footer link.
- Voice: the site's existing engineer-to-engineer, pain-first register.

## Forced changes outside `content/solutions/`

- **Nav** (`content/navigation.yaml`): Solutions dropdown lists the four new
  pages in ladder order.
- **Examples catalog persona badges** (`static/examples-catalog.yaml`
  fallback; upstream `catalog.yaml` in vantage-ui-examples): Periscope, AWS
  console, Bakery, Library Story → `/solutions/internal-tools/`; Launch
  Control → `/solutions/live-data/`; SpaceX → `/solutions/data-mesh/`.
- **Example tour pages** (`launch-control.html`, `periscope.html`): the
  end-of-tour button stops pointing at app-builders; points at `/solutions/`.
- **Homepage**: add one band/link routing to `/solutions/` (the section is
  currently unreachable from the homepage).
- **Redirects**: Zola `aliases` for the old URLs — on `internal-tools.md`
  (alias `internal-tools-teams`), on `data-mesh.md` (alias `developers`), and
  on `content/framework.md` (alias `solutions/app-builders`).

## Out of scope (noted for later, not part of this work)

- Hero headline / site-wide category fix ("AI-first low-code App Builder" vs
  positioning doc) — separate conversion-optimisation work.
- The orphaned `/examples/periscope2/` page.
- `/library/` stub chapters, download-page body copy, gallery placeholder
  images.
- Actually building Windows builds, managed facade hosting, or in-app API
  management — the copy badges them honestly instead.

## Success criteria

- A visitor can state the ladder back after reading the index.
- Each page targets one reader and one pain, uses the same product vocabulary,
  and ends with the next rung.
- The enterprise offering is visible and has a conversion path (the form).
- No page in the section contradicts another on platform, privacy, or naming.
