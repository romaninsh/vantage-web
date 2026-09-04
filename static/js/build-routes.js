/* "Choose how you would build your app": four routes to an internal tool,
   one expanded at a time. Each step carries what it costs and how long it
   takes, and each option card fills its own Total / PoC / ETA in as soon
   as the visitor runs that route's numbers.

   Every figure on screen is derived from ASSUMPTIONS plus the people, days
   and elapsed on each step. Change a number here and the CLOSED notices,
   the chips, the timeline and the cards all follow. */

// ── Assumptions — the only numbers you should need to touch ──────────
const ASSUMPTIONS = {
  dayRate: 700,                    // $ per person per working day
  seats: 100,                      // users, for per-seat licences
  offTheShelfSeatPerMonth: 30,     // $ per seat per month
  lowCodeSeatPerMonth: 50,         // $ per seat per month, Retool-class
  retainedEngineers: 2,            // kept on an in-house build after it ships
  workingDaysPerYear: 220,
  workingDaysPerQuarter: 65,
  vendorCustomisation: 60000,      // vendor professional services for the gap
  vantageEnterprisePerYear: 0,     // 0 renders "talk to us"
};

const A = ASSUMPTIONS;
const seatYear = (perMonth) => A.seats * perMonth * 12;

/* A step is { icon, label, note, elapsed, ...cost } where cost is either
   { people, days } (person-days at the day rate) or { fixed }.
   `elapsed` is calendar time in WORKING days — 5 to the week, 21 to the month.
   { poc: true }      marks the step that constitutes a proof of concept.
   { closed: fn(cost), elapsed } is the closure notice; steps after it are
                      drawn greyed with their costs struck through.
   { divider }        is a captioned rule, used once for the free/enterprise line. */
const ROUTES = [
  {
    id: "inhouse",
    name: "Build it in-house",
    hook: "Your own team",
    color: "#eaa14e",
    steps: [
      { icon: "code", label: "Vibe-code a PoC in React", note: "One developer, one working week.", people: 1, days: 5, elapsed: 5, poc: true },
      { icon: "description", label: "Product proposal — cost, resources, timeline", note: "Written up and put in front of the exec.", people: 1, days: 10, elapsed: 10 },
      { closed: (c) => `Execs doubtful — a ${money(c)} commitment is too risky.`, elapsed: 30 },
      { icon: "groups", label: "Team of five assembled", note: "Hiring, backfilling, onboarding.", people: 1, days: 20, elapsed: 60 },
      { icon: "construction", label: "Two quarters of build", note: "Five engineers, half a year.", people: 5, days: 2 * A.workingDaysPerQuarter, elapsed: 130 },
      { icon: "rocket_launch", label: "Release targets set, then release", note: "Hardening, handover, launch.", people: 5, days: 10, elapsed: 20 },
    ],
    perYear: A.retainedEngineers * A.workingDaysPerYear * A.dayRate,
    perYearNote: `${A.retainedEngineers} engineers kept on to keep it alive`,
    verdict: "Best fit, but significant yearly cost.",
  },
  {
    id: "lowcode",
    name: "Low-code builder",
    hook: "A Retool-class SaaS",
    color: "#f472b6",
    steps: [
      { icon: "draw", label: "Prototype, built by hand", note: "No agent — every screen dragged into place.", people: 1, days: 15, elapsed: 15, poc: true },
      { icon: "description", label: "Product proposal — licences, infra, people", note: "Per-seat pricing goes in the spreadsheet.", people: 1, days: 10, elapsed: 10 },
      { closed: (c) => `Vendor and infrastructure commitment of ${money(c)} before anyone uses it.`, elapsed: 20 },
      { icon: "handshake", label: "External vendor onboarded", note: "Procurement, legal, security questionnaire.", people: 2, days: 15, elapsed: 40 },
      { icon: "dns", label: "Infrastructure provisioned and security-audited", note: "Their cloud, your audit.", people: 2, days: 30, elapsed: 50 },
      { icon: "database", label: "Data migrated to their cloud", note: "A copy of your data, kept in sync.", people: 2, days: 30, elapsed: 40 },
    ],
    perYear: seatYear(A.lowCodeSeatPerMonth),
    perYearNote: `${A.seats} seats at $${A.lowCodeSeatPerMonth}/month`,
    verdict: "Low cost, good fit, but non-compliant and has many limitations.",
  },
  {
    id: "shelf",
    name: "Off the shelf",
    hook: "Buy the nearest fit",
    color: "#38c6e0",
    steps: [
      { icon: "search", label: "Shortlist vendors, take the demo", note: "Two people, a week of calls.", people: 2, days: 5, elapsed: 10 },
      { icon: "science", label: "Trial in the vendor's sandbox", note: "On their sample data, not yours.", people: 2, days: 15, elapsed: 15, poc: true },
      { icon: "difference", label: "Gap analysis — it does most of it", note: "The last fifth is the part your team needed.", people: 1, days: 10, elapsed: 10 },
      { closed: (c) => `Procurement, and the gap remains — ${money(c)} to get to a partial fit.`, elapsed: 30 },
      { icon: "gavel", label: "Licence and procurement signed", note: "Legal, security review, budget line.", people: 2, days: 20, elapsed: 50 },
      { icon: "build", label: "Paid customisation for the gaps", note: "Vendor professional services.", fixed: A.vendorCustomisation, elapsed: 60 },
      { icon: "database", label: "Your data migrated in", note: "Mapped onto their model.", people: 2, days: 20, elapsed: 30 },
    ],
    perYear: seatYear(A.offTheShelfSeatPerMonth),
    perYearNote: `${A.seats} seats at $${A.offTheShelfSeatPerMonth}/month`,
    verdict: "Requires very costly migration. Painful long-term dependency.",
  },
  {
    id: "vantage",
    name: "Vantage",
    hook: "One download, free",
    color: "#818cf8",
    steps: [
      { icon: "download", label: "Download it; build the whole app in one AI session", note: "SQLite behind it — nothing to provision.", people: 1, days: 1, elapsed: 1 },
      { icon: "visibility", label: "Show a working application", note: "Real screens on real-shaped data, not a mock-up.", people: 1, days: 1, elapsed: 1, poc: true },
      { icon: "hub", label: "Point it at UAT — PostgreSQL and your APIs", note: "The agent re-tunes it in the same session.", people: 1, days: 2, elapsed: 2 },
      { icon: "forum", label: "Stakeholder feedback becomes features", note: "Another session or two.", people: 1, days: 3, elapsed: 3 },
      { icon: "key", label: "SSO integrated", note: "", people: 1, days: 1, elapsed: 1 },
      { icon: "verified_user", label: "In GitHub; security audit requested", note: "The app is a folder of YAML and Rhai — there is little to audit.", people: 1, days: 5, elapsed: 10 },
      { icon: "rocket_launch", label: "In production, in use", note: "", people: 1, days: 1, elapsed: 5 },
      { divider: "Everything above is free" },
      { icon: "badge", label: "Vantage onboarding — the last few features", note: "An enterprise build for what the free one can't do.", fixed: A.vantageEnterprisePerYear, fixedLabel: "talk to us", elapsed: 10 },
      { icon: "apartment", label: "Deployed firm-wide", note: "Into the catalogue — and the next app starts here.", people: 1, days: 2, elapsed: 5 },
    ],
    perYear: A.vantageEnterprisePerYear,
    perYearLabel: A.vantageEnterprisePerYear ? null : "talk to us",
    perYearNote: "the enterprise build; the free one stays free",
    verdict: "Fastest PoC. No-commitment build. Only pay if you scale.",
    verdictGood: true,
  },
];

