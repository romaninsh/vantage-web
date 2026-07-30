/* /solutions/live-data/ — scripted feed demo.
   One 24-second loop drives two panels: a refresh-based dashboard that
   polls every 6 s, and a live panel that receives pushes ~0.4 s after
   each change. Midway through the loop the "backend" throws 503s.
   Everything renders as a pure function of wall-clock phase, so the
   demo is deterministic, survives tab throttling, and loops cleanly.
   Plain JS, no dependencies. */
(() => {
  "use strict";

  const root = document.getElementById("ld-demo");
  if (!root) return;

  const PERIOD = 24;          // s — full loop
  const PUSH_DELAY = 0.4;     // s — source → live panel
  const POLL_EVERY = 6;       // s — refresh-based panel
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

  // Upstream nudges for the edit vignette: untouched fields keep tracking
  // while the draft field holds.
  const TRACK_BASE = { "track-items": "17", "track-assignee": "m.reyes" };
  const TRACK = [
    { t: 4.0,  row: "track-items",    v: "18" },
    { t: 10.0, row: "track-assignee", v: "d.okafor" },
    { t: 15.0, row: "track-items",    v: "21" },
    { t: 22.0, row: "track-assignee", v: "m.reyes" },
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
  const trackViewAt = (t) => {
    const s = Object.assign({}, TRACK_BASE);
    for (const e of TRACK) if (e.t + PUSH_DELAY <= t) s[e.row] = e.v;
    return s;
  };

  const collect = (scope, sel) => {
    const m = {};
    scope.querySelectorAll(sel + " [data-row]").forEach((el) => { m[el.dataset.row] = el; });
    return m;
  };
  const pollCells = collect(root, "[data-panel='poll']");
  const pushCells = collect(root, "[data-panel='push']");
  const trackCells = {};
  document.querySelectorAll(".ld-edit [data-row]").forEach((el) => { trackCells[el.dataset.row] = el; });

  const pollStatus = root.querySelector("[data-ld='poll-status']");
  const pollSpin = root.querySelector("[data-ld='poll-spin']");
  const pollErr = root.querySelector("[data-ld='poll-err']");
  const pushChip = root.querySelector("[data-ld='push-chip']");
  const pushStatus = root.querySelector("[data-ld='push-status']");

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

  const epoch = Date.now();
  let lastT = 0;

  const render = () => {
    const t = ((Date.now() - epoch) / 1000) % PERIOD;
    const flash = t >= lastT; // suppress flashes on loop wrap / resync

    // ── refresh-based panel ─────────────────────────────────────────
    const lastPoll = Math.floor(t / POLL_EVERY) * POLL_EVERY;
    if (inOutage(lastPoll)) {
      for (const k in pollCells) setCell(pollCells[k], "—", false);
      if (pollErr) pollErr.hidden = false;
      if (pollStatus) pollStatus.textContent =
        "failed · retry in " + Math.ceil(lastPoll + POLL_EVERY - t) + " s";
    } else {
      const snap = truthAt(lastPoll);
      for (const k in pollCells) setCell(pollCells[k], snap[k], flash);
      if (pollErr) pollErr.hidden = true;
      if (pollStatus) pollStatus.textContent =
        "refreshed " + Math.floor(t - lastPoll) + " s ago";
    }
    if (flash && pollSpin && !reduced.matches &&
        Math.floor(t / POLL_EVERY) !== Math.floor(lastT / POLL_EVERY)) {
      pollSpin.classList.remove("ld-spinning");
      void pollSpin.offsetWidth;
      pollSpin.classList.add("ld-spinning");
    }

    // ── live panel ──────────────────────────────────────────────────
    const view = pushViewAt(t);
    for (const k in pushCells) setCell(pushCells[k], view[k], flash);
    const reconnecting = t >= OUTAGE_START + 0.8 && t < OUTAGE_END;
    if (pushChip) pushChip.dataset.state = reconnecting ? "reconnecting" : "live";
    if (pushStatus) pushStatus.textContent =
      reconnecting ? "reconnecting · last known kept" : "live · under a second behind";

    // ── edit vignette ───────────────────────────────────────────────
    const tv = trackViewAt(t);
    for (const k in trackCells) setCell(trackCells[k], tv[k], flash);

    lastT = t;
  };

  render();
  setInterval(render, 150);
})();
