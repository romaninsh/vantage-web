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

<style>
/* ---- Stage-1 page visuals (all custom classes prefixed it-) ---- */

/* The drawer of homegrown tools */
.it-drawer { margin: 2.5rem auto 0; max-width: 36rem; }
.it-files { position: relative; z-index: 0; display: flex; flex-wrap: wrap; justify-content: center; align-items: flex-end; gap: 0 0.4rem; padding: 0 1.25rem; }
.it-file { transform: rotate(var(--tilt, 0deg)) translateY(var(--sink, 0px)); background: var(--color-surface-1); border: 1px dashed var(--color-line-strong); border-bottom: none; border-radius: 0.55rem 0.55rem 0 0; padding: 0.5rem 0.75rem 1.5rem; }
.it-file b { display: block; font-family: var(--font-mono); font-size: 0.72rem; font-weight: 600; color: var(--color-text-2); }
.it-file small { display: block; margin-top: 0.15rem; font-size: 0.64rem; color: var(--color-text-3); }
.it-drawer-front { position: relative; z-index: 1; margin-top: -1.15rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.55rem; height: 5.25rem; border: 1px solid var(--color-line-strong); border-radius: 0.8rem; background: linear-gradient(180deg, var(--color-surface-2), var(--color-surface-1)); box-shadow: 0 18px 40px -18px rgba(0, 0, 0, 0.7); }
.it-drawer-label { font-family: var(--font-mono); font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.18em; color: var(--color-text-3); border: 1px solid var(--color-line); border-radius: 0.3rem; padding: 0.18rem 0.55rem; background: var(--color-bg); }
.it-drawer-handle { width: 4rem; height: 0.5rem; border-radius: 999px; border: 1px solid var(--color-line-strong); background: var(--color-surface-2); }
p.it-caption { margin: 0.9rem auto 0; max-width: 32rem; text-align: center; font-size: 0.8rem; line-height: 1.55; color: var(--color-text-3); }

