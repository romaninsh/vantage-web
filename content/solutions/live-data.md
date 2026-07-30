+++
title = "Everything live"
description = "Open screens update by themselves within about a second — pushed where the source can push, honestly polled where it can't. Edits flow back, and a draft survives a failed save."
template = "page.html"
weight = 2

[extra]
kicker = "Solutions · Stage 2"
icon = "bolt"
+++


<style>
:root {
    --ld-live: #34d399;
    --ld-warn: #fbbf24;
    --ld-err: #f87171;
    --ld-mono: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
}

/* ── Two-panel feed demo ─────────────────────────────────────── */
.ld-demo {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin: 2rem 0 0.5rem;
}
@media (min-width: 640px) {
    .ld-demo { grid-template-columns: 1fr 1fr; }
}
.ld-panel {
    position: relative;
    border: 1px solid var(--color-line);
    border-radius: 0.75rem;
    background: var(--color-surface-1);
    overflow: hidden;
}
.ld-panel-live { border-color: color-mix(in srgb, var(--ld-live) 25%, var(--color-line)); }
.ld-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.55rem 0.9rem;
    border-bottom: 1px solid var(--color-line);
}
.ld-head .ld-title { flex: 1 1 auto; }
.ld-title {
    font-family: var(--ld-mono);
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-text-3);
}
.ld-refresh {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.28rem 0.6rem;
    border: none;
    border-radius: 0.5rem;
    background: var(--color-accent-500);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 600;
    line-height: 1;
    cursor: pointer;
    transition: background 0.12s ease, transform 0.08s ease;
}
.ld-refresh:hover { background: var(--color-accent-400); }
.ld-refresh:active { transform: scale(0.94); }
.ld-refresh .material-symbols-outlined { font-size: 0.95rem; }
.ld-panel-live .ld-title { color: var(--color-text-1); }
.ld-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--ld-mono);
    font-size: 0.7rem;
    white-space: nowrap;
    color: var(--color-text-3);
}
.ld-chip .material-symbols-outlined { font-size: 0.95rem; }
.ld-chip[data-state="live"] { color: var(--ld-live); }
.ld-chip[data-state="reconnecting"] { color: var(--ld-warn); }
.ld-dot {
    position: relative;
    flex: none;
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 9999px;
    background: var(--ld-live);
}
.ld-chip[data-state="reconnecting"] .ld-dot {
    background: var(--ld-warn);
    animation: ld-blink 1s steps(2, jump-none) infinite;
}
.ld-chip[data-state="live"] .ld-dot::after,
.ld-msig-push .ld-dot::after {
    content: "";
    position: absolute;
    inset: -4px;
    border-radius: 9999px;
    border: 1px solid var(--ld-live);
    opacity: 0;
    animation: ld-pulse 2.2s ease-out infinite;
}
.ld-rows { padding: 0.3rem 0 0.4rem; }
.ld-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.42rem 0.9rem;
    font-size: 0.85rem;
}
.ld-row + .ld-row { border-top: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent); }
.ld-lab { color: var(--color-text-3); }
.ld-val {
    font-family: var(--ld-mono);
    font-variant-numeric: tabular-nums;
    color: var(--color-text-1);
    border-radius: 0.3rem;
    padding: 0 0.35rem;
}
.ld-flash { animation: ld-flash-poll 0.9s ease-out 1; }
.ld-panel-live .ld-flash,
.ld-devices .ld-flash { animation-name: ld-flash-live; }
.ld-spinning { animation: ld-spin 0.7s linear 1; }
.ld-errbar {
    position: absolute;
    left: 0.6rem;
    right: 0.6rem;
    bottom: 0.55rem;
    display: flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.35rem 0.6rem;
    border-radius: 0.5rem;
    border: 1px solid color-mix(in srgb, var(--ld-err) 45%, transparent);
    background: color-mix(in srgb, var(--ld-err) 14%, var(--color-surface-2));
    font-family: var(--ld-mono);
    font-size: 0.72rem;
    color: #fca5a5;
}
.ld-errbar .material-symbols-outlined { font-size: 1rem; }
.ld-errbar[hidden] { display: none; }
.ld-caption {
    margin: 0.5rem 0 0;
    font-size: 0.8rem;
    text-align: center;
    color: var(--color-text-3);
}

