// Vantage site analytics — vanilla JS, no dependencies.
// Production builds load the Google tag first (base.html, SITE_ENV=production);
// everywhere else `gtag` is missing and events only go to the console.
// Event list and how to add one: README.md, "Analytics".

(() => {
  "use strict";

  const live = typeof window.gtag === "function";
  const contentGroup = document.documentElement.getAttribute("data-content-group") || "";

  const track = (name, params) => {
    params = params || {};
    if (live) {
      window.gtag("event", name, params);
    } else {
      console.log("[ga] " + name, Object.assign({ content_group: contentGroup }, params));
    }
  };
  window.vantageTrack = track;

  /* ---------- Declarative events: data-track="event" + data-track-* params ----------
     Capture phase, so handlers that stop propagation (nav dropdowns) don't hide
     the click. `data-track-link-url` becomes `link_url`. */
  const paramsOf = (el) => {
    const params = {};
    for (const attr of el.attributes) {
      if (attr.name.startsWith("data-track-")) {
        params[attr.name.slice(11).replace(/-/g, "_")] = attr.value;
      }
    }
    return params;
  };

  document.addEventListener(
    "click",
    (e) => {
      const el = e.target.closest && e.target.closest("[data-track]");
      if (!el) return;
      const name = el.getAttribute("data-track");
      const params = paramsOf(el);
      // Hero links have their href swapped per clip by site.js, so the slug is
      // read at click time.
      if (name === "example_open" && !params.example && el.href) {
        const m = /\/examples\/([^/]+)\//.exec(new URL(el.href, location.href).pathname);
        if (m) params.example = m[1];
        else params.link_url = el.href;
      }
      track(name, params);
    },
    true,
  );

  /* ---------- Enterprise lead form ---------- */
  const leadForm = document.getElementById("ent-form");
  if (leadForm) {
    leadForm.addEventListener(
      "focusin",
      () => track("form_start", { form: "enterprise_lead" }),
      { once: true },
    );
  }
  // Dispatched by enterprise-lead.js on success or on the mailto fallback.
  document.addEventListener("vantage:lead", (e) => {
    track("generate_lead", { method: (e.detail && e.detail.method) || "form" });
  });

  /* ---------- Changelog entries opened by the user ----------
     Entries start open; the browser fires `toggle` for that too, so only a
     toggle that follows a click on the entry's summary counts. */
  const changelogs = document.querySelectorAll("details.changelog-entry");
  if (changelogs.length) {
    const clicked = new WeakSet();
    const seen = new Set();
    changelogs.forEach((d) => {
      d.querySelector("summary")?.addEventListener("click", () => clicked.add(d));
      d.addEventListener("toggle", () => {
        if (!clicked.has(d)) return;
        clicked.delete(d);
        const version = d.getAttribute("data-version") || d.id;
        if (!d.open || seen.has(version)) return;
        seen.add(version);
        track("changelog_open", { version });
      });
    });
  }

  /* ---------- Screenshot lightbox (opened by site.js) ---------- */
  const lightbox = document.getElementById("lightbox");
  if (lightbox && document.querySelector(".shot-thumb")) {
    new MutationObserver(() => {
      if (lightbox.hidden) return;
      const caption = lightbox.querySelector(".lightbox-caption");
      track("screenshot_view", { caption: (caption && caption.textContent) || "" });
    }).observe(lightbox, { attributes: true, attributeFilter: ["hidden"] });
  }

  /* ---------- Section views: once per h2[id] / section[id] per page view ---------- */
  const sections = Array.from(document.querySelectorAll("h2[id], section[id]"));
  if ("IntersectionObserver" in window && sections.length) {
    const seen = new Set();
    const obs = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        obs.unobserve(en.target);
        const id = en.target.id;
        if (seen.has(id)) continue;
        seen.add(id);
        track("section_view", { section: id, page_path: location.pathname });
      }
    });
    sections.forEach((s) => obs.observe(s));
  }

  /* ---------- Scroll depth: 25 / 50 / 75 / 90, once each per page ---------- */
  const marks = [25, 50, 75, 90];
  let queued = false;
  const checkDepth = () => {
    queued = false;
    const el = document.documentElement;
    const max = el.scrollHeight - el.clientHeight;
    if (max <= 0) return;
    const pct = (window.scrollY / max) * 100;
    while (marks.length && pct >= marks[0]) {
      track("scroll_depth", { percent: marks.shift() });
    }
    if (!marks.length) window.removeEventListener("scroll", onScroll);
  };
  const onScroll = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(checkDepth);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
})();
