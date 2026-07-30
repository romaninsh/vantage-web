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
.ld-title {
    font-family: var(--ld-mono);
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-text-3);
}
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
.ld-edit .ld-flash { animation-name: ld-flash-live; }
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

/* ── Draft-survives edit vignette ────────────────────────────── */
.ld-edit {
    max-width: 30rem;
    margin: 1.75rem auto;
    border: 1px solid var(--color-line);
    border-radius: 0.75rem;
    background: var(--color-surface-1);
    padding: 0.9rem 1.1rem 1rem;
}
.ld-edit-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.55rem;
    margin-bottom: 0.35rem;
    border-bottom: 1px solid var(--color-line);
    font-family: var(--ld-mono);
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-text-2);
}
.ld-edit-mode { color: var(--color-accent-300); }
.ld-field {
    display: grid;
    grid-template-columns: 5.2rem 1fr auto;
    align-items: center;
    gap: 0.6rem;
    padding: 0.32rem 0;
    font-size: 0.85rem;
}
.ld-flab { font-size: 0.76rem; color: var(--color-text-3); }
.ld-fval {
    font-family: var(--ld-mono);
    color: var(--color-text-1);
    border: 1px solid var(--color-line);
    border-radius: 0.4rem;
    background: var(--color-surface-2);
    padding: 0.22rem 0.5rem;
}
.ld-fval-held { border-color: color-mix(in srgb, var(--color-accent-400) 55%, transparent); }
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
.ld-tag-held {
    color: var(--color-accent-300);
    border-color: color-mix(in srgb, var(--color-accent-400) 45%, transparent);
}
.ld-tag-live {
    color: var(--ld-live);
    border-color: color-mix(in srgb, var(--ld-live) 35%, transparent);
}
.ld-toast {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-top: 0.7rem;
    padding: 0.5rem 0.7rem;
    border-radius: 0.5rem;
    border: 1px solid color-mix(in srgb, var(--ld-err) 40%, transparent);
    background: color-mix(in srgb, var(--ld-err) 10%, transparent);
    font-size: 0.78rem;
    line-height: 1.45;
    color: #fca5a5;
}
.ld-toast b { color: #fecaca; }
.ld-toast .material-symbols-outlined { font-size: 1.05rem; margin-top: 0.05rem; color: var(--ld-err); }

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
}
</style>

Dashboards lie. Whatever is on screen is the world as of the last poll — the refresh button is a confession that it isn't current, and the stale row between polls is where the wrong call gets made. Retool-class tools poll. A fast poll is still a poll.

**In Vantage, open screens update by themselves.** When a row changes anywhere in your organisation, every screen showing it catches up within about a second — pushed straight from the source, wherever the source can push. And whichever way freshness arrives, the local cache paints the screen instantly: no spinner standing in for data you already had.

If you built the stage-1 console, you have already watched this happen — tables that just stay right. This page is what's underneath, and how far it goes.

## Same feed, two dashboards

One scripted feed drives both panels below, on a 24-second loop, live in this page. The left panel refreshes on a timer, the way polling dashboards do. The right panel behaves like a Vantage screen: every change is pushed and lands in under a second. Midway through the loop, the backend starts throwing 503s — watch which side goes blank.

<div id="ld-demo" class="ld-demo" aria-hidden="true">
<div class="ld-panel" data-panel="poll">
<div class="ld-head"><span class="ld-title">Refresh-based</span><span class="ld-chip"><span class="material-symbols-outlined" data-ld="poll-spin">sync</span><span data-ld="poll-status">refreshed 0 s ago</span></span></div>
<div class="ld-rows">
<div class="ld-row"><span class="ld-lab">orders / min</span><span class="ld-val" data-row="orders">132</span></div>
<div class="ld-row"><span class="ld-lab">queue depth</span><span class="ld-val" data-row="queue">7</span></div>
<div class="ld-row"><span class="ld-lab">p95 latency</span><span class="ld-val" data-row="p95">210 ms</span></div>
<div class="ld-row"><span class="ld-lab">workers</span><span class="ld-val" data-row="workers">12</span></div>
</div>
<div class="ld-errbar" data-ld="poll-err" hidden><span class="material-symbols-outlined">error</span>HTTP 503 — request failed</div>
</div>
<div class="ld-panel ld-panel-live" data-panel="push">
<div class="ld-head"><span class="ld-title">Vantage</span><span class="ld-chip" data-ld="push-chip" data-state="live"><i class="ld-dot"></i><span data-ld="push-status">live · under a second behind</span></span></div>
<div class="ld-rows">
<div class="ld-row"><span class="ld-lab">orders / min</span><span class="ld-val" data-row="orders">132</span></div>
<div class="ld-row"><span class="ld-lab">queue depth</span><span class="ld-val" data-row="queue">7</span></div>
<div class="ld-row"><span class="ld-lab">p95 latency</span><span class="ld-val" data-row="p95">210 ms</span></div>
<div class="ld-row"><span class="ld-lab">workers</span><span class="ld-val" data-row="workers">12</span></div>
</div>
</div>
</div>

