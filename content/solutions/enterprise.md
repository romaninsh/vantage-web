+++
title = "Vantage for your organisation"
description = "A distribution of Vantage UI assembled for you — your datasources, your widgets, your telemetry — with an architecture partnership, training and source escrow."
template = "page.html"
weight = 4

[extra]
kicker = "Solutions · Enterprise"
icon = "corporate_fare"
+++

<style>
  /* build sheet */
  .ent-spec { margin: 1.25rem 0 0; border: 1px solid var(--color-line); border-radius: 0.75rem; background: var(--color-surface-1); overflow: hidden; }
  .ent-spec-row { display: flex; gap: 1rem; align-items: baseline; padding: 0.85rem 1.15rem; border-top: 1px solid var(--color-line); font-size: 0.89rem; line-height: 1.6; color: var(--color-text-2); }
  .ent-spec-row:first-child { border-top: 0; }
  .ent-spec-row b { color: var(--color-text-1); }
  .ent-spec-num { flex: none; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; color: var(--color-accent-400); }
  .ent-spec-row code { font-size: 0.82em; color: var(--color-accent-300); }

  /* re-package pipeline */
  .ent-pipeline { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin: 1.5rem 0 0; }
  .ent-step { border: 1px solid var(--color-line); border-radius: 0.75rem; background: var(--color-surface-1); padding: 1rem 1.1rem; }
  .ent-step-num { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.14em; color: var(--color-accent-400); }
  .ent-step h4 { margin: 0.45rem 0 0.3rem; font-size: 0.95rem; color: var(--color-text-1); }
  .ent-step p { margin: 0; font-size: 0.83rem; line-height: 1.55; color: var(--color-text-2); }

  /* figures */
  .ent-figure { display: block; width: 100%; max-width: 34rem; margin: 2rem auto 0.5rem; }

  /* trust block */
  .ent-trust { display: flex; gap: 2rem; align-items: center; margin-top: 1.5rem; }
  .ent-trust-img { flex: none; width: 15rem; }
  .ent-trust-list { display: flex; flex-direction: column; gap: 0.9rem; font-size: 0.89rem; line-height: 1.6; color: var(--color-text-2); }
  .ent-trust-list b { color: var(--color-text-1); }

  /* lead form */
  .ent-form { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; max-width: 34rem; margin: 1.75rem auto 0; }
  .ent-field { width: 100%; border: 1px solid var(--color-line-strong); border-radius: 0.6rem; background: var(--color-surface-1); padding: 0.7rem 1rem; font-size: 0.92rem; color: var(--color-text-1); }
  .ent-field::placeholder { color: var(--color-text-3); }
  .ent-field:focus { outline: 2px solid var(--color-accent-400); outline-offset: -1px; }
  .ent-wide { grid-column: 1 / -1; }
  .ent-form .btn { grid-column: 1 / -1; justify-self: center; min-width: 15rem; }
  .ent-form-note, .ent-form-thanks { text-align: center; font-size: 0.85rem; color: var(--color-text-3); }
  .ent-form-thanks { font-size: 0.95rem; grid-column: 1 / -1; color: var(--color-text-2); }

  @media (max-width: 640px) {
    .ent-pipeline { grid-template-columns: 1fr; }
    .ent-trust { flex-direction: column; }
    .ent-trust-img { width: 13rem; }
    .ent-form { grid-template-columns: 1fr; }
  }
</style>

The previous pages describe stages — a console over the data you already have, screens that stay live, a mesh across your systems and partners. This page is all of it, packaged for an organisation — with a partner behind it. Not a seat license on somebody else's cloud: a build that is yours, a team that trains yours, and an exit position in writing.

## Your own distribution of Vantage UI

The free download is one binary for everyone. Your distribution is assembled — from parts you choose:

<img class="ent-figure" src="/images/solutions/ent-build.svg" alt="Build sheet: five chosen modules — datasources, widgets, telemetry, install domain, data models — assembled into one certified distribution of Vantage UI">

