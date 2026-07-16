/* Framework 3 — "cut the stack open"
 *
 * A real-perspective WebGL cube of six slabs. Scrolling between snap
 * sections triggers autonomous transitions (never scrubbed): the top slab
 * flares at the seam, lifts, tilts and flies off camera while the camera
 * dives toward the newly exposed layer. Scrolling up flies it back on.
 *
 * Each layer is a module with alternatives: arrows / swipe / ←→ physically
 * swap the slab (the default works out of the box; alternatives carry a
 * Rust badge because they're hand-coded).
 */

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

(() => {
  "use strict";

  const canvas = document.getElementById("fw3-canvas");
  const sections = Array.from(document.querySelectorAll("[data-fw3]"));
  if (!canvas || !sections.length) return;

  /* ── Small helpers ─────────────────────────────────────── */

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const smoothstep = (a, b, x) => {
    const t = clamp((x - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // Deterministic per-slab randomness so surface details don't reshuffle.
  const mulberry = (seed) => () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  // Autonomous, retargetable tween. Retargeting mid-flight starts from the
  // current value — rapid multi-section scrolls stay fluid, nothing queues.
  class Tween {
    constructor(v) { this.v = v; this.from = v; this.to = v; this.t0 = 0; this.dur = 1; }
    retarget(to, dur, delay = 0) {
      if (this.to === to) return;
      this.from = this.v; this.to = to;
      this.t0 = performance.now() + delay; this.dur = dur;
    }
    update(now) {
      if (this.v === this.to) return this.v;
      const k = clamp((now - this.t0) / this.dur, 0, 1);
      this.v = this.from + (this.to - this.from) * easeInOutCubic(k);
      if (k >= 1) this.v = this.to;
      return this.v;
    }
  }

  /* ── SVG artwork projected on the slab tops ────────────── */

  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const MONO = "ui-monospace,Menlo,monospace";
  const rcSvg = (x, y, w, h, rx, extra = "") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" ${extra}/>`;
  const txSvg = (hue, x, y, size, s, op = 1, extra = "") =>
    `<text x="${x}" y="${y}" font-family="${MONO}" font-size="${size}" fill="${hue}" stroke="none" opacity="${op}" ${extra}>${esc(s)}</text>`;
  const ctSvg = (hue, x, y, size, s, op = 1) =>
    txSvg(hue, x, y, size, s, op, 'text-anchor="middle" font-weight="600"');
  const gearSvg = (cx, cy, r, teeth, inner = true) => {
    let t = "";
    for (let i = 0; i < teeth; i++) {
      const a = (i / teeth) * Math.PI * 2;
      t += `<line x1="${(cx + Math.cos(a) * r).toFixed(1)}" y1="${(cy + Math.sin(a) * r).toFixed(1)}"
        x2="${(cx + Math.cos(a) * (r + r * 0.16)).toFixed(1)}" y2="${(cy + Math.sin(a) * (r + r * 0.16)).toFixed(1)}"
        stroke-width="${(r * 0.13).toFixed(0)}"/>`;
    }
    return `<circle cx="${cx}" cy="${cy}" r="${r}"/>${t}` +
      (inner ? `<circle cx="${cx}" cy="${cy}" r="${(r * 0.4).toFixed(0)}"/>` : "");
  };
  const svgDoc = (hue, inner) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 840" fill="none" stroke="${hue}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">${inner}</svg>`;
  const codeWindow = (hue, title, lines, extra = "") => {
    let body = "";
    lines.forEach((l, i) => {
      body += txSvg(hue, 84, 212 + i * 54, 24, String(i + 1).padStart(2, " "), 0.35);
      body += txSvg(hue, 148, 212 + i * 54, 30, l, 0.9);
    });
    return svgDoc(hue,
      `<circle cx="92" cy="84" r="10"/>` +
      txSvg(hue, 128, 94, 28, title, 0.6) +
      `<line x1="60" y1="128" x2="780" y2="128" opacity=".5"/>` +
      body +
      extra
    );
  };

  /* Layer 00 · Presentation */
  const uiBlueprintSvg = (hue) => {
    let rows = "";
    for (let i = 0; i < 6; i++) rows += rcSvg(280, 224 + i * 62, 500, 42, 10);
    let menu = "";
    for (let i = 0; i < 5; i++) menu += rcSvg(48, 144 + i * 60, 152, 38, 10);
    return svgDoc(hue,
      rcSvg(20, 20, 800, 800, 28) +
      `<line x1="20" y1="100" x2="820" y2="100"/>` +
      `<g stroke-width="5">
        <circle cx="66" cy="60" r="11" stroke="#ff5f57" fill="#ff5f57" fill-opacity=".30"/>
        <circle cx="108" cy="60" r="11" stroke="#febc2e" fill="#febc2e" fill-opacity=".30"/>
        <circle cx="150" cy="60" r="11" stroke="#28c840" fill="#28c840" fill-opacity=".30"/>
      </g>` +
      rcSvg(560, 40, 224, 42, 21) +
      `<line x1="240" y1="100" x2="240" y2="820"/>` +
      menu +
      rcSvg(280, 144, 500, 52, 12) +
      rows +
      `<rect x="600" y="724" width="82" height="46" rx="12" fill="${hue}" fill-opacity=".28"/>` +
      `<rect x="700" y="724" width="82" height="46" rx="12" fill="${hue}" fill-opacity=".10"/>` +
      `<line x1="280" y1="640" x2="780" y2="640"/>`
    );
  };
  const adaptersSvg = (hue) => codeWindow(hue, "main.rs", [
    'let app = Vantage::load("bakery")?;',
    "",
    "ui_adapters::embed(&mut shell, &app);",
    "",
    "api_adapters::rest(&app)",
    "    .with_streaming()",
    '    .serve("0.0.0.0:8080")?;',
  ]);
  const reactSvg = (hue) => svgDoc(hue,
    rcSvg(40, 40, 760, 320, 24) +
    `<line x1="40" y1="122" x2="800" y2="122"/>` +
    `<circle cx="88" cy="80" r="10"/><circle cx="126" cy="80" r="10"/>` +
    rcSvg(300, 58, 460, 44, 22) + txSvg(hue, 330, 88, 26, "app.yourco.com", 0.55) +
    txSvg(hue, 90, 210, 34, "<OrdersTable rows={live} />", 0.9) +
    txSvg(hue, 90, 300, 28, 'const live = useVantage("orders")', 0.55) +
    `<line x1="420" y1="360" x2="420" y2="428" stroke-dasharray="12 12"/>` +
    txSvg(hue, 110, 490, 30, "GET  /api/orders?page=2", 0.9) +
    txSvg(hue, 110, 546, 30, "WS   /live/orders", 0.9) +
    rcSvg(80, 440, 680, 140, 20, 'opacity=".6"')
  );
  // Dashboard mock: line chart, bars, donut and a KPI tile — the custom
  // widgets we build into a dedicated Vantage UI.
  const customUiSvg = (hue) => {
    let bars = "";
    for (let i = 0; i < 5; i++) {
      const h = [70, 130, 95, 170, 120][i];
      bars += `<rect x="${492 + i * 52}" y="${356 - h}" width="34" height="${h}" rx="6" fill="${hue}" fill-opacity=".22"/>`;
    }
    const spark = "M366 636 l40 -20 l40 8 l40 -26 l40 10 l40 -18 l40 4 l40 -14";
    return svgDoc(hue,
      rcSvg(20, 20, 800, 800, 28) +
      `<line x1="20" y1="100" x2="820" y2="100"/>` +
      `<g stroke-width="5">
        <circle cx="66" cy="60" r="11" stroke="#ff5f57" fill="#ff5f57" fill-opacity=".30"/>
        <circle cx="108" cy="60" r="11" stroke="#febc2e" fill="#febc2e" fill-opacity=".30"/>
        <circle cx="150" cy="60" r="11" stroke="#28c840" fill="#28c840" fill-opacity=".30"/>
      </g>` +
      // line chart card
      rcSvg(48, 132, 380, 256, 16) +
      `<polyline points="84,340 148,268 212,296 276,212 340,244 396,176" stroke-width="7"/>` +
      `<line x1="84" y1="352" x2="396" y2="352" opacity=".35"/>` +
      // bar chart card
      rcSvg(456, 132, 336, 256, 16) +
      bars + `<line x1="484" y1="356" x2="764" y2="356" opacity=".35"/>` +
      // donut card
      rcSvg(48, 416, 250, 250, 16) +
      `<circle cx="173" cy="541" r="72" stroke-width="26" opacity=".25"/>` +
      `<path d="M173 469 a72 72 0 0 1 68 94" stroke-width="26"/>` +
      // KPI tile card
      rcSvg(326, 416, 466, 250, 16) +
      txSvg(hue, 366, 520, 76, "42.7k", 0.95, 'font-weight="700"') +
      txSvg(hue, 366, 570, 28, "orders this month", 0.5) +
      `<path d="${spark}" stroke-width="6" opacity=".7"/>`
    );
  };

  /* Layer 01 · Scenery — real meshed-cogs silhouette, recoloured to the hue. */
  const lensCogsSvg = (hue) =>
    fetch("/images/fw3-cogs.svg")
      .then((r) => r.text())
      .then((txt) => {
        const inner = txt
          .slice(txt.indexOf(">", txt.indexOf("<svg")) + 1, txt.lastIndexOf("</svg>"))
          .replace(/<metadata>[\s\S]*?<\/metadata>/, "")
          .replace('fill="#000000"', `fill="${hue}"`);
        // Source viewBox is 1280×870 — fit it into our 840 square.
        return svgDoc(hue,
          `<g transform="translate(0 88) scale(0.65625)" opacity=".85" stroke="none">${inner}</g>`
        );
      })
      .catch(() => svgDoc(hue,
        `<g stroke-width="7">${gearSvg(340, 400, 165, 12)}${gearSvg(618, 262, 100, 9)}</g>` +
        ctSvg(hue, 420, 680, 44, "ON-DEVICE LENS", 0.85)
      ));
  const lensApiSvg = (hue) => codeWindow(hue, "lens_api.rs", [
    "impl LensTransport for MyApi {",
    "    async fn window(&self, w: Win)",
    "        -> Rows {",
    "        self.fetch(w).await",
    "    }",
    "}",
    "",
    "Lens::via(MyApi::new())",
    "    .pre_warm(true);",
  ]);
  const lensWsSvg = (hue) => codeWindow(hue, "lens_ws.rs", [
    "let lens = Lens::websocket(url)",
    "    .reconnect(Backoff::auto());",
    "",
    "scenery.diff_stream()",
    "    .forward(ws_clients)",
    "    .await?;",
  ]);

  /* Layer 02 · Diorama */
  const dioramaSvg = (hue) => {
    let pins = "";
    for (let i = 0; i < 7; i++) {
      const x = 140 + i * 32;
      pins += `<line x1="${x}" y1="230" x2="${x}" y2="266"/><line x1="${x}" y1="434" x2="${x}" y2="470"/>`;
    }
    return svgDoc(hue,
      rcSvg(110, 266, 250, 168, 16) + pins +
      ctSvg(hue, 235, 362, 40, "MEM") +
      `<line x1="392" y1="350" x2="460" y2="350"/>` +
      `<path d="M470 350 l-18 -11 v22 z" fill="${hue}" stroke="none"/>` +
      `<line x1="470" y1="380" x2="538" y2="380"/>` +
      `<path d="M460 380 l18 -11 v22 z" fill="${hue}" stroke="none"/>` +
      `<ellipse cx="620" cy="266" rx="118" ry="38"/>` +
      `<line x1="502" y1="266" x2="502" y2="452"/>` +
      `<line x1="738" y1="266" x2="738" y2="452"/>` +
      `<path d="M502 452 a118 38 0 0 0 236 0"/>` +
      ctSvg(hue, 620, 372, 40, "DISK")
    );
  };
  const dioramaExtSvg = (hue) => svgDoc(hue,
    `<ellipse cx="210" cy="300" rx="90" ry="30"/>` +
    `<line x1="120" y1="300" x2="120" y2="440"/>` +
    `<line x1="300" y1="300" x2="300" y2="440"/>` +
    `<path d="M120 440 a90 30 0 0 0 180 0"/>` +
    ctSvg(hue, 210, 400, 30, "LOCAL") +
    `<line x1="320" y1="370" x2="450" y2="370" stroke-dasharray="14 14"/>` +
    rcSvg(460, 250, 310, 240, 20) +
    ctSvg(hue, 615, 350, 36, "EXTERNAL") +
    ctSvg(hue, 615, 400, 36, "CACHE") +
    txSvg(hue, 500, 452, 24, "shared · persistent", 0.55)
  );

  /* Layer 03 · Vista */
  const vistaHubSvg = (hue) => {
    const names = ["PG", "MYSQL", "SQLITE", "SURREAL", "MONGO", "REST", "GQL", "CSV"];
    let sat = "";
    names.forEach((n, i) => {
      const a = (i / names.length) * Math.PI * 2 - Math.PI / 2;
      const x = 420 + Math.cos(a) * 272, y = 400 + Math.sin(a) * 258;
      sat += `<line x1="${(420 + Math.cos(a) * 96).toFixed(0)}" y1="${(400 + Math.sin(a) * 92).toFixed(0)}"
        x2="${(x - Math.cos(a) * 68).toFixed(0)}" y2="${(y - Math.sin(a) * 30).toFixed(0)}" opacity=".55"/>`;
      sat += rcSvg(x - 66, y - 27, 132, 54, 27, 'stroke-width="5"');
      sat += ctSvg(hue, x, y + 9, 26, n, 0.9);
    });
    return svgDoc(hue,
      `<circle cx="420" cy="400" r="92" stroke-width="7"/>` +
      ctSvg(hue, 420, 412, 38, "VISTA") + sat
    );
  };
  const vistaCustomSvg = (hue) => codeWindow(hue, "my_store.rs", [
    "impl DataSource for MyStore {",
    "    fn select(&self) -> Query;",
    "    fn insert(&self, r: Rows);",
    "    fn capabilities(&self)",
    "        -> Caps;",
    "}",
  ]);

  /* Layer 04 · Entity Tables */
  const entityYamlSvg = (hue) => codeWindow(hue, "client.yaml", [
    "entity: client",
    "columns:",
    "  - name:  { type: string }",
    "  - email: { unique: true }",
    "relations:",
    "  orders: has_many",
  ], `<path d="M722 76 l12 28 28 12 -28 12 -12 28 -12 -28 -28 -12 28 -12 z" opacity=".9"/>`);
  const entityRustSvg = (hue) => codeWindow(hue, "client.rs", [
    "#[entity(PostgresType)]",
    "struct Client {",
    "    name:   String,",
    "    email:  Email,",
    "    orders: Rel<Order>,",
    "}",
  ]);

  /* Layer 05 · Query Builder */
  const queryRhaiSvg = (hue) => {
    const blocks = ["SELECT", "JOIN", "GROUP", "ORDER"];
    let out = "";
    blocks.forEach((b, i) => {
      const x = 62 + i * 190;
      out += rcSvg(x, 330, 158, 84, 16, 'stroke-width="6"');
      out += ctSvg(hue, x + 79, 382, 28, b, 0.9);
      if (i < 3) out += `<path d="M${x + 168} 372 l24 0 m0 0 l-14 -9 v18 z" fill="${hue}"/>`;
    });
    return svgDoc(hue,
      out +
      txSvg(hue, 96, 510, 28, "select().from(o).inner_join(c)", 0.55) +
      txSvg(hue, 96, 560, 28, "    .group_by(id).render()", 0.55)
    );
  };
  const queryRustSvg = (hue) => codeWindow(hue, "revenue.rs", [
    "fn revenue(q: &Query) -> Expr {",
    '    sum(q["qty"] * q["price"])',
    "}",
    "",
    'db.call("sp_close_month", args)',
    "    .await?;",
  ]);

  /* ── Layer + variant catalogue ─────────────────────────── */

  const LAYERS = [
    { hue: "#818cf8", variants: [
      { label: "VANTAGE UI", svg: uiBlueprintSvg },
      { label: "CUSTOM UI", svg: customUiSvg, rust: true, status: "Custom build" },
      { label: "ADAPTERS", svg: adaptersSvg, rust: true },
      { label: "REACT + API", svg: reactSvg, rust: true },
    ]},
    { hue: "#22d3ee", variants: [
      { label: "SCENERY", svg: lensCogsSvg },
      { label: "LENS · API", svg: lensApiSvg, rust: true },
      { label: "LENS · WS", svg: lensWsSvg, rust: true },
    ]},
    { hue: "#34d399", variants: [
      { label: "DIORAMA", svg: dioramaSvg },
      { label: "DIORAMA · EXT", svg: dioramaExtSvg, rust: true },
    ]},
    { hue: "#a78bfa", variants: [
      { label: "VISTA", svg: vistaHubSvg },
      { label: "CUSTOM SOURCE", svg: vistaCustomSvg, rust: true },
    ]},
    { hue: "#fbbf24", variants: [
      { label: "ENTITY TABLES", svg: entityYamlSvg },
      { label: "CUSTOM ENTITIES", svg: entityRustSvg, rust: true },
    ]},
    { hue: "#fb7185", variants: [
      { label: "QUERY BUILDER", svg: queryRhaiSvg },
      { label: "CUSTOM QUERIES", svg: queryRustSvg, rust: true },
    ]},
  ];
  const N = LAYERS.length;

  /* ── DOM variant control (works with or without WebGL) ─── */

  // The 3D scene plugs in here once it's alive.
  let onVariantSwap = null;
  let activeKey = "hero";

  const layerSections = sections.filter((s) => /^\d+$/.test(s.dataset.fw3));
  const varIndex = LAYERS.map(() => 0);

  const applyVariantDom = (i, vi) => {
    const sec = layerSections[i];
    if (!sec) return;
    sec.querySelectorAll(".fw3-var").forEach((el, k) => el.classList.toggle("on", k === vi));
    sec.querySelectorAll(".fw3-vardots i").forEach((el, k) => el.classList.toggle("on", k === vi));
  };

  /* URL hash carries the whole state: depth marker + non-default variants.
   * e.g. #d3-0b1c  →  viewing layer 3, layer 0 on variant b, layer 1 on c. */
  const updateHash = () => {
    const v = varIndex.map((vi, i) => (vi > 0 ? i + "abcdef"[vi] : "")).join("");
    let pos = "";
    if (/^\d+$/.test(activeKey)) pos = "d" + activeKey;
    else if (activeKey === "outro") pos = "cta";
    const h = [pos, v].filter(Boolean).join("-");
    history.replaceState(null, "", h ? "#" + h : location.pathname + location.search);
  };

  /* The outro summary: one table row per layer with the chosen component. */
  const LAYER_NAMES = ["Presentation", "Scenery", "Diorama", "Vista", "Entity Tables", "Query Builder"];
  const variantName = (i, vi) =>
    layerSections[i]?.querySelectorAll(".fw3-var h2")[vi]?.textContent || "";

  const renderConfig = () => {
    const box = document.getElementById("fw3-config");
    if (!box) return;
    box.replaceChildren(...varIndex.map((vi, i) => {
      const rust = LAYERS[i].variants[vi].rust;
      const tr = document.createElement("tr");
      [["num", "0" + i], ["layer", LAYER_NAMES[i]], ["comp", variantName(i, vi)]]
        .forEach(([cls, text]) => {
          const td = document.createElement("td");
          td.className = cls; td.textContent = text;
          tr.append(td);
        });
      const td = document.createElement("td");
      const st = document.createElement("span");
      st.className = "fw3-status" + (rust ? " rust" : "");
      st.textContent = LAYERS[i].variants[vi].status || (rust ? "Requires coding" : "Standard");
      td.append(st); tr.append(td);
      return tr;
    }));
    const lead = document.getElementById("fw3-cta-lead");
    if (lead) {
      lead.textContent = varIndex.some((vi, i) => LAYERS[i].variants[vi].rust)
        ? "You have selected custom components — our team would be happy to assemble this stack for your organisation:"
        : "This is your stack — every layer built into Vantage UI. Swap any layer above, or let us shape one around your systems:";
    }
  };

  /* Get-in-touch form: submits the lead straight into SurrealDB via the
     public insert-only record access (no secret in the page, no relay API);
     falls back to a mailto if the request fails. */
  const LEADS = {
    endpoint: "https://close-wasp-06fmkfm5uhq2f77ih987dcdac4.aws-euw1.surreal.cloud/signup",
    ns: "main", db: "vantage-leads", ac: "submit",
  };
  const form = document.getElementById("fw3-form");
  if (form) form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = new FormData(form);
    const stack = varIndex
      .map((vi, i) => `0${i} ${LAYER_NAMES[i]}: ${variantName(i, vi)}`)
      .join("\n");
    const lead = {
      organisation: f.get("org"),
      email: f.get("email"),
      phone: f.get("phone") || "",
      notes: f.get("notes") || "",
      stack,
      config_url: location.href,
    };

    const mailtoFallback = () => {
      const body =
        `Organisation: ${lead.organisation}\nEmail: ${lead.email}\nPhone: ${lead.phone || "-"}\n\n` +
        `Selected stack:\n${stack}\n\nConfiguration link: ${lead.config_url}\n\n` +
        `Notes:\n${lead.notes || "-"}`;
      location.href = "mailto:hello@vantage-ui.com" +
        `?subject=${encodeURIComponent("Custom stack request — " + lead.organisation)}` +
        `&body=${encodeURIComponent(body)}`;
    };

    const btn = form.querySelector("button[type=submit]");
    if (btn) btn.disabled = true;
    try {
      const res = await fetch(LEADS.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ns: LEADS.ns, db: LEADS.db, ac: LEADS.ac, ...lead }),
      });
      const data = res.ok ? await res.json().catch(() => ({})) : {};
      if (!res.ok || !data.token) throw new Error(`lead signup failed (${res.status})`);
      const thanks = document.createElement("p");
      thanks.className = "mx-auto max-w-xl text-text-2";
      thanks.textContent =
        "Thank you — we'll be in touch. Our team has your configuration and will reach out shortly.";
      form.replaceChildren(thanks);
    } catch (err) {
      if (btn) btn.disabled = false;
      mailtoFallback();
    }
  });

  const stepVariant = (i, d) => {
    const n = LAYERS[i].variants.length;
    if (n < 2) return;
    const vi = (varIndex[i] + d + n) % n;
    varIndex[i] = vi;
    applyVariantDom(i, vi);
    renderConfig();
    updateHash();
    if (onVariantSwap) onVariantSwap(i, vi, d);
  };

  /* Restore state from the hash on arrival. */
  let initialDepth = null;
  {
    const h = location.hash.slice(1);
    if (h) {
      const dm = h.match(/(?:^|-)d(\d)/);
      if (dm && layerSections[+dm[1]]) initialDepth = +dm[1];
      if (/(?:^|-)cta/.test(h)) initialDepth = "cta";
      for (const [, li, lv] of h.matchAll(/(\d)([a-f])/g)) {
        const i = +li, vi = "abcdef".indexOf(lv);
        if (LAYERS[i] && vi < LAYERS[i].variants.length) {
          varIndex[i] = vi;
          applyVariantDom(i, vi);
        }
      }
    }
  }
  const scrollToInitial = () => {
    if (initialDepth === null) return;
    const el = initialDepth === "cta"
      ? document.getElementById("fw3-cta")
      : layerSections[initialDepth];
    el?.scrollIntoView({ behavior: "instant", block: "start" });
  };
  renderConfig();

  layerSections.forEach((sec, i) => {
    sec.querySelectorAll(".fw3-arrow").forEach((btn) => {
      btn.addEventListener("click", () => stepVariant(i, +btn.dataset.dir));
    });
    // Horizontal swipe swaps the module; vertical swipes keep scrolling.
    let x0 = 0, y0 = 0;
    sec.addEventListener("touchstart", (e) => {
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
    }, { passive: true });
    sec.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - x0;
      const dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 56 && Math.abs(dx) > 1.6 * Math.abs(dy)) {
        stepVariant(i, dx < 0 ? 1 : -1);
      }
    }, { passive: true });
  });

  /* ── Mode gate ─────────────────────────────────────────── */

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const flatMode = () => {
    document.body.classList.add("fw3-flat");
    sections.forEach((s) => s.classList.add("fw3-on"));
    scrollToInitial();
  };
  if (reduced) return flatMode();

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (e) {
    return flatMode();
  }

  /* ── Dimensions ────────────────────────────────────────── */

  const W = 2.6, D = 2.6, H = 0.34, GAP = 0.05;
  const STACK_H = N * H + (N - 1) * GAP;
  const TOP_Y = STACK_H / 2;
  const slabTopY = (i) => TOP_Y - i * (H + GAP);
  const slabCenterY = (i) => slabTopY(i) - H / 2;
  const FLOOR_Y = -STACK_H / 2 - 0.55;
  const BG = "#0b0b10";

  /* ── Procedural textures ───────────────────────────────── */

  const makeCanvas = (w, h) => {
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    return [c, c.getContext("2d")];
  };
  const tex = (c) => {
    const t = new THREE.CanvasTexture(c);
    t.anisotropy = 4;
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };

  // Top face: brushed panels, rivets, engraved frame — plus the projected
  // SVG artwork (async: textures refresh when it rasterises).
  const makeTopTextures = (hue, seed, svg) => {
    const rnd = mulberry(seed);
    const S = 1024;
    const [ac, a] = makeCanvas(S, S);   // albedo
    const [ec, e] = makeCanvas(S, S);   // emissive

    a.fillStyle = "#15161e"; a.fillRect(0, 0, S, S);
    e.fillStyle = "#000"; e.fillRect(0, 0, S, S);

    // Panel plates
    for (let i = 0; i < 26; i++) {
      const x = rnd() * S, y = rnd() * S, w = 60 + rnd() * 260, h = 60 + rnd() * 260;
      a.fillStyle = rnd() < 0.5 ? "#171820" : "#12131a";
      a.fillRect(x, y, w, h);
      a.strokeStyle = "rgba(255,255,255,.055)"; a.lineWidth = 1.5;
      a.strokeRect(x, y, w, h);
      a.fillStyle = "rgba(255,255,255,.10)";
      [[x + 8, y + 8], [x + w - 8, y + 8], [x + 8, y + h - 8], [x + w - 8, y + h - 8]]
        .forEach(([px, py]) => { a.beginPath(); a.arc(px, py, 2.4, 0, Math.PI * 2); a.fill(); });
    }

    // Engraved border frame (albedo + soft emissive echo)
    a.strokeStyle = "rgba(255,255,255,.09)"; a.lineWidth = 3;
    a.strokeRect(36, 36, S - 72, S - 72);
    e.strokeStyle = hue; e.globalAlpha = 0.5; e.lineWidth = 3;
    e.strokeRect(36, 36, S - 72, S - 72);
    e.globalAlpha = 1;

    const map = tex(ac), emissiveMap = tex(ec);

    // Project the artwork: etched into the metal, glowing in its own colours.
    // Accepts a string or a Promise of one (fetched/composed art).
    if (svg) {
      Promise.resolve(svg).then((str) => {
        const img = new Image();
        const url = URL.createObjectURL(new Blob([str], { type: "image/svg+xml" }));
        img.onload = () => {
          const m = 92, size = S - m * 2;
          a.globalAlpha = 0.2; a.drawImage(img, m, m, size, size); a.globalAlpha = 1;
          e.globalAlpha = 0.95; e.drawImage(img, m, m, size, size); e.globalAlpha = 1;
          map.needsUpdate = true; emissiveMap.needsUpdate = true;
          URL.revokeObjectURL(url);
        };
        img.src = url;
      });
    }

    return { map, emissiveMap };
  };

  // Side face: glowing intake strips, hazard chevrons and the etched name.
  const makeSideTextures = (hue, label, idx, seed) => {
    const rnd = mulberry(seed);
    // Face is ~7.6:1 (W×H) — match the texture aspect so nothing stretches.
    const SW = 1024, SH = 136;
    const [ac, a] = makeCanvas(SW, SH);
    const [ec, e] = makeCanvas(SW, SH);

    a.fillStyle = "#12131a"; a.fillRect(0, 0, SW, SH);
    e.fillStyle = "#000"; e.fillRect(0, 0, SW, SH);

    // Glowing intake strips (left block)
    for (let i = 0; i < 7; i++) {
      const x = 40 + i * 22;
      a.fillStyle = "rgba(255,255,255,.06)";
      a.fillRect(x, 34, 3, SH - 68);
      e.fillStyle = hue; e.globalAlpha = 0.25 + 0.4 * rnd();
      e.fillRect(x, 34, 3, SH - 68);
      e.globalAlpha = 1;
    }

    // Hazard chevrons (right block)
    for (let i = 0; i < 6; i++) {
      const x = SW - 190 + i * 26;
      a.strokeStyle = i % 2 ? "rgba(255,255,255,.10)" : "rgba(255,255,255,.04)";
      a.lineWidth = 8;
      a.beginPath(); a.moveTo(x, SH - 24); a.lineTo(x + 20, 24); a.stroke();
    }

    // Layer index + name — etched on albedo, glowing on emissive.
    const text = `0${idx} · ${label}`;
    const font = `600 52px 'JetBrains Mono', ${MONO}`;
    a.font = font; e.font = font;
    a.textBaseline = "middle"; e.textBaseline = "middle";
    a.fillStyle = "rgba(0,0,0,.55)"; a.fillText(text, 226, SH / 2 + 3);
    a.fillStyle = "rgba(255,255,255,.28)"; a.fillText(text, 226, SH / 2);
    e.fillStyle = hue; e.globalAlpha = 0.9; e.fillText(text, 226, SH / 2);
    e.globalAlpha = 1;

    return { map: tex(ac), emissiveMap: tex(ec) };
  };

  // Soft round ground shadow.
  const makeShadowTexture = () => {
    const [c, g] = makeCanvas(256, 256);
    const grad = g.createRadialGradient(128, 128, 10, 128, 128, 128);
    grad.addColorStop(0, "rgba(0,0,0,.85)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad; g.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  };

  /* ── Scene ─────────────────────────────────────────────── */

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(new THREE.Color(BG), 12, 26);

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
  const CAM_DIR = new THREE.Vector3(1.6, 1.05, 2.0).normalize();

  scene.add(new THREE.AmbientLight(0xffffff, 0.45));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(4, 7, 3);
  scene.add(key);
  const rim = new THREE.DirectionalLight(LAYERS[0].hue, 2.2);
  rim.position.set(-5, 2.5, -3.5);
  scene.add(rim);
  const glowLight = new THREE.PointLight(LAYERS[0].hue, 14, 9, 2);
  glowLight.position.set(0.6, slabTopY(0) + 1.1, 1.4);
  scene.add(glowLight);

  const cube = new THREE.Group();
  scene.add(cube);

  // Floor: fading grid + soft shadow
  const grid = new THREE.GridHelper(40, 80, 0x2b2d3d, 0x181924);
  grid.position.y = FLOOR_Y - 0.01;
  scene.add(grid);
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(6.5, 6.5),
    new THREE.MeshBasicMaterial({
      map: makeShadowTexture(), transparent: true, opacity: 0.6, depthWrite: false,
    })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = FLOOR_Y;
  scene.add(shadow);

  /* Slab variants */
  const boxGeo = new THREE.BoxGeometry(W, H, D);
  const edgeGeo = new THREE.EdgesGeometry(boxGeo);

  const buildVariant = (i, v) => {
    const layer = LAYERS[i], spec = layer.variants[v];
    const hue = new THREE.Color(layer.hue);
    const rnd = mulberry(1000 + i * 37 + v * 613);
    const group = new THREE.Group();
    group.position.y = slabCenterY(i);

    const top = makeTopTextures(layer.hue, 300 + i * 17 + v * 7, spec.svg(layer.hue));
    const side = makeSideTextures(layer.hue, spec.label, i, 500 + i * 23 + v * 11);

    // Emissive is white: the projected artwork glows in its own colours
    // (traffic lights, Rust badge) rather than being tinted by the hue.
    const topMat = new THREE.MeshStandardMaterial({
      map: top.map, emissiveMap: top.emissiveMap,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: i === 0 ? 1.0 : 0.18,
      roughness: 0.55, metalness: 0.35,
    });
    const sideMatA = new THREE.MeshStandardMaterial({
      map: side.map, emissiveMap: side.emissiveMap, emissive: hue,
      emissiveIntensity: 0.8, roughness: 0.5, metalness: 0.5,
    });
    const sideMatB = new THREE.MeshStandardMaterial({
      color: 0x14151d, roughness: 0.6, metalness: 0.5,
    });
    const bottomMat = new THREE.MeshStandardMaterial({
      color: 0x0e0f15, roughness: 0.7, metalness: 0.4,
    });

    // BoxGeometry face order: +x, -x, +y, -y, +z, -z
    const body = new THREE.Mesh(boxGeo, [sideMatA, sideMatB, topMat, bottomMat, sideMatA, sideMatB]);
    group.add(body);

    const edges = new THREE.LineSegments(
      edgeGeo,
      new THREE.LineBasicMaterial({ color: hue, transparent: true, opacity: 0.5 })
    );
    group.add(edges);

    const mats = [topMat, sideMatA, sideMatB, bottomMat];
    // Status pixel in the bottom-right corner: green = works out of the box,
    // red = hand-written Rust. The red one blinks hard, like a busy drive.
    const rust = !!spec.rust;
    const studHue = new THREE.Color(rust ? "#ff3b30" : "#22c55e");
    const studMat = new THREE.MeshBasicMaterial({ color: studHue });
    const studSize = rust ? 0.06 : 0.05;
    const stud = new THREE.Mesh(new THREE.BoxGeometry(studSize, studSize, 0.02), studMat);
    stud.position.set(W / 2 - 0.22, -H / 2 + 0.08, D / 2 + 0.012);
    group.add(stud);
    mats.push(studMat);

    cube.add(group);
    return {
      group, mats, edges, topMat, studMat, studHue,
      // Flicker profile: amplitude + retrigger cadence (ms).
      flickAmp: rust ? 0.6 : 0.15,
      flickMin: rust ? 25 : 40,
      flickSpan: rust ? 130 : 280,
      flick: { level: 1, target: 1, next: 0 },
    };
  };

  const setOp = (vObj, o) => {
    const translucent = o < 0.999;
    vObj.mats.forEach((m) => {
      if (m.transparent !== translucent) {
        // Toggling transparency after first render needs a program rebuild,
        // otherwise the opacity uniform is silently ignored.
        m.transparent = translucent;
        m.needsUpdate = true;
      }
      m.opacity = o;
    });
    vObj.edges.material.opacity = 0.5 * o;
  };

  const slabs = [];
  LAYERS.forEach((layer, i) => {
    const hue = new THREE.Color(layer.hue);
    // Seam glow strip below this slab (none under the last one)
    let seamMat = null;
    if (i < N - 1) {
      seamMat = new THREE.MeshBasicMaterial({
        color: hue, transparent: true, opacity: 0.16,
        blending: THREE.AdditiveBlending, depthWrite: false,
      });
      const seam = new THREE.Mesh(new THREE.BoxGeometry(W * 0.99, GAP, D * 0.99), seamMat);
      seam.position.y = slabCenterY(i) - H / 2 - GAP / 2;
      cube.add(seam);
    }
    // Start on whatever variant the URL hash restored; others build lazily.
    const vi0 = varIndex[i];
    const variants = [];
    variants[vi0] = buildVariant(i, vi0);
    slabs.push({
      seamMat,
      baseY: slabCenterY(i),
      dirX: i % 2 === 0 ? 1 : -1,
      r: new Tween(0),
      variants,
      vi: vi0,
      swap: null,
    });
  });

  /* Physical module swap: current slides off, replacement slides in. */
  onVariantSwap = (i, vi, dir) => {
    const s = slabs[i];
    if (vi === s.vi) return;
    if (!s.variants[vi]) s.variants[vi] = buildVariant(i, vi);
    // Finish any in-flight swap instantly.
    if (s.swap) {
      s.swap.out.group.visible = false;
      s.swap.out.group.position.set(0, s.baseY, 0);
      s.swap.out.group.rotation.set(0, 0, 0);
      setOp(s.swap.out, 1);
      s.swap = null;
    }
    const out = s.variants[s.vi], inn = s.variants[vi];
    s.vi = vi;
    inn.group.visible = true;
    const t = new Tween(0);
    t.retarget(1, 820);
    s.swap = { out, inn, t, dir };
    wake();
  };

  /* ── Framing / state ───────────────────────────────────── */

  const camTx = new Tween(0), camTy = new Tween(1.55), camDist = new Tween(10.5);
  const CAM_DUR = 1350, SLAB_DUR = 1250, STAGGER = 110;

  let removedTarget = 0;
  const hueTarget = new THREE.Color(LAYERS[0].hue);

  const framing = (key) => {
    const aspect = window.innerWidth / Math.max(1, window.innerHeight);
    const portrait = aspect < 0.9;
    const fit = portrait ? 1.5 : 1;
    // Hero: look above the cube so the stack settles into the lower half,
    // clear of the headline.
    if (key === "hero") return { tx: 0, ty: 1.55, dist: 10.5 * fit };
    if (key === "outro") return { tx: 0, ty: 0, dist: 10.5 * fit };
    const i = +key;
    return {
      tx: portrait ? 0 : (i % 2 === 0 ? -0.95 : 0.95),
      ty: slabTopY(i) - 0.5,
      dist: 5.8 * Math.pow(0.945, i) * fit,
    };
  };

  /* Power management: motion carries full energy for 7s after the last
   * state change, winds down to perfectly still by 10s, and then the render
   * loop stops entirely — zero CPU — until the next interaction wakes it. */
  let lastActivity = performance.now();
  let running = false;
  const wake = () => {
    lastActivity = performance.now();
    if (!running) {
      running = true;
      requestAnimationFrame(frame); // dt is clamped, so no spike after sleep
    }
  };

  const applyState = (key) => {
    wake();
    activeKey = key;
    updateHash();
    const f = framing(key);
    camTx.retarget(f.tx, CAM_DUR);
    camTy.retarget(f.ty, CAM_DUR);
    camDist.retarget(f.dist, CAM_DUR);

    const T = key === "hero" || key === "outro" ? 0 : +key;
    if (T !== removedTarget) {
      const lo = Math.min(T, removedTarget), hi = Math.max(T, removedTarget);
      const forward = T > removedTarget;
      for (let i = lo; i < hi; i++) {
        const order = forward ? i - lo : hi - 1 - i;
        slabs[i].r.retarget(forward ? 1 : 0, SLAB_DUR, order * STAGGER);
      }
      removedTarget = T;
    }
    const hueIdx = key === "outro" ? 0 : Math.min(T, N - 1);
    hueTarget.set(LAYERS[key === "hero" ? 0 : hueIdx].hue);

    document.body.classList.toggle("fw3-dim", key === "outro");
  };

  /* ── Scroll wiring ─────────────────────────────────────── */

  const revealTimers = new Map();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const sec = entry.target;
        const key = sec.dataset.fw3;
        if (!entry.isIntersecting) {
          sec.classList.remove("fw3-on");
          clearTimeout(revealTimers.get(sec));
          return;
        }
        applyState(key);

        // Text lands just after the transition does.
        clearTimeout(revealTimers.get(sec));
        if (key === "hero" || key === "outro") sec.classList.add("fw3-on");
        else revealTimers.set(sec, setTimeout(() => sec.classList.add("fw3-on"), 950));
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );
  sections.forEach((s) => observer.observe(s));
  sections.forEach((s) => { if (s.dataset.fw3 === "hero") s.classList.add("fw3-on"); });

  // ← → swap the active layer's module from the keyboard.
  window.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    if (!/^\d+$/.test(activeKey)) return;
    stepVariant(+activeKey, e.key === "ArrowRight" ? 1 : -1);
  });

  // Fade the stage out completely once the footer scrolls in.
  const footer = document.querySelector("footer");
  if (footer) {
    new IntersectionObserver((entries) => {
      document.body.classList.toggle("fw3-hide", entries[0].isIntersecting);
    }, { threshold: 0.1 }).observe(footer);
  }

  /* ── Render loop ───────────────────────────────────────── */

  const resize = () => {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    applyState(activeKey); // re-derive framing for the new aspect
  };
  window.addEventListener("resize", resize);
  resize();

  const target = new THREE.Vector3();
  let prev = performance.now();

  function frame(now) {
    const dt = Math.min(0.05, (now - prev) / 1000);
    prev = now;
    const t = now / 1000;

    // Energy: 1 while active, easing to 0 between 7s and 10s of quiet.
    const energy = 1 - smoothstep(7, 10, (now - lastActivity) / 1000);

    // Idle: breathe + sway, settling to the neutral pose as energy fades.
    cube.position.y = 0.05 * Math.sin(t * 0.6) * energy;
    cube.rotation.y = 0.045 * Math.sin(t * 0.25) * energy;

    // Slab flight + module swaps
    for (let i = 0; i < N; i++) {
      const s = slabs[i];
      const cur = s.variants[s.vi];
      const r = s.r.update(now);

      // Module swap: out slides away, the new module slides in.
      let inX = 0, inRotZ = 0, inOp = 1;
      if (s.swap) {
        const k = s.swap.t.update(now);
        const o = s.swap.out;
        o.group.position.set(-s.swap.dir * 4.6 * k, s.baseY, 0);
        o.group.rotation.set(0, 0, -s.swap.dir * 0.22 * k);
        // Fade tracks the slide all the way out — no mid-air vanish.
        setOp(o, 1 - smoothstep(0.12, 0.98, k));
        inX = s.swap.dir * 4.6 * (1 - k);
        inRotZ = s.swap.dir * 0.22 * (1 - k);
        inOp = smoothstep(0.05, 0.8, k);
        if (k >= 1) {
          o.group.visible = false;
          o.group.position.set(0, s.baseY, 0);
          o.group.rotation.set(0, 0, 0);
          setOp(o, 1);
          s.swap = null;
        }
      }

      const g = cur.group;
      g.visible = r < 0.999;
      g.position.y = s.baseY + 0.25 * r + 5.8 * r * r * r;
      g.position.x = 2.6 * r * r * s.dirX + inX;
      g.position.z = -0.9 * r * r;
      g.rotation.x = -0.55 * r;
      g.rotation.z = 0.3 * r * r * s.dirX + inRotZ;

      const flightOp = 1 - smoothstep(0.55, 0.92, r);
      setOp(cur, Math.min(flightOp, inOp));

      // Hard-drive activity flicker on the status pixel (calms with energy).
      if (now > cur.flick.next) {
        cur.flick.target = 1 - cur.flickAmp * Math.random() * energy;
        cur.flick.next = now + cur.flickMin + Math.random() * cur.flickSpan;
      }
      cur.flick.level += (cur.flick.target - cur.flick.level) * Math.min(1, dt * 30);
      cur.studMat.color.copy(cur.studHue).multiplyScalar(cur.flick.level);

      // Seam under this slab: flare as it peels, die once it's gone.
      if (s.seamMat) {
        const flare = Math.exp(-Math.pow((r - 0.22) / 0.16, 2));
        s.seamMat.opacity = (0.16 + 0.7 * flare) * (1 - smoothstep(0.7, 0.95, r));
      }

      // Newly exposed top lights up.
      const expose = i === 0 ? 1 : smoothstep(0.45, 0.9, slabs[i - 1].r.v);
      cur.topMat.emissiveIntensity = 0.18 + 0.85 * expose;
    }

    // Camera
    target.set(camTx.update(now), camTy.update(now), 0);
    camera.position.copy(CAM_DIR).multiplyScalar(camDist.update(now)).add(target);
    camera.lookAt(target);

    // Accent lighting follows the active layer.
    const lerp = 1 - Math.exp(-dt * 3.5);
    const topIdx = Math.min(removedTarget, N - 1);
    const glowPos = new THREE.Vector3(0.6, slabTopY(topIdx) + 1.1, 1.4);
    rim.color.lerp(hueTarget, lerp);
    glowLight.color.lerp(hueTarget, lerp);
    glowLight.position.lerp(glowPos, lerp);

    // Fully at rest? Snap the asymptotic lerps, draw once more, and sleep.
    const settled =
      energy === 0 &&
      slabs.every((s) => s.r.v === s.r.to && !s.swap) &&
      camTx.v === camTx.to && camTy.v === camTy.to && camDist.v === camDist.to;
    if (settled) {
      rim.color.copy(hueTarget);
      glowLight.color.copy(hueTarget);
      glowLight.position.copy(glowPos);
      slabs.forEach((s) => {
        const cur = s.variants[s.vi];
        cur.flick.level = 1;
        cur.studMat.color.copy(cur.studHue);
      });
      running = false;
    }

    renderer.render(scene, camera);
    if (running) requestAnimationFrame(frame);
  }

  document.body.classList.add("fw3-live");
  wake();
  scrollToInitial();
})();