<p class="ld-caption">A scripted demo — but the behaviours are the real ones: push latency, poll staleness, and what each side does when the backend fails. During the outage, the live panel keeps the last known state and catches up on reconnect; the polling side does what polling dashboards do.</p>

## Both directions

A live screen you can't act from is a wall monitor. In Vantage, the same layer that streams reads carries writes: edit a cell, submit a form, fire an action — it goes back to the source. While you edit, the fields you haven't touched keep tracking upstream changes, so the record moves under you and you see it move. The fields you have touched hold your value. And if the save fails, nothing is discarded — a draft survives a failed save.

<div class="ld-edit" aria-hidden="true">
<div class="ld-edit-head"><span>order #4127</span><span class="ld-edit-mode">editing</span></div>
<div class="ld-field"><span class="ld-flab">status</span><span class="ld-fval ld-fval-held">on hold<i class="ld-caret"></i></span><span class="ld-tag ld-tag-held">yours · holds</span></div>
<div class="ld-field"><span class="ld-flab">assignee</span><span class="ld-fval" data-row="track-assignee">m.reyes</span><span class="ld-tag ld-tag-live">tracking upstream</span></div>
<div class="ld-field"><span class="ld-flab">items</span><span class="ld-fval" data-row="track-items">17</span><span class="ld-tag ld-tag-live">tracking upstream</span></div>
<div class="ld-toast"><span class="material-symbols-outlined">error</span><span><b>503 — save failed.</b> The draft stays. Retry when you're ready — nothing was thrown away.</span></div>
</div>

<p class="ld-caption">The two tracking fields are wired to the same loop as the demo above — they keep moving while the draft holds.</p>

## Honest freshness, per backend

"Live" is a marketing word until someone tells you the mechanism. Not every backend can push, and Vantage never pretends otherwise — every connection states exactly what it delivers, up front:

<div class="ld-matrix">
<div class="ld-mrow"><span class="ld-mbackend">SurrealDB</span><span class="ld-mmech">live queries</span><span class="ld-msig ld-msig-push"><i class="ld-dot"></i>push<small>no setup</small></span></div>
<div class="ld-mrow"><span class="ld-mbackend">SpacetimeDB</span><span class="ld-mmech">subscriptions</span><span class="ld-msig ld-msig-push"><i class="ld-dot"></i>push<small>no setup</small></span></div>
<div class="ld-mrow"><span class="ld-mbackend">PostgreSQL</span><span class="ld-mmech">notify channels</span><span class="ld-msig ld-msig-push"><i class="ld-dot"></i>push<small>one trigger · explicit opt-in</small></span></div>
<div class="ld-mrow"><span class="ld-mbackend">SQLite · MySQL · MongoDB · REST · GraphQL · AWS · Kubernetes · CLI</span><span class="ld-mmech">background refresh</span><span class="ld-msig ld-msig-poll"><span class="material-symbols-outlined">schedule</span>poll<small>at an interval you choose</small></span></div>
<div class="ld-mfoot"><span class="material-symbols-outlined">rule</span><span>A capability a backend doesn't have is an explicit <b>not supported</b> — never a silent guess. What the screen shows is what the source knows.</span></div>
</div>

## Built to ride a bad backend

Push is easy on a healthy network. The **Launch Control** example runs against a deliberately hostile API — injected latency, random 503s — because that is what production looks like on a bad day. Its grids ride straight through: rows never blank on an error, the last known state stays on screen, and when the backend recovers, the refresh catches up. The demo above plays that behaviour on a script; Launch Control does it against a real backend you can poke.

<div class="my-4">
    <a href="/examples/launch-control/" class="btn btn-primary me-2">Tour Launch Control</a>
    <a href="/examples/" class="btn btn-outline-primary">Browse the examples</a>
</div>

<p class="journey-note"><span class="material-symbols-outlined">arrow_forward</span><span><b>Next rung:</b> your console is live on your desk — now ship that liveness to your users. <a href="/solutions/data-mesh/">Wire in a real-time data mesh →</a></span></p>

<script src="/js/ld-live-demo.js" defer></script>