// ── Formatting ───────────────────────────────────────────────────────
// Approximate on purpose: chips to the nearest $100, totals to the nearest $500.
function money(n, step = 100) {
  return "$" + (Math.round(n / step) * step).toLocaleString("en-US");
}

// Elapsed is in working days: 5 to the week, 21 to the month.
function dur(d) {
  if (d <= 1) return "1 day";
  if (d < 10) return `${d} days`;
  if (d < 45) return `${Math.round(d / 5)} weeks`;
  return `${Math.round(d / 21)} months`;
}

// A point on the timeline rather than a length.
function mark(d) {
  if (d <= 1) return "day 1";
  if (d < 10) return `day ${d}`;
  if (d < 45) return `wk ${Math.ceil(d / 5)}`;
  return `mo ${Math.round(d / 21)}`;
}

const stepCost = (s) => s.fixed != null ? s.fixed : (s.people != null ? s.people * s.days * A.dayRate : 0);

/* Walk a route once and collect everything the UI needs from it. */
function tally(route) {
  let reached = 0, unreached = 0, closedAt = -1, at = 0, poc = null, eta = 0;
  route.steps.forEach((s, i) => {
    if (s.divider) return;
    at += s.elapsed || 0;
    if (s.closed) { closedAt = i; return; }
    if (closedAt < 0) reached += stepCost(s); else unreached += stepCost(s);
    if (s.poc && poc === null) poc = at;
  });
  eta = at;
  return { reached, unreached, total: reached + unreached, closedAt, poc, eta, closed: closedAt >= 0 };
}