/* ── Two-device demo ─────────────────────────────────────────── */
.ld-devices {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: center;
    gap: 1rem;
    margin: 1.75rem 0 0.5rem;
}
.ld-desktop {
    flex: 1 1 20rem;
    max-width: 27rem;
    border: 1px solid var(--color-line);
    border-radius: 0.75rem;
    background: var(--color-surface-1);
    overflow: hidden;
}
.ld-dev-chrome {
    display: flex;
    align-items: center;
    gap: 0.32rem;
    padding: 0.5rem 0.8rem;
    border-bottom: 1px solid var(--color-line);
}
.ld-dev-chrome i {
    width: 0.52rem;
    height: 0.52rem;
    border-radius: 9999px;
    background: var(--color-line-strong);
}
.ld-dev-title {
    margin-left: 0.45rem;
    font-family: var(--ld-mono);
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-text-3);
}
.ld-form {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    padding: 0.85rem 0.9rem 1rem;
}
.ld-field2 {
    display: grid;
    grid-template-columns: 4.6rem 1fr auto;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.85rem;
}
.ld-field2-area { align-items: start; }
.ld-flab { font-size: 0.76rem; color: var(--color-text-3); }
.ld-field2-area .ld-flab { padding-top: 0.3rem; }
.ld-fval2 {
    font-family: var(--ld-mono);
    color: var(--color-text-1);
    border: 1px solid var(--color-line);
    border-radius: 0.4rem;
    background: var(--color-surface-2);
    padding: 0.24rem 0.5rem;
}
.ld-status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.4rem;
}
.ld-status .material-symbols-outlined { font-size: 1rem; color: var(--color-text-3); }
.ld-status[data-state="pending"] .ld-sval { color: var(--ld-warn); }
.ld-status[data-state="shipped"] .ld-sval { color: var(--ld-live); }
.ld-sval { border-radius: 0.25rem; padding: 0 0.2rem; }
.ld-area {
    display: block;
    min-height: 3.4rem;
    font-size: 0.78rem;
    line-height: 1.5;
    white-space: pre-wrap;
    border-color: color-mix(in srgb, var(--color-accent-400) 55%, transparent);
}
.ld-caret {
    display: inline-block;
    width: 1px;
    height: 0.9em;
    margin-left: 2px;
    vertical-align: -0.1em;
    background: var(--color-accent-300);
    animation: ld-blink 1.1s steps(2, jump-none) infinite;
}
.ld-tag {
    font-family: var(--ld-mono);
    font-size: 0.62rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap;
    padding: 0.14rem 0.45rem;
    border-radius: 9999px;
    border: 1px solid;
}
.ld-tag[hidden] { display: none; }
.ld-tag-held {
    color: var(--color-accent-300);
    border-color: color-mix(in srgb, var(--color-accent-400) 45%, transparent);
}
.ld-tag-live {
    color: var(--ld-live);
    border-color: color-mix(in srgb, var(--ld-live) 35%, transparent);
}
.ld-phone {
    flex: 0 0 auto;
    width: 10.5rem;
    border: 1px solid var(--color-line-strong);
    border-radius: 1.4rem;
    background: var(--color-surface-1);
    padding: 0.55rem 0.55rem 0.8rem;
}
.ld-notch {
    width: 4rem;
    height: 0.8rem;
    margin: 0 auto 0.55rem;
    border-radius: 0 0 0.6rem 0.6rem;
    border: 1px solid var(--color-line);
    border-top: none;
    background: var(--color-surface-2);
}
.ld-phone-app {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.45rem;
    padding: 0.3rem 0.35rem 0;
    text-align: center;
}
.ld-phone-kicker {
    font-family: var(--ld-mono);
    font-size: 0.58rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-text-3);
}
.ld-phone-order {
    font-family: var(--ld-mono);
    font-size: 1.05rem;
    color: var(--color-text-1);
}
.ld-phone-status {
    font-family: var(--ld-mono);
    font-size: 0.62rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.14rem 0.5rem;
    border-radius: 9999px;
    border: 1px solid;
}
.ld-phone-status[data-state="pending"] {
    color: var(--ld-warn);
    border-color: color-mix(in srgb, var(--ld-warn) 40%, transparent);
}
.ld-phone-status[data-state="shipped"] {
    color: var(--ld-live);
    border-color: color-mix(in srgb, var(--ld-live) 40%, transparent);
}
.ld-ship {
    width: 100%;
    margin-top: 0.35rem;
    padding: 0.55rem 0.6rem;
    border: none;
    border-radius: 0.6rem;
    background: var(--color-accent-500);
    color: #fff;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: default;
    transition: transform 0.12s ease, background 0.12s ease, color 0.12s ease;
}
.ld-ship.ld-pressed {
    transform: scale(0.94);
    background: var(--color-accent-600);
}
.ld-ship[data-state="shipped"] {
    background: color-mix(in srgb, var(--ld-live) 20%, var(--color-surface-2));
    color: var(--ld-live);
}
.ld-post {
    min-height: 1rem;
    font-family: var(--ld-mono);
    font-size: 0.6rem;
    color: var(--ld-live);
}
.ld-post[hidden] { display: block; visibility: hidden; }