<div class="ent-spec">
  <div class="ent-spec-row"><span class="ent-spec-num">01</span><span><b>Your datasources.</b> The backends you actually run, and nothing else — including custom datasources built on the open framework, up to Debezium-grade change-data-capture for Oracle, SQL Server and Db2.</span></div>
  <div class="ent-spec-row"><span class="ent-spec-num">02</span><span><b>Your widgets.</b> Custom UI components — built by us or by your own team — compiled into the binary, not bolted on.</span></div>
  <div class="ent-spec-row"><span class="ent-spec-num">03</span><span><b>Your telemetry.</b> The free version bundles crash analytics; enterprise builds can disable it or point it at your own account.</span></div>
  <div class="ent-spec-row"><span class="ent-spec-num">04</span><span><b>Your install domain.</b> <code>vantage://</code> installs restricted to an allowlist you control — your organisation's apps, nobody else's.</span></div>
  <div class="ent-spec-row"><span class="ent-spec-num">05</span><span><b>Your data models, typed in Rust.</b> Beyond YAML: entity models with custom triggers and custom validation, versioned as an ordinary crate your whole organisation shares.</span></div>
</div>

### From tweak to fleet

The build and distribution pipeline is set up once and stays yours to drive:

<div class="ent-pipeline">
  <div class="ent-step"><span class="ent-step-num">STEP 1</span><h4>You deliver the tweak</h4><p>A widget crate, a custom datasource, a model change — written by your team against the open framework.</p></div>
  <div class="ent-step"><span class="ent-step-num">STEP 2</span><h4>We re-package</h4><p>Your parts, compiled and signed into the next build of your distribution.</p></div>
  <div class="ent-step"><span class="ent-step-num">STEP 3</span><h4>Your fleet runs it</h4><p>Certified and pre-installed across the organisation — nobody hunts for a download link.</p></div>
</div>

macOS & Linux today; Windows builds are delivered for enterprise customers.

## An architecture partner, not a license vendor

A license vendor hands you a login and an invoice. We sit down with your architects and design the mesh: which sources can push, where the facades run, what the shared model crates look like, which team owns what.

Then we train your people — two disciplines, taught together:

- **Building with Vantage.** From the first console to facade APIs and sidecars — your engineers learn the stack they now own.
- **Relying on AI properly.** Agents author most of a Vantage app, and a vibe-coded frontend is fine. The code that runs your business is different: we teach your teams to direct and review agent work, so it stays reviewable engineering instead of turning into slop.

## Built so you can leave

Lock-in is a design choice, and we made the opposite one. The exit is structural, not a promise of goodwill:

<div class="ent-trust">
  <img class="ent-trust-img" src="/images/solutions/ent-escrow.svg" alt="A sealed source-escrow envelope holding the Vantage UI source, released to you if Vantage is discontinued">
  <div class="ent-trust-list">
    <span><b>Source escrow.</b> If Vantage is discontinued — bankruptcy or acquisition — the Vantage UI source is released to you.</span>
    <span><b>MIT underneath, forever.</b> The framework — query builder, ORM, active record, entity modeling — is open source and stays that way.</span>
    <span><b>Your facades, your domain.</b> Everything you deploy runs in your infrastructure. None of it contains code that counts your seats.</span>
  </div>
</div>

## Talk to us

One conversation is enough to scope a distribution.

<form id="ent-form" class="ent-form">
  <input class="ent-field ent-wide" name="org" placeholder="Organisation" required autocomplete="organization">
  <input class="ent-field" type="email" name="email" placeholder="Contact email" required autocomplete="email">
  <input class="ent-field" type="tel" name="phone" placeholder="Phone (optional)" autocomplete="tel">
  <textarea class="ent-field ent-wide" name="notes" rows="5" placeholder="The sources you run, the scale, the timeline"></textarea>
  <button type="submit" class="btn btn-lg btn-primary">
    <span class="material-symbols-outlined">send</span>
    Get in touch
  </button>
</form>

<p class="ent-form-note" style="margin-top:1rem">Tell us about your data landscape — we'll come back with a proposed stack.</p>

<script type="module" src="/js/enterprise-lead.js"></script>