/* Console window mock: one sidebar, unlikely neighbours */
.it-console { margin: 2.25rem 0 0.5rem; border: 1px solid var(--color-line-strong); border-radius: 0.9rem; overflow: hidden; background: var(--color-surface-1); box-shadow: 0 24px 60px -28px rgba(0, 0, 0, 0.8); }
.it-titlebar { display: flex; align-items: center; gap: 0.4rem; padding: 0.55rem 0.9rem; border-bottom: 1px solid var(--color-line); background: var(--color-surface-2); }
.it-titledot { width: 0.6rem; height: 0.6rem; border-radius: 999px; background: var(--color-line-strong); }
.it-titlebar b { margin-left: 0.5rem; font-family: var(--font-mono); font-size: 0.68rem; font-weight: 500; color: var(--color-text-3); }
.it-console-body { display: grid; grid-template-columns: 12.5rem 1fr; }
.it-side { border-right: 1px solid var(--color-line); padding: 0.7rem 0.55rem; display: flex; flex-direction: column; gap: 0.15rem; background: color-mix(in srgb, var(--color-surface-2) 55%, var(--color-surface-1)); }
.it-side-group { margin: 0.6rem 0.45rem 0.25rem; font-family: var(--font-mono); font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.16em; color: var(--color-text-3); }
.it-side-group:first-child { margin-top: 0; }
.it-side-item { display: flex; align-items: center; gap: 0.45rem; border-radius: 0.45rem; padding: 0.32rem 0.45rem; font-size: 0.78rem; color: var(--color-text-2); }
.it-side-item em { margin-left: auto; font-style: normal; font-family: var(--font-mono); font-size: 0.62rem; color: var(--color-text-3); }
.it-side-item.active { background: color-mix(in srgb, var(--color-accent-500) 16%, transparent); color: var(--color-text-1); }
.it-side-item.active em { color: var(--color-accent-300); }
.it-status { width: 0.42rem; height: 0.42rem; border-radius: 999px; flex: none; }
.it-status.ok { background: var(--color-ok); box-shadow: 0 0 6px color-mix(in srgb, var(--color-ok) 70%, transparent); }
.it-status.warn { background: #f59e0b; }
.it-main { padding: 0.9rem; }
.it-map { display: block; width: 100%; height: 100%; min-height: 13rem; border-radius: 0.55rem; border: 1px solid var(--color-line); background: color-mix(in srgb, var(--color-surface-2) 70%, var(--color-bg)); }
.it-map .it-street { stroke: var(--color-line); stroke-width: 1; }
.it-map .it-street-main { stroke: var(--color-line-strong); stroke-width: 2; }
.it-map .it-route-done { stroke: var(--color-accent-400); stroke-width: 2; fill: none; stroke-linecap: round; stroke-linejoin: round; }
.it-map .it-route-left { stroke: var(--color-accent-400); opacity: 0.5; stroke-width: 2; stroke-dasharray: 3 5; fill: none; stroke-linecap: round; stroke-linejoin: round; }
.it-map .it-depot { fill: none; stroke: var(--color-text-3); stroke-width: 1.5; }
.it-map .it-stop { fill: none; stroke: var(--color-text-2); stroke-width: 1.5; }
.it-map .it-van { fill: var(--color-accent-300); }
.it-map .it-van-ring { fill: none; stroke: var(--color-accent-400); stroke-width: 1.5; transform-box: fill-box; transform-origin: center; animation: it-pulse 2.4s ease-out infinite; }
.it-map text { font-family: var(--font-mono); font-size: 7px; fill: var(--color-text-2); }
.it-map .it-maplbl { font-size: 6px; fill: var(--color-text-3); }
@keyframes it-pulse { 0% { transform: scale(0.6); opacity: 0.7; } 70% { transform: scale(1.8); opacity: 0; } 100% { opacity: 0; } }
@media (max-width: 40rem) {
  .it-console-body { grid-template-columns: 1fr; }
  .it-side { border-right: none; border-bottom: 1px solid var(--color-line); }
}

/* Agent session transcript */
.it-agent { margin: 2rem 0 0; border: 1px solid var(--color-line); border-radius: 0.9rem; overflow: hidden; background: var(--color-surface-1); }
.it-agent-head { display: flex; align-items: center; gap: 0.5rem; padding: 0.55rem 0.9rem; border-bottom: 1px solid var(--color-line); background: var(--color-surface-2); font-family: var(--font-mono); font-size: 0.68rem; color: var(--color-text-3); }
.it-agent-head .material-symbols-outlined { font-size: 1rem; color: var(--color-accent-400); }
.it-agent-log { padding: 0.95rem 1rem; display: flex; flex-direction: column; gap: 0.6rem; font-family: var(--font-mono); font-size: 0.76rem; line-height: 1.55; }
.it-agent-log p { margin: 0; display: flex; gap: 0.7rem; }
.it-agent-log p > span:first-child { flex: none; width: 3rem; text-align: right; font-size: 0.62rem; letter-spacing: 0.06em; text-transform: uppercase; padding-top: 0.2em; color: var(--color-text-3); }
p.it-you { color: var(--color-text-1); }
p.it-you > span:first-child { color: var(--color-accent-300); }
p.it-check { color: var(--color-ok); }

/* Build once, share (no travelling-dot animation) */
.it-share { margin: 2rem 0 0; display: flex; flex-direction: column; align-items: stretch; gap: 0.5rem; }
.it-step { position: relative; flex: 1 1 0; border: 1px solid var(--color-line); border-radius: 0.8rem; background: var(--color-surface-1); padding: 1.1rem 1.1rem 1rem; }
.it-step.it-step-hub { border-color: color-mix(in srgb, var(--color-accent-500) 40%, transparent); background: color-mix(in srgb, var(--color-accent-500) 5%, var(--color-surface-1)); }
.it-step h4 { margin: 0.7rem 0 0; font-size: 0.95rem; }
.it-step p { margin: 0.4rem 0 0; font-size: 0.8rem; line-height: 1.55; color: var(--color-text-2); }
.it-join { flex: none; display: flex; align-items: center; justify-content: center; padding: 0.15rem 0; }
.it-join span { border: 1px solid var(--color-line); background: var(--color-surface-2); border-radius: 999px; padding: 0.1rem 0.6rem; font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-text-3); }
@media (min-width: 48rem) {
  .it-share { flex-direction: row; }
  .it-join { width: 7rem; padding: 0; }
}
</style>

Every platform team runs part of its stack out of a drawer: a deploy script with a wiki page that says run it twice, a forked dashboard nobody dares upgrade, an internal admin that only works on one person's laptop. Each one solved a real problem the day it was written — and each one is one more thing to keep alive. The usual way out is a Retool-class builder, which trades one drawer for four walls: components that bend only so far, full power only against its own database, role management on a vendor's server, and per-seat pricing.

**Vantage UI is the third option.** Point an AI agent at your systems and it authors the console for you — declarative YAML plus Rhai for the logic — over a local MCP loop, verifying its own work as it goes. Nothing is watered down on the way: Postgres with every subquery you'd write by hand, Salesforce, your internal APIs, AWS, any CLI your team already trusts. Months of internal-tool development becomes days.