/* ── Freshness matrix ────────────────────────────────────────── */
.ld-matrix {
    margin: 1.75rem 0;
    border: 1px solid var(--color-line);
    border-radius: 0.75rem;
    background: var(--color-surface-1);
    overflow: hidden;
}
.ld-mrow {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.15rem 1rem;
    padding: 0.7rem 1rem;
}
@media (min-width: 640px) {
    .ld-mrow { grid-template-columns: 11rem 1fr auto; align-items: center; }
}
.ld-mrow + .ld-mrow { border-top: 1px solid var(--color-line); }
.ld-mbackend {
    font-family: var(--ld-mono);
    font-size: 0.82rem;
    color: var(--color-text-1);
}
.ld-mmech { font-size: 0.8rem; color: var(--color-text-3); }
.ld-msig {
    display: inline-flex;
    align-items: baseline;
    gap: 0.45rem;
    font-family: var(--ld-mono);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}
.ld-msig .ld-dot { align-self: center; }
.ld-msig .material-symbols-outlined { font-size: 0.95rem; align-self: center; }
.ld-msig small {
    font-weight: 400;
    font-size: 0.7rem;
    letter-spacing: 0;
    text-transform: none;
    color: var(--color-text-3);
}
.ld-msig-push { color: var(--ld-live); }
.ld-msig-poll { color: var(--color-text-2); }
.ld-mfoot {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.7rem 1rem;
    border-top: 1px solid var(--color-line);
    background: var(--color-surface-2);
    font-size: 0.8rem;
    line-height: 1.5;
    color: var(--color-text-2);
}
.ld-mfoot .material-symbols-outlined { font-size: 1.05rem; margin-top: 0.1rem; color: var(--color-accent-400); }

@keyframes ld-flash-live {
    0% { background: color-mix(in srgb, var(--ld-live) 32%, transparent); }
    100% { background: transparent; }
}
@keyframes ld-flash-poll {
    0% { background: rgba(255, 255, 255, 0.14); }
    100% { background: transparent; }
}
@keyframes ld-pulse {
    0% { transform: scale(0.6); opacity: 0.8; }
    100% { transform: scale(1.7); opacity: 0; }
}
@keyframes ld-spin { to { transform: rotate(360deg); } }
@keyframes ld-blink { 50% { opacity: 0.3; } }

@media (prefers-reduced-motion: reduce) {
    .ld-flash, .ld-spinning, .ld-caret,
    .ld-chip .ld-dot, .ld-chip .ld-dot::after,
    .ld-msig-push .ld-dot::after { animation: none !important; }
    .ld-ship { transition: none; }
    .ld-ship.ld-pressed { transform: none; }
    .ld-refresh { transition: none; }
    .ld-refresh:active { transform: none; }
}
</style>

Dashboards lie. Whatever is on screen is the world as of the last poll — the refresh button is a confession that it isn't current, and the stale row between polls is where the wrong call gets made. Retool-class tools poll. A fast poll is still a poll.

**In Vantage, open screens update by themselves.** When a row changes anywhere in your organisation, every screen showing it catches up within about a second — pushed straight from the source, wherever the source can push. And whichever way freshness arrives, the local cache paints the screen instantly: no spinner standing in for data you already had.

