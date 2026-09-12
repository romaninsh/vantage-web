+++
title = "Replace Your Legacy App (without a migration)"
description = "You know the app. Built a decade ago. In use every day. Developers dread touching it, and the business won't fund a rewrite. Vantage replaces it without moving your data in days."
template = "page.html"
weight = 1
aliases = ["/solutions/internal-tools-teams/", "/solutions/internal-tools/"]

[extra]
kicker = "Solutions · Stage 1"
icon = "space_dashboard"
+++

<style>
/* ---- Stage-1 page visuals (all custom classes prefixed it-) ---- */

/* The drawer: legacy artifacts in, a running Vantage app out */
.it-drawer { margin: 2.5rem auto 0; max-width: 36rem; }
.it-files { position: relative; z-index: 0; display: flex; flex-wrap: wrap; justify-content: center; align-items: flex-end; gap: 0 0.4rem; padding: 0 1.25rem; }
.it-file { transform: rotate(var(--tilt, 0deg)) translateY(var(--sink, 0px)); background: var(--color-surface-1); border: 1px dashed var(--color-line-strong); border-bottom: none; border-radius: 0.55rem 0.55rem 0 0; padding: 0.5rem 0.75rem 1.5rem; }
.it-file b { display: block; font-family: var(--font-mono); font-size: 0.72rem; font-weight: 600; color: var(--color-text-2); }
.it-file small { display: block; margin-top: 0.15rem; font-size: 0.64rem; color: var(--color-text-3); }
.it-drawer-front { position: relative; z-index: 1; margin-top: -1.15rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.6rem; min-height: 5.25rem; padding: 0.6rem 1.25rem; border: 1px solid var(--color-line-strong); border-radius: 0.8rem; background: linear-gradient(180deg, var(--color-surface-2), var(--color-surface-1)); box-shadow: 0 18px 40px -18px rgba(0, 0, 0, 0.7); }
.it-drawer-label { font-family: var(--font-mono); font-size: 0.72rem; color: var(--color-text-1); border: 1px solid var(--color-line); border-radius: 0.4rem; padding: 0.35rem 0.7rem; background: var(--color-bg); max-width: 100%; text-align: center; line-height: 1.4; }
.it-drawer-cursor { display: inline-block; width: 1px; height: 0.85em; margin-left: 2px; vertical-align: -0.1em; background: var(--color-accent-300); animation: it-blink 1.1s steps(2, jump-none) infinite; }
.it-drawer-handle { position: relative; width: 4rem; height: 0.5rem; border-radius: 999px; border: 1px solid var(--color-line-strong); background: var(--color-surface-2); overflow: hidden; }
.it-drawer-handle::after { content: ""; position: absolute; top: 0; bottom: 0; left: -35%; width: 35%; border-radius: inherit; background: linear-gradient(90deg, transparent, var(--color-accent-400), transparent); animation: it-progress 2.6s ease-in-out infinite; }
.it-chute { width: 2px; height: 0.9rem; margin: 0 auto; background: linear-gradient(180deg, var(--color-line-strong), color-mix(in srgb, var(--color-accent-500) 60%, transparent)); }
.it-output { position: relative; z-index: 1; width: fit-content; margin: 0 auto; display: flex; align-items: center; gap: 0.55rem; border: 1px solid color-mix(in srgb, var(--color-accent-500) 45%, transparent); border-radius: 0.7rem; background: color-mix(in srgb, var(--color-accent-500) 10%, var(--color-surface-1)); padding: 0.55rem 0.9rem; box-shadow: 0 14px 30px -18px color-mix(in srgb, var(--color-accent-500) 60%, transparent); }
.it-output .material-symbols-outlined { font-size: 1.2rem; color: var(--color-accent-300); }
.it-output b { display: block; font-family: var(--font-mono); font-size: 0.78rem; font-weight: 600; color: var(--color-text-1); }
.it-output small { display: block; margin-top: 0.1rem; font-size: 0.62rem; color: var(--color-text-3); }
@keyframes it-blink { 50% { opacity: 0.3; } }
@keyframes it-progress { 0% { left: -35%; } 100% { left: 100%; } }
@media (prefers-reduced-motion: reduce) {
  .it-drawer-cursor, .it-drawer-handle::after { animation: none; }
}
p.it-caption { margin: 0.9rem auto 0; max-width: 32rem; text-align: center; font-size: 0.8rem; line-height: 1.55; color: var(--color-text-3); }