And unlike Datadog, nothing gets ingested anywhere. Your data stays where it lives; Vantage reads it there, live. Nothing to ship out, no second copy to keep in sync — and the drawer finally closes.

<div class="it-drawer" role="img" aria-label="An open drawer of aging internal tools — scripts, forked dashboards, spreadsheets — each one more thing to keep alive">
  <div class="it-files">
    <div class="it-file" style="--tilt:-2.5deg; --sink:4px"><b>deploy_final_v2.sh</b><small>wiki says run it twice</small></div>
    <div class="it-file" style="--tilt:1.8deg; --sink:9px"><b>admin-panel</b><small>Django 2.2 — do not upgrade</small></div>
    <div class="it-file" style="--tilt:-1.2deg; --sink:2px"><b>metrics-dash</b><small>forked Grafana, login broken</small></div>
    <div class="it-file" style="--tilt:2.4deg; --sink:7px"><b>restart_workers.py</b><small>lives on Igor's laptop</small></div>
    <div class="it-file" style="--tilt:-2deg; --sink:5px"><b>orders.xlsx</b><small>exported every Monday</small></div>
  </div>
  <div class="it-drawer-front">
    <span class="it-drawer-label">internal&nbsp;tools</span>
    <span class="it-drawer-handle"></span>
  </div>
</div>

<p class="it-caption">The drawer, before. Every item has an owner, a runbook and a failure mode. Vantage retires them into entries in one console's sidebar.</p>

## One console, unlimited uses

A Vantage console is not a dashboard product with a fixed shape — it's whatever your backends can answer. Three jobs from real teams:

- **Monitor multi-cluster infrastructure in real time** — without opening Datadog.
- **Aggregate temperature-sensor data** from the devices on your floor.
- **Show your delivery vehicles on a live map** — and reassign a route from the same screen.

Those aren't three products. They're three groups in one sidebar:

<div class="it-console" role="img" aria-label="A Vantage UI window: one sidebar holding Kubernetes clusters, temperature sensors and a delivery fleet as adjacent menu groups, with van 07 open on a live map">
  <div class="it-titlebar"><span class="it-titledot"></span><span class="it-titledot"></span><span class="it-titledot"></span><b>ops — Vantage UI</b></div>
  <div class="it-console-body">
    <nav class="it-side" aria-hidden="true">
      <span class="it-side-group">Clusters</span>
      <span class="it-side-item"><span class="it-status ok"></span>prod-eu-1<em>142 pods</em></span>
      <span class="it-side-item"><span class="it-status ok"></span>prod-us-1<em>167 pods</em></span>
      <span class="it-side-item"><span class="it-status warn"></span>staging<em>3 stuck</em></span>
      <span class="it-side-group">Sensors</span>
      <span class="it-side-item">cold room<em>−18.4 °C</em></span>
      <span class="it-side-item">oven line<em>212 °C</em></span>
      <span class="it-side-group">Fleet</span>
      <span class="it-side-item active">van 07<em>en route</em></span>
      <span class="it-side-item">van 12<em>loading</em></span>
    </nav>
    <div class="it-main">
      <svg class="it-map" viewBox="0 0 300 170" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <line class="it-street" x1="40" y1="10" x2="40" y2="160"/>
        <line class="it-street" x1="90" y1="10" x2="90" y2="160"/>
        <line class="it-street-main" x1="140" y1="10" x2="140" y2="160"/>
        <line class="it-street" x1="190" y1="10" x2="190" y2="160"/>
        <line class="it-street" x1="240" y1="10" x2="240" y2="160"/>
        <line class="it-street" x1="10" y1="40" x2="290" y2="40"/>
        <line class="it-street-main" x1="10" y1="85" x2="290" y2="85"/>
        <line class="it-street" x1="10" y1="130" x2="290" y2="130"/>
        <path class="it-route-done" d="M30 150 L30 85 L90 85 L90 40 L165 40"/>
        <path class="it-route-left" d="M165 40 L240 40 L240 85 L272 85"/>
        <rect class="it-depot" x="25" y="145" width="10" height="10" rx="1.5"/>
        <circle class="it-stop" cx="275" cy="85" r="4"/>
        <circle class="it-van-ring" cx="165" cy="40" r="7"/>
        <circle class="it-van" cx="165" cy="40" r="3.5"/>
        <text x="165" y="24" text-anchor="middle">van 07 · 6 min to drop</text>
        <text class="it-maplbl" x="30" y="166" text-anchor="middle">depot</text>
        <text class="it-maplbl" x="275" y="99" text-anchor="middle">stop 4</text>
      </svg>
    </div>
  </div>