If you built the stage-1 console, you have already watched this happen — tables that just stay right. This page is what's underneath, and how far it goes.

## Same feed, two dashboards

One scripted feed drives both panels below, live in this page. The right panel behaves like a Vantage screen: every change is pushed and lands in under a second, on its own. The left panel is the other kind of dashboard — it updates when someone presses Refresh. That someone is you now. Keep it current. And mind the timing: for a stretch of every loop the backend throws 503s, and if your click lands there, you get what a polling dashboard gets.

<div id="ld-demo" class="ld-demo">
<div class="ld-panel" data-panel="poll">
<div class="ld-head"><span class="ld-title">Refresh-based</span><span class="ld-chip" aria-hidden="true"><span data-ld="poll-status">refreshed 0 s ago</span></span><button type="button" class="ld-refresh" data-ld="poll-btn" aria-label="Refresh this panel with the feed's current values"><span class="material-symbols-outlined" data-ld="poll-spin" aria-hidden="true">sync</span>Refresh</button></div>
<div class="ld-rows" aria-hidden="true">
<div class="ld-row"><span class="ld-lab">orders / min</span><span class="ld-val" data-row="orders">132</span></div>
<div class="ld-row"><span class="ld-lab">queue depth</span><span class="ld-val" data-row="queue">7</span></div>
<div class="ld-row"><span class="ld-lab">p95 latency</span><span class="ld-val" data-row="p95">210 ms</span></div>
<div class="ld-row"><span class="ld-lab">workers</span><span class="ld-val" data-row="workers">12</span></div>
</div>
<div class="ld-errbar" data-ld="poll-err" aria-hidden="true" hidden><span class="material-symbols-outlined">error</span>HTTP 503 — request failed</div>
</div>
<div class="ld-panel ld-panel-live" data-panel="push" aria-hidden="true">
<div class="ld-head"><span class="ld-title">Vantage</span><span class="ld-chip" data-ld="push-chip" data-state="live"><i class="ld-dot"></i><span data-ld="push-status">live · under a second behind</span></span></div>
<div class="ld-rows">
<div class="ld-row"><span class="ld-lab">orders / min</span><span class="ld-val" data-row="orders">132</span></div>
<div class="ld-row"><span class="ld-lab">queue depth</span><span class="ld-val" data-row="queue">7</span></div>
<div class="ld-row"><span class="ld-lab">p95 latency</span><span class="ld-val" data-row="p95">210 ms</span></div>
<div class="ld-row"><span class="ld-lab">workers</span><span class="ld-val" data-row="workers">12</span></div>
</div>
</div>
</div>

<p class="ld-caption">The feed is scripted; the button is real. The left panel shows whatever you last fetched, and the counter keeps score of how far behind you've fallen — seconds, then minutes, then hours. The right panel just stays right: through the outage it keeps the last known state and catches up on reconnect.</p>

## Both directions

A live screen you can't act from is a wall monitor. In Vantage, the same layer that streams reads carries writes — from every device at once. Below, the same order is open in two places: someone at a laptop is typing delivery notes, and a warehouse phone marks the order shipped. The status flips on the desktop within a second of the tap. The details field, mid-edit, never loses a character: fields you have touched hold, fields you haven't keep tracking upstream. And if a save fails, nothing is discarded — a draft survives a failed save.

<div class="ld-devices" aria-hidden="true">
<div class="ld-desktop">
<div class="ld-dev-chrome"><i></i><i></i><i></i><span class="ld-dev-title">orders · desktop</span></div>
<div class="ld-form">
<div class="ld-field2"><span class="ld-flab">order</span><span class="ld-fval2" data-ld2="d-order">#4127</span><span></span></div>
<div class="ld-field2"><span class="ld-flab">customer</span><span class="ld-fval2">A. Virtanen</span><span></span></div>
<div class="ld-field2"><span class="ld-flab">status</span><span class="ld-fval2 ld-status" data-ld2="d-pill" data-state="pending"><span class="ld-sval" data-ld2="d-status">pending</span><span class="material-symbols-outlined">expand_more</span></span><span class="ld-tag ld-tag-live">tracking upstream</span></div>
<div class="ld-field2 ld-field2-area"><span class="ld-flab">details</span><span class="ld-fval2 ld-area"><span data-ld2="d-details"></span><i class="ld-caret"></i></span><span class="ld-tag ld-tag-held" data-ld2="d-held" hidden>changed · holds</span></div>
</div>
</div>
<div class="ld-phone">
<div class="ld-notch"></div>
<div class="ld-phone-app">
<span class="ld-phone-kicker">courier app</span>
<span class="ld-phone-order" data-ld2="m-order">#4127</span>
<span class="ld-phone-status" data-ld2="m-status" data-state="pending">pending</span>
<button type="button" class="ld-ship" data-ld2="m-btn" tabindex="-1">Mark as shipped</button>
<span class="ld-post" data-ld2="m-post" hidden>POST /orders/4127/ship · 200</span>
</div>
</div>
</div>