/* Agent session transcript */
.it-agent { margin: 2rem 0 0; border: 1px solid var(--color-line); border-radius: 0.9rem; overflow: hidden; background: var(--color-surface-1); }
.it-agent-head { display: flex; align-items: center; gap: 0.5rem; padding: 0.55rem 0.9rem; border-bottom: 1px solid var(--color-line); background: var(--color-surface-2); font-family: var(--font-mono); font-size: 0.68rem; color: var(--color-text-3); }
.it-agent-head .material-symbols-outlined { font-size: 1rem; color: var(--color-accent-400); }
.it-agent-log { padding: 0.95rem 1rem; display: flex; flex-direction: column; gap: 0.5rem; font-family: var(--font-mono); font-size: 0.76rem; line-height: 1.55; }
.it-agent-log p { margin: 0; color: var(--color-text-3); }
.it-agent-log p code { color: var(--color-accent-300); }
.it-agent-log p.it-think { color: var(--color-text-1); font-style: italic; }
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


Every software project carries a real cost — a team to staff, infrastructure to stand up, data to migrate. Rolling that cost into launching a new product or entering a new market is easy to justify.

Legacy software offers no such upside. Without a new market to conquer, or a new feature to release, it's just old screens being rearranged. This, however, is a perfect opportunity to try Vantage.

### Cost

Vantage skips all three. No team — you and an agent, rebuilding the app together. No infrastructure — it runs on your laptop, fast. No new security sign-off — the same connection your team already grants DBeaver is all it needs.

### No data migration necessary

Vantage speaks to a wide range of databases — Oracle, MySQL, even DynamoDB — through your existing tables and relations, exactly as they are. Nothing moves.

Your agent can go further: read through the old codebase, pull out the business logic buried in it, and rebuild it inside Vantage. Tens of thousands of lines of legacy code become a few hundred.

### No need to assemble engineering team

A team of experienced developers will tell you straight: a powerful application needs a powerful framework. With Vantage you make your AI assistant operate like a professional software engineer — re-use, not rewrite, saving you tokens and the time spent debugging silly errors. A frontier AI model, left to its own devices, will start coding in React — and bury itself in a codebase fifty times larger than it needs to be.

That's exactly the approach Vantage eliminates. It's a low-code framework built specifically for AI agentic coding, aimed at delivering results at the lowest possible token cost.

<div class="it-drawer" role="img" aria-label="Legacy artifacts — a screenshot, source code, a database dump, a spreadsheet, an API endpoint — feeding a prompt that reads 'replicate my old admin in Vantage', with a freshly built Vantage app running below">
  <div class="it-files">
    <div class="it-file" style="--tilt:-2.5deg; --sink:4px"><b>screenshot-3.png</b><small>screenshots of the old system</small></div>
    <div class="it-file" style="--tilt:1.8deg; --sink:9px"><b>admin-panel</b><small>source code, any language</small></div>
    <div class="it-file" style="--tilt:-1.2deg; --sink:2px"><b>db-dump.sql</b><small>current database schema</small></div>
    <div class="it-file" style="--tilt:2.4deg; --sink:7px"><b>orders.xlsx</b><small>data, in any format</small></div>
    <div class="it-file" style="--tilt:-2deg; --sink:5px"><b>api.backend/v1/rest/</b><small>an API endpoint</small></div>
  </div>
  <div class="it-drawer-front">
    <span class="it-drawer-label">"replicate my old admin in Vantage"<span class="it-drawer-cursor"></span></span>
    <span class="it-drawer-handle"></span>
  </div>
  <div class="it-chute"></div>
  <div class="it-output">
    <span class="material-symbols-outlined">bolt</span>
    <div><b>admin.vantage</b><small>your new app — running</small></div>
  </div>
</div>

Feed it anything — a screenshot, the old codebase, a schema, a spreadsheet, an API. Say what you want rebuilt, and a working Vantage app comes out the other side.

<blockquote class="it-quote">
  <p>"I took screenshots of my legacy admin system, added credentials for my non-prod environment to a <code>.env</code> file, and asked Claude: 'Replicate my old admin in Vantage.' Fifteen minutes later, I was using it to enter data."</p>
  <cite>— Peter</cite>
</blockquote>

## Real use-case — cost comparison

We ran a real cost comparison between the different approaches, and recorded the projected numbers. This is what we found:

<div id="build-routes" class="br" aria-label="Choose how you would build your app: four routes with the cost of each step"></div>
<script type="module" src="/js/build-routes.js"></script>

## What else is worth an evening

Not everything worth building is mission-critical. Some of it is just something your team has been meaning to hack together — Vantage is fast enough to actually do it:

<div class="roadmap-deck mt-10" id="ideaDeck" role="button" tabindex="0" aria-label="App idea cards — activate to see the next">
  <article class="roadmap-card">
    <span class="badge-soon deck-badge">Idea</span>
    <span class="material-symbols-outlined deck-icon">toggle_on</span>
    <h3 class="mt-3 text-h3">Feature switches</h3>
    <p class="mt-2 text-sm leading-relaxed text-text-2">Company currently pays a third party for a "feature switch" interface and API. Perfect candidate for Vantage — cut the cost. Spend one evening building it, then present it to the stakeholders.</p>
  </article>
  <article class="roadmap-card">
    <span class="badge-soon deck-badge">Idea</span>
    <span class="material-symbols-outlined deck-icon">workspaces</span>
    <h3 class="mt-3 text-h3">Custom CRD monitoring</h3>
    <p class="mt-2 text-sm leading-relaxed text-text-2">We run Kubernetes with custom CRDs. K9s doesn't support our extensions, and every console that does wants money for it. Build our own internal monitoring console in Vantage.</p>
  </article>
  <article class="roadmap-card">
    <span class="badge-soon deck-badge">Idea</span>
    <span class="material-symbols-outlined deck-icon">tv</span>
    <h3 class="mt-3 text-h3">Live sales, on the wall</h3>
    <p class="mt-2 text-sm leading-relaxed text-text-2">The TV on our office wall could be showing real-time sales instead of sitting blank. Build the app in Vantage, drop it on a Raspberry Pi, and plug it straight into the screen.</p>
  </article>
  <article class="roadmap-card">
    <span class="badge-soon deck-badge">Idea</span>
    <span class="material-symbols-outlined deck-icon">live_tv</span>
    <h3 class="mt-3 text-h3">Enjoy the show, while CI runs</h3>
    <p class="mt-2 text-sm leading-relaxed text-text-2">Our developers spend a lot of time watching CI builds and waiting on approvals — we run a fairly unique build/approval process. Vantage can give it a proper visualization: something to watch while sipping tea.</p>
  </article>
</div>
<p class="mt-6 text-center text-sm text-text-3">
  <span class="material-symbols-outlined me-1 !text-[1rem]">touch_app</span>
  Click to deal the next card
</p>

## The agent writes it, then checks its own work

`SKILL.md` files instruct your agent on how to write `yaml` files and use `mcp` to check its work. A typical session involves making a change and checking it right away:

<div class="it-agent" aria-label="An agent session debugging a broken aggregate query over a local MCP server">
  <div class="it-agent-head"><span class="material-symbols-outlined">smart_toy</span>your coding agent · local MCP session</div>
  <div class="it-agent-log">
    <p>Writing <code>pages/revenue-by-day.yaml</code>.</p>
    <p>Executing <code>mcp__vantage-ui__list_logs</code></p>
    <p class="it-think">"Vantage reloaded our page, but is reporting query errors. Investigating."</p>
    <p>Executing <code>mcp__vantage-ui__preview_query</code></p>
    <p>Executing <code>mcp__vantage-ui__run_data_script</code></p>
    <p class="it-think">"I made a mistake using an incorrect aggregate column in a subquery. Applying the fix."</p>
    <p>Writing <code>pages/revenue-by-day.yaml</code>.</p>
    <p>Executing <code>mcp__vantage-ui__list_logs</code></p>
    <p class="it-think it-check">"The page reloaded and there are no errors."</p>
  </div>
</div>

The ability to observe the running app — while keeping it away from production and sensitive user data — is a great way to make sure it works as intended. `run_data_script` only works if you allow it.

## Build once, share with the whole team

One person builds the tool; the whole team opens a link. A Vantage app is only config — YAML and Rhai in a folder — so sharing it is sharing a git repo, or a zip if that's easier. The console travels. The data never does.

<div class="it-share" aria-label="How a Vantage app is built once and shared with a team">
  <div class="it-step">
    <span class="share-num">1</span>
    <span class="material-symbols-outlined share-ico">smart_toy</span>
    <h4>You build it</h4>
    <p>Your agent wires up the pages, tables and actions over the local MCP server — against dev credentials.</p>
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
- **Telemetry, stated plainly.** The free version carries crash analytics — and an enterprise build can turn it off or route it to your own account.

## See it in action

**Periscope** shows this shape for Kubernetes — a full control room written entirely in YAML, drilling from namespaces to workloads to pods. The **AWS control console example** wraps the `aws` CLI to surface exactly the resources you operate, nothing more — it lands in the examples repo soon.

<div class="my-4">
    <a href="/examples/" class="btn btn-primary me-2">Browse the examples</a>
    <a href="/download/" class="btn btn-outline-primary">Download — free</a>
</div>

<p class="journey-note"><span class="material-symbols-outlined">arrow_forward</span><span><b>Next rung:</b> your console is already live — open screens update by themselves. <a href="/solutions/live-data/">Here's what that means →</a></span></p>