</div>

<p class="it-caption">Wildly different jobs, adjacent menu entries. If it holds data or takes a command, it can sit in this sidebar.</p>

And it stays fast at any size — a smart local cache keeps big grids instant and refreshes them in the background, so nobody sits watching a spinner.

## The agent writes it, then checks its own work

You describe the screen. The agent writes the config — and proves it works before you look up:

<div class="it-agent" aria-label="An agent session building a console page over a local MCP loop">
  <div class="it-agent-head"><span class="material-symbols-outlined">smart_toy</span>your coding agent · local MCP session</div>
  <div class="it-agent-log">
    <p class="it-you"><span>you</span>One screen: deployments stuck across all three clusters, with a restart button per pod.</p>
    <p><span>agent</span>Wrote <code>pages/stuck-deployments.yaml</code> — one grid, all three clusters.</p>
    <p><span>agent</span>Wrote <code>actions/restart-pod.rhai</code> — wired to a button on each row.</p>
    <p class="it-check"><span>agent</span>✓ Opened the page over MCP: 3 stuck deployments listed, restart action in place.</p>
  </div>
</div>

That verification loop is why the result holds up. The agent isn't handing you code to go try — it runs the console on your machine, reads its own pages back over MCP, and fixes what it got wrong before reporting done. Ask for the next button and it appears: exactly the controls your team needs, not a fixed set someone else chose. And because the console speaks to your real backends, there is no capability ceiling to hit — if your database or API can answer it, the agent can put it on a screen.

## Build once, share with the whole team

One person builds the tool; the whole team opens a link. A Vantage app is only config — YAML and Rhai in a folder — so sharing it is sharing a git repo, or a zip if that's easier. The console travels. The data never does.

<div class="it-share" aria-label="How a Vantage app is built once and shared with a team">
  <div class="it-step">
    <span class="share-num">1</span>
    <span class="material-symbols-outlined share-ico">smart_toy</span>
    <h4>You build it</h4>
    <p>Your agent wires up the pages, tables and actions over the local MCP loop — against dev credentials.</p>
  </div>
  <div class="it-join"><span>app config</span></div>
  <div class="it-step it-step-hub">
    <span class="share-num">2</span>
    <span class="material-symbols-outlined share-ico">publish</span>
    <h4>You publish it</h4>
    <p>Push the folder to your corporate git, or hand over a zip. It's just code — no data, no credentials inside.</p>
  </div>
  <div class="it-join"><span>a link</span></div>
  <div class="it-step">
    <span class="share-num">3</span>
    <span class="share-avatars"><i></i><i></i><i></i></span>
    <h4>The team opens it</h4>
    <p>One <code>vantage://</code> link installs the app and pulls it from git. Each person signs into the data themselves.</p>
  </div>
</div>

<p class="share-footnote"><span class="material-symbols-outlined">shield</span> Credentials never travel with the app — they're stored locally, password-manager style. OAuth and SSO work the way you'd expect: a window opens, the user signs in, and the token is cached on their own machine.</p>

## The DBeaver test

If a database client on a cleared laptop passes your security review, Vantage has the same model: a desktop app on your machine, speaking directly to your backends with credentials you hold. Your existing development practice applies unchanged:

- **Dev credentials while building.** You and your agent work against the dev environment; production credentials exist only where the finished app runs.
- **The agent reads; it doesn't write.** The agent's MCP access to a running console is read-only — page structure, debug queries, logs. Writes happen in the app, by whoever drives it, under their own credentials.
- **The PII-cleared team gets the prod build.** Ship the finished app to the cleared team; they connect it with production access. Developers — and their agents — never see it.
- **Nothing phones home, unqualified.** The free version bundles crash analytics; enterprise builds can disable it or point it at your own account.

## See it in action

**Periscope** is this page's argument, built for Kubernetes — a full control room written entirely in YAML, drilling from namespaces to workloads to pods. The **AWS control console example** wraps the `aws` CLI to surface exactly the resources you operate, nothing more. (Landing in the examples repo soon.)

<div class="my-4">
    <a href="/examples/" class="btn btn-primary me-2">Browse the examples</a>
    <a href="/download/" class="btn btn-outline-primary">Download — free</a>
</div>

<p class="journey-note"><span class="material-symbols-outlined">arrow_forward</span><span><b>Next rung:</b> your console is already live — open screens update by themselves. <a href="/solutions/live-data/">Here's what that means →</a></span></p>