<p class="ld-caption">The tap and the typing run on one scripted loop; each cycle is a new order. The push behaviour is the real thing: an action from another device updates every untouched field within a second — and never the one you're typing in.</p>

## Honest freshness, per backend

"Live" is a marketing word until someone tells you the mechanism. Not every backend can push, and Vantage never pretends otherwise — every connection states exactly what it delivers, up front:

<div class="ld-matrix">
<div class="ld-mrow"><span class="ld-mbackend">SurrealDB</span><span class="ld-mmech">live queries</span><span class="ld-msig ld-msig-push"><i class="ld-dot"></i>push<small>no setup</small></span></div>
<div class="ld-mrow"><span class="ld-mbackend">SpacetimeDB</span><span class="ld-mmech">subscriptions</span><span class="ld-msig ld-msig-push"><i class="ld-dot"></i>push<small>no setup</small></span></div>
<div class="ld-mrow"><span class="ld-mbackend">PostgreSQL</span><span class="ld-mmech">notify channels</span><span class="ld-msig ld-msig-push"><i class="ld-dot"></i>push<small>one trigger · explicit opt-in</small></span></div>
<div class="ld-mrow"><span class="ld-mbackend">SQLite · MySQL · MongoDB · REST · GraphQL · AWS · Kubernetes · CLI</span><span class="ld-mmech">background refresh</span><span class="ld-msig ld-msig-poll"><span class="material-symbols-outlined">schedule</span>poll<small>at an interval you choose</small></span></div>
<div class="ld-mrow"><span class="ld-mbackend">Debezium + Kafka</span><span class="ld-mmech">change-data-capture stream</span><span class="ld-msig ld-msig-push"><i class="ld-dot"></i>push<small>brings push to any backend</small></span></div>
<div class="ld-mfoot"><span class="material-symbols-outlined">rule</span><span><b>CDC — change-data-capture</b> — turns your database's own change log into a stream of events. Debezium reads it from Oracle, SQL Server, MySQL and most databases you already run, and publishes every change to Kafka; Vantage subscribes and delivers it as push to every open screen. And it isn't limited to Debezium — Vantage wires into any CDC mechanism through a custom cache strategy built on the open framework.</span></div>
</div>

## Built to ride a bad backend

Push is easy on a healthy network. The **Launch Control** example runs against a deliberately hostile API — injected latency, random 503s — because that is what production looks like on a bad day. Its grids ride straight through: rows never blank on an error, the last known state stays on screen, and when the backend recovers, the refresh catches up. The demo above plays that behaviour on a script; Launch Control does it against a real backend you can poke.

Vantage can also stand *in front of* the problem. Run it as a gateway over a poorly implemented third-party API: it polls the API once, at a rate you control, and fans every change out as push to all the services and screens behind it. The flaky vendor sees one polite client instead of twenty hungry ones — your rate limit is spent once, and everything downstream still gets notifications the moment something changes.

<div class="my-4">
    <a href="/examples/launch-control/" class="btn btn-primary me-2">Tour Launch Control</a>
    <a href="/examples/" class="btn btn-outline-primary">Browse the examples</a>
</div>

<p class="journey-note"><span class="material-symbols-outlined">arrow_forward</span><span><b>Next rung:</b> your console is live on your desk — now ship that liveness to your users. <a href="/solutions/data-mesh/">Wire in a real-time data mesh →</a></span></p>

<script src="/js/ld-live-demo.js" defer></script>