// ── Render ───────────────────────────────────────────────────────────
// Everything written to innerHTML below is assembled from the literals in
// this file; no visitor-supplied string ever reaches it.
const root = document.getElementById("build-routes");
if (root) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const solved = new Set();

  root.innerHTML = `
    <p class="br-prompt">Choose how you would build your app</p>
    <div class="br-options" role="group" aria-label="Four ways to build an internal tool">
      ${ROUTES.map((r) => `
        <button type="button" class="br-option" data-route="${r.id}" aria-pressed="false" style="--br-c:${r.color}">
          <span class="br-option-dot"></span>
          <b>${r.name}</b>
          <small>${r.hook}</small>
          <dl class="br-stats">
            <div><dt>Total cost</dt><dd data-stat="cost">?</dd></div>
            <div><dt>Yearly</dt><dd data-stat="year">?</dd></div>
            <div><dt>PoC</dt><dd data-stat="poc">?</dd></div>
            <div><dt>ETA</dt><dd data-stat="eta">?</dd></div>
          </dl>
          <hr class="br-rule">
          <p class="br-verdict${r.verdictGood ? " is-good" : ""}"></p>
        </button>`).join("")}
    </div>
    <div class="br-panel" hidden></div>`;

  const optionsEl = root.querySelector(".br-options");
  const panelEl = root.querySelector(".br-panel");

  optionsEl.querySelectorAll(".br-option").forEach((b) =>
    b.addEventListener("click", () => select(b.dataset.route)));

  function select(id) {
    const route = ROUTES.find((r) => r.id === id);
    optionsEl.querySelectorAll(".br-option").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.route === id)));
    renderPanel(route);
    fillStats(route);
  }

  function fillStats(route) {
    const card = optionsEl.querySelector(`.br-option[data-route="${route.id}"]`);
    if (solved.has(route.id)) return;
    solved.add(route.id);
    const t = tally(route);
    card.classList.add("is-solved");
    const set = (k, v, cls) => {
      const el = card.querySelector(`[data-stat="${k}"]`);
      el.textContent = v;
      if (cls) el.classList.add(cls);
    };
    // The card carries the whole programme cost — the ask, not just what was spent.
    if (t.total === 0) set("cost", "free", "br-good");
    else countUp(card.querySelector('[data-stat="cost"]'), t.total);
    if (route.perYearLabel) set("year", route.perYearLabel, "br-talk");
    else countUp(card.querySelector('[data-stat="year"]'), route.perYear);
    card.querySelector(".br-verdict").textContent = route.verdict;
    set("poc", t.poc != null ? dur(t.poc) : "—");
    // The elapsed is real work either way; red marks the routes that never shipped.
    set("eta", dur(t.eta), t.closed ? "br-bad" : "br-good");
  }

  function renderPanel(route) {
    const t = tally(route);
    let at = 0, shown = 0;
    let items = "";

    route.steps.forEach((s, i) => {
      if (s.divider) {
        items += `<li class="br-divider" style="--d:${shown++}"><span>${s.divider}</span></li>`;
        return;
      }
      at += s.elapsed || 0;
      if (s.closed) {
        items += `<li class="br-closed" style="--d:${shown++}">
          <span class="br-closed-tag">likely rejected</span>
          <span>${s.closed(t.unreached)}</span>
          <span class="br-closed-when">${dur(s.elapsed)} of waiting</span>
        </li>`;
        return;
      }
      const unreached = t.closed && i > t.closedAt;
      const cost = stepCost(s);
      const chip = s.fixedLabel && !cost
        ? `<span class="br-cost br-cost-talk">${s.fixedLabel}</span>`
        : `<span class="br-cost">${unreached ? `<s>${money(cost)}</s>` : money(cost)}</span>`;
      items += `<li class="br-step${unreached ? " is-unreached" : ""}" style="--d:${shown++}">
        <span class="br-when">${unreached ? "—" : mark(at)}</span>
        <span class="br-dot"><span class="material-symbols-outlined">${s.icon}</span></span>
        <div class="br-step-body">
          <b>${s.label}</b>
          ${s.note ? `<small>${s.note}</small>` : ""}
          <span class="br-took">${dur(s.elapsed)}${s.people != null ? ` · ${s.people} × ${s.days} person-days` : ""}</span>
        </div>
        <div class="br-step-cost">${chip}</div>
      </li>`;
    });

    panelEl.hidden = false;
    panelEl.style.setProperty("--br-c", route.color);
    panelEl.classList.toggle("br-anim", !reduce);
    panelEl.setAttribute("role", "region");
    panelEl.setAttribute("aria-label", route.name);
    panelEl.innerHTML = `
      <ol class="br-steps">${items}</ol>
      <div class="br-totals" aria-live="polite">
        <div><small>${t.closed ? "spent before rejection" : "to production"}</small><b data-count="${t.reached}">${money(0)}</b></div>
        <div><small>${t.closed ? "per year, had it shipped" : "per year"}</small>${
          route.perYearLabel
            ? `<b class="br-talk">${route.perYearLabel}</b>`
            : `<b data-count="${route.perYear}">${money(0)}</b>`
        }<em>${route.perYearNote}</em></div>
        <div><small>time to production</small><b class="${t.closed ? "br-bad" : "br-good"}">${dur(t.eta)}</b>${t.closed ? `<em>had it been approved</em>` : ""}</div>
      </div>`;

    // The totals wait for the steps to finish arriving.
    const settle = reduce ? 0 : shown * 70 + 260;
    panelEl.querySelectorAll("[data-count]").forEach((el) =>
      setTimeout(() => countUp(el, Number(el.dataset.count)), settle));
  }

  // Numbers roll up over ~600 ms; instant when the visitor has asked for less motion.
  function countUp(el, target) {
    if (reduce || target === 0) { el.textContent = money(target, 500); return; }
    const t0 = performance.now(), dur = 600;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      el.textContent = money(target * (1 - Math.pow(1 - p, 3)), 500);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}
