+++
title = "Internal-tools teams"
description = "Run your platform through one tool you control — pulling live state from across the org, and retiring the old custom-built dashboards."
template = "page.html"
weight = 1

[extra]
kicker = "Solutions"
icon = "groups"
+++

Engineering and SRE teams end up running a platform through a drawer full of old custom-built tools — a script here, a half-maintained dashboard there, an internal admin nobody wants to touch. Every one of them is one more thing to keep alive.

**Vantage UI is a third option.** Point an AI agent at your systems; it writes the control tool — declarative YAML plus Rhai logic — over a local MCP server. You get one console that fetches live state from anywhere in the organisation — databases, AWS, your own APIs, CI, CLI tools — as up-to-date records, logs and, when you want them, charts.

Unlike a tool like DataDog, which pulls all your data into its own cloud to show it back to you, Vantage leaves the data where it already lives and reads it in real time. Nothing to ingest, nothing to ship out — and you can finally retire those old custom-built things.

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

<p class="share-footnote"><span class="material-symbols-outlined">shield</span> App config stays private to your organisation, and access credentials are only ever stored locally.</p>

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

- **Fast and reactive.** A smart local cache (Diorama) keeps big grids instant, tables refresh in the background, and logs stream in real time — no spinners, no manual reloads.
- **Far less friction than the AWS console.** One purpose-built screen instead of clicking through a clunky web console hunting for the resource you need.
- **Customise everything.** Make any cell clickable, define your own actions and workflows, and wire up exactly the buttons your team needs — not a fixed set someone else chose.
- **Peace of mind, locally.** It all runs on your own machine. You can read every line of YAML and Rhai, see exactly what the tool does, and keep evolving it as the work changes.

## See it in action

The **AWS control console example** shows this shape — wrapping the `aws` CLI to surface exactly the resources you operate, nothing more. (Landing in the examples repo soon.)

<div class="my-4">
    <a href="/examples/" class="btn btn-primary me-2">Browse the examples</a>
    <a href="/download/" class="btn btn-outline-primary">Download for Mac — free</a>
</div>
