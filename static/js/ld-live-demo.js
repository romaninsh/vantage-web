/* /solutions/live-data/ — scripted demos.
   Demo 1 (24 s loop): one feed, two panels. The live panel receives
   pushes ~0.4 s after each change, automatically. The refresh-based
   panel updates only when the READER clicks its Refresh button — it
   pulls the feed's current values and its staleness counter (real
   elapsed time, s → min → h) resets. Midway through each loop the
   "backend" throws 503s; a click landing there gets the error bar.
   Demo 2 (12 s loop): the same order open on two devices — a desktop
   form where a user is slowly typing delivery notes, and a courier
   phone that marks the order shipped mid-cycle. The status flips on
   the desktop within a second; the field being typed in is never
   touched. Each cycle is a new order.
   Everything renders as a pure function of wall-clock phase, so both
   demos are deterministic, survive tab throttling, and loop cleanly.
   Plain JS, no dependencies. */
(() => {
  "use strict";

  const root = document.getElementById("ld-demo");
  const devices = document.querySelector(".ld-devices");
  if (!root && !devices) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  const setCell = (el, v, flash) => {
    if (!el || el.textContent === v) return;
    el.textContent = v;
    if (flash && !reduced.matches) {
      el.classList.remove("ld-flash");
      void el.offsetWidth; // restart the animation
      el.classList.add("ld-flash");
    }
  };

  /* ════ Demo 1: poll vs push ════════════════════════════════════ */

  const PERIOD = 24;          // s — full loop
  const PUSH_DELAY = 0.4;     // s — source → live panel
  const OUTAGE_START = 11.5;  // s — backend starts failing
  const OUTAGE_END = 17.5;    // s — backend recovers

  const BASE = { orders: "132", queue: "7", p95: "210 ms", workers: "12" };
  const EVENTS = [
    { t: 1.0,  row: "orders",  v: "141" },
    { t: 3.5,  row: "queue",   v: "9" },
    { t: 5.5,  row: "p95",     v: "198 ms" },
    { t: 8.0,  row: "orders",  v: "126" },
    { t: 9.5,  row: "workers", v: "13" },
    { t: 11.0, row: "queue",   v: "4" },
    { t: 14.0, row: "orders",  v: "118" },  // emitted mid-outage
    { t: 16.0, row: "queue",   v: "6" },    // emitted mid-outage
    { t: 19.0, row: "p95",     v: "232 ms" },
    { t: 21.5, row: "workers", v: "12" },
  ];

  const inOutage = (t) => t >= OUTAGE_START && t < OUTAGE_END;

  // What the source holds at time t.
  const truthAt = (t) => {
    const s = Object.assign({}, BASE);
    for (const e of EVENTS) if (e.t <= t) s[e.row] = e.v;
    return s;
  };

  // When a pushed change reaches the live panel: normally PUSH_DELAY after
  // the event; changes emitted during the outage flush at reconnect.
  const arrival = (e) => {
    const a = e.t + PUSH_DELAY;
    return inOutage(a) ? OUTAGE_END : a;
  };
  const pushViewAt = (t) => {
    const s = Object.assign({}, BASE);
    for (const e of EVENTS) if (arrival(e) <= t) s[e.row] = e.v;
    return s;
  };

  const collect = (sel) => {
    const m = {};
    if (root) root.querySelectorAll(sel + " [data-row]").forEach((el) => { m[el.dataset.row] = el; });
    return m;
  };
  const pollCells = collect("[data-panel='poll']");
  const pushCells = collect("[data-panel='push']");

  const q = (name) => (root ? root.querySelector("[data-ld='" + name + "']") : null);
  const pollStatus = q("poll-status");
  const pollSpin = q("poll-spin");
  const pollErr = q("poll-err");
  const pushChip = q("push-chip");
  const pushStatus = q("push-status");

  let lastT = 0;

  // Manual-refresh state: real and reader-driven, deliberately outside the
  // scripted loop — the staleness counter grows in real elapsed time and
  // never resets on a cycle boundary.
  let refreshedAt = Date.now();
  let refreshFailed = false;

  const fmtAge = (s) => {
    if (s < 60) return Math.floor(s) + " s ago";
    if (s < 3600) return Math.floor(s / 60) + " min ago";
    return Math.floor(s / 3600) + " h ago";
  };

  const doRefresh = () => {
    const t = ((Date.now() - epoch) / 1000) % PERIOD;
    refreshedAt = Date.now();
    if (pollSpin && !reduced.matches) {
      pollSpin.classList.remove("ld-spinning");
      void pollSpin.offsetWidth;
      pollSpin.classList.add("ld-spinning");
    }
    if (inOutage(t)) {
      // The reader's click landed in the outage window: they get the 503.
      refreshFailed = true;
      for (const k in pollCells) setCell(pollCells[k], "—", false);
      if (pollErr) pollErr.hidden = false;
    } else {
      refreshFailed = false;
      const snap = truthAt(t);
      for (const k in pollCells) setCell(pollCells[k], snap[k], true);
      if (pollErr) pollErr.hidden = true;
    }
  };
  const pollBtn = q("poll-btn");
  if (pollBtn) pollBtn.addEventListener("click", doRefresh);

  const renderFeed = (total) => {
    const t = total % PERIOD;
    const flash = t >= lastT; // suppress flashes on loop wrap / resync

    // ── refresh-based panel: values persist from the reader's last
    //    click; only the staleness counter moves on its own ────────
    if (pollStatus) pollStatus.textContent =
      (refreshFailed ? "failed " : "refreshed ") +
      fmtAge((Date.now() - refreshedAt) / 1000);

    // ── live panel ──────────────────────────────────────────────
    const view = pushViewAt(t);
    for (const k in pushCells) setCell(pushCells[k], view[k], flash);
    const reconnecting = t >= OUTAGE_START + 0.8 && t < OUTAGE_END;
    if (pushChip) pushChip.dataset.state = reconnecting ? "reconnecting" : "live";
    if (pushStatus) pushStatus.textContent =
      reconnecting ? "reconnecting · last known kept" : "live · under a second behind";

    lastT = t;
  };

  /* ════ Demo 2: two devices, one order ══════════════════════════ */

  const P2 = 12;              // s — one order per cycle
  const MSG = "Leave with the neighbour at flat 12 if nobody answers the door.";
  const TYPE_START = 0.6;     // s — typing begins
  const CPS = 11;             // chars per second
  const TAP_AT = 5.0;         // s — phone button presses itself
  const TAP_LEN = 0.35;       // s — visible press state
  const POST_AT = 5.4;        // s — "POST … 200" confirmation appears
  const POST_END = 8.5;       // s — confirmation clears
  const SHIP_MOBILE = 5.5;    // s — phone shows shipped
  const SHIP_DESKTOP = 5.8;   // s — push lands on the desktop form

  const q2 = (name) => (devices ? devices.querySelector("[data-ld2='" + name + "']") : null);
  const dOrder = q2("d-order");
  const dPill = q2("d-pill");
  const dStatus = q2("d-status");
  const dDetails = q2("d-details");
  const dHeld = q2("d-held");
  const mOrder = q2("m-order");
  const mStatus = q2("m-status");
  const mBtn = q2("m-btn");
  const mPost = q2("m-post");

  let lastCycle = 0;

  const renderDevices = (total) => {
    const t2 = total % P2;
    const cycle = Math.floor(total / P2);
    const flash2 = cycle === lastCycle; // no flashes across a cycle reset

    const idNum = 4127 + (cycle % 8);
    const id = "#" + idNum;
    setCell(dOrder, id, false);
    setCell(mOrder, id, false);

    // Slow typing in the details field — never interrupted by the push.
    const chars = reduced.matches
      ? MSG.length
      : Math.max(0, Math.min(MSG.length, Math.floor((t2 - TYPE_START) * CPS)));
    const typed = MSG.slice(0, chars);
    if (dDetails && dDetails.textContent !== typed) dDetails.textContent = typed;
    if (dHeld) dHeld.hidden = chars === 0;

    // The phone acts; the desktop hears about it within a second.
    const shippedM = t2 >= SHIP_MOBILE;
    const shippedD = t2 >= SHIP_DESKTOP;
    if (mBtn) {
      mBtn.classList.toggle("ld-pressed", t2 >= TAP_AT && t2 < TAP_AT + TAP_LEN);
      mBtn.dataset.state = shippedM ? "shipped" : "pending";
      const label = shippedM ? "Shipped ✓" : "Mark as shipped";
      if (mBtn.textContent !== label) mBtn.textContent = label;
    }
    if (mStatus) mStatus.dataset.state = shippedM ? "shipped" : "pending";
    setCell(mStatus, shippedM ? "shipped" : "pending", false);
    if (mPost) {
      mPost.hidden = !(t2 >= POST_AT && t2 < POST_END);
      const post = "POST /orders/" + idNum + "/ship · 200";
      if (mPost.textContent !== post) mPost.textContent = post;
    }
    if (dPill) dPill.dataset.state = shippedD ? "shipped" : "pending";
    setCell(dStatus, shippedD ? "shipped" : "pending", flash2);

    lastCycle = cycle;
  };

  /* ════ Shared clock ════════════════════════════════════════════ */

  const epoch = Date.now();
  const render = () => {
    const total = (Date.now() - epoch) / 1000;
    if (root) renderFeed(total);
    if (devices) renderDevices(total);
  };

  render();
  setInterval(render, 150);
})();
