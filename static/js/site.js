// Vantage site behaviour — vanilla JS, no dependencies.
// Each block guards on element existence so the file is safe on every page.

(() => {
  "use strict";

  /* ---------- Sticky nav: border + shadow once scrolled ---------- */
  const topnav = document.getElementById("topnav");
  if (topnav) {
    const sync = () => topnav.classList.toggle("topnav-scrolled", window.scrollY > 0);
    window.addEventListener("scroll", sync, { passive: true });
    sync();
  }

  /* ---------- Desktop dropdowns ---------- */
  const dropdowns = Array.from(document.querySelectorAll("[data-dropdown]"));
  const closeDropdowns = (except) => {
    for (const drop of dropdowns) {
      if (drop === except) continue;
      drop.querySelector(".dropdown-panel")?.classList.add("hidden");
      drop.querySelector("button")?.setAttribute("aria-expanded", "false");
    }
  };
  for (const drop of dropdowns) {
    const btn = drop.querySelector("button");
    const panel = drop.querySelector(".dropdown-panel");
    if (!btn || !panel) continue;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeDropdowns(drop);
      const open = panel.classList.toggle("hidden") === false;
      btn.setAttribute("aria-expanded", String(open));
    });
  }
  if (dropdowns.length) {
    document.addEventListener("click", () => closeDropdowns());
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDropdowns();
    });
  }

  /* ---------- Mobile menu ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (navToggle && mobileMenu) {
    const iconOpen = navToggle.querySelector("[data-icon-open]");
    const iconClose = navToggle.querySelector("[data-icon-close]");
    const setOpen = (open) => {
      mobileMenu.classList.toggle("hidden", !open);
      navToggle.setAttribute("aria-expanded", String(open));
      if (iconOpen) iconOpen.hidden = open;
      if (iconClose) iconClose.hidden = !open;
    };
    navToggle.addEventListener("click", () => setOpen(mobileMenu.classList.contains("hidden")));
    // Close when a link inside is followed (same-page anchors etc.)
    mobileMenu.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
  }

  /* ---------- Backend explorer tabs (features page) ---------- */
  document.querySelectorAll(".backend-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const slug = btn.getAttribute("data-backend");
      document.querySelectorAll(".backend-item").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".backend-panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("bp-" + slug)?.classList.add("active");
    });
  });

  /* ---------- Roadmap deck (features page) ---------- */
  const deck = document.getElementById("roadmapDeck");
  if (deck) {
    const cards = Array.from(deck.querySelectorAll(".roadmap-card"));
    const OFFSET = 16,
      SCALE = 0.05,
      MAX_VISIBLE = 3;
    let animating = false;

    const render = () => {
      cards.forEach((card, i) => {
        card.style.zIndex = String(cards.length - i);
        card.style.transform = `translateY(${i * OFFSET}px) scale(${1 - i * SCALE})`;
        card.style.opacity = i > MAX_VISIBLE ? "0" : "1";
        card.classList.toggle("is-front", i === 0);
      });
    };

    const cycle = () => {
      if (animating || cards.length < 2) return;
      animating = true;
      const front = cards[0];
      front.classList.add("leaving");
      setTimeout(() => {
        cards.push(cards.shift());
        front.classList.remove("leaving");
        render();
        animating = false;
      }, 240);
    };

    deck.addEventListener("click", cycle);
    deck.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        cycle();
      }
    });
    render();
  }

  /* ---------- Snippet galleries (framework + example pages) ----------
     Any number of .snip-gallery blocks are supported. The framework page's
     #snipGallery additionally owns the #slide-N URL hash for deep links; other
     galleries (e.g. the launch-control example) step independently. */
  document.querySelectorAll(".snip-gallery").forEach((gallery) => {
    const snips = Array.from(gallery.querySelectorAll(".snip"));
    const dotsWrap = gallery.querySelector(".snip-dots");
    if (!snips.length || !dotsWrap) return;

    const deepLink = gallery.id === "snipGallery"; // only this one drives the URL hash
    let idx = 0;

    snips.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "snip-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Snippet " + (i + 1));
      dot.addEventListener("click", () => show(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function show(n, updateHash) {
      idx = (n + snips.length) % snips.length;
      snips.forEach((s, i) => s.classList.toggle("active", i === idx));
      dots.forEach((d, i) => d.classList.toggle("active", i === idx));
      if (deepLink && updateHash !== false) {
        // Keep the URL shareable without polluting history or scrolling.
        history.replaceState(null, "", "#slide-" + (idx + 1));
      }
    }

    gallery.querySelector(".snip-prev")?.addEventListener("click", () => show(idx - 1));
    gallery.querySelector(".snip-next")?.addEventListener("click", () => show(idx + 1));

    if (deepLink) {
      const slideFromHash = () => {
        const m = /^#slide-(\d+)$/.exec(window.location.hash);
        return m ? parseInt(m[1], 10) - 1 : null;
      };
      window.addEventListener("hashchange", () => {
        const n = slideFromHash();
        if (n !== null && n !== idx) show(n, false);
      });
      // Open the slide named in the URL on load (and scroll it into view).
      const initial = slideFromHash();
      if (initial !== null && initial >= 0 && initial < snips.length) {
        show(initial, false);
        gallery.scrollIntoView({ block: "center" });
      }
    }
  });

  /* ---------- Launch Control: ascent progress + flight-rail spy ---------- */
  if (document.body.classList.contains("lc")) {
    // Top progress bar tracks how far down the page you are.
    const bar = document.querySelector(".lc-progress > span");
    if (bar) {
      const root = document.documentElement;
      // The Moon is a large 3D model (~80 MB) + viewer component. Only load it on
      // capable desktops with a decent connection: skip on small/touch screens
      // and on slow or data-saver networks. Until then it has no `src`, so nothing
      // downloads. The starfield backdrop (pure CSS) runs everywhere.
      let planet = null;
      const mv = document.querySelector("model-viewer.lc-planet");
      const conn = navigator.connection || {};
      const slowNet =
        conn.saveData === true ||
        (conn.effectiveType && conn.effectiveType !== "4g") ||
        (typeof conn.downlink === "number" && conn.downlink > 0 && conn.downlink < 2);
      const smallOrTouch =
        window.matchMedia("(max-width: 1023px)").matches ||
        window.matchMedia("(hover: none) and (pointer: coarse)").matches;
      if (mv && !slowNet && !smallOrTouch) {
        const s = document.createElement("script");
        s.type = "module";
        s.src = mv.dataset.mv;
        document.head.appendChild(s);
        mv.setAttribute("src", mv.dataset.glb);
        planet = mv;
      }
      const updateBar = () => {
        const el = document.documentElement;
        const max = el.scrollHeight - el.clientHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        bar.style.width = (p * 100).toFixed(1) + "%";
        // "Into space" backdrop: ramp depth 0→1 over the first 20% of scroll
        // (smoothstep), so the galaxy fills in early and stays (see .lc-space in
        // launch-control.html).
        const t = Math.min(1, p / 0.2);
        root.style.setProperty("--lc-depth", (t * t * (3 - 2 * t)).toFixed(3));
        // Raw full-page progress drives the star parallax, which keeps drifting
        // all the way to the bottom (in sync with the Moon descent below).
        root.style.setProperty("--lc-scroll", p.toFixed(4));
        // Moon descent over the final stretch (from ~78% of scroll to the end):
        // a lander's side-window view. At the start the horizon is a low sliver
        // and we're looking up (sky-heavy); by the end we've dropped toward the
        // surface and the ground fills the bottom ~30% of the screen.
        const er = Math.min(1, Math.max(0, (p - 0.78) / 0.22));
        const e = er * er * (3 - 2 * er);
        root.style.setProperty("--lc-end", e.toFixed(3));
        if (planet) {
          const L = (a, b) => (a + (b - a) * e).toFixed(2);
          // camera-target Y rides above the limb (in space): higher = Moon sits
          // lower in frame (more sky); lowering it raises the ground into view.
          planet.setAttribute("camera-target", `0m ${L(1.55, 1.02)}m 0m`);
          // phi tips the look slightly down as we near the surface; radius drops
          // 2.2m→1.45m to descend toward the ground.
          planet.setAttribute("camera-orbit", `0deg ${L(96, 104)}deg ${L(2.2, 1.45)}m`);
          planet.setAttribute("field-of-view", `${L(30, 34)}deg`);
        }
      };
      window.addEventListener("scroll", updateBar, { passive: true });
      window.addEventListener("resize", updateBar);
      updateBar();
    }

    // Flight rail: highlight the current chapter, mark passed ones done.
    const items = Array.from(document.querySelectorAll(".lc-rail-item"));
    const ids = items.map((a) => a.getAttribute("href").slice(1));

    const setActive = (id) => {
      const ai = ids.indexOf(id);
      items.forEach((a, i) => {
        a.classList.toggle("active", i === ai);
        a.classList.toggle("done", ai > -1 && i < ai);
      });
    };

    items.forEach((a) => {
      a.addEventListener("click", (e) => {
        const target = document.getElementById(a.getAttribute("href").slice(1));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    const chapters = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if ("IntersectionObserver" in window && chapters.length) {
      const visible = new Set();
      const obs = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            if (en.isIntersecting) visible.add(en.target.id);
            else visible.delete(en.target.id);
          }
          // The first chapter (in document order) still in the band wins.
          const current = ids.find((id) => visible.has(id));
          if (current) setActive(current);
        },
        { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
      );
      chapters.forEach((c) => obs.observe(c));
    }
    if (ids.length) setActive(ids[0]);
  }

  /* ---------- Periscope: dive progress + dive-rail spy ----------
     Mirrors Launch Control, but descends into the sea. The backdrop (water
     gradient, the rising bubble field and the deep-sea floor) is CSS — see
     .ps-sea in periscope.html — driven by three scroll custom properties below;
     the bubble elements themselves are spawned just after. */
  if (document.body.classList.contains("ps")) {
    const bar = document.querySelector(".ps-progress > span");
    const root = document.documentElement;
    const updateDive = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (bar) bar.style.width = (p * 100).toFixed(1) + "%";
      // Settle the scene in over the first 20% of scroll (smoothstep): the water
      // and the bubble field fade in from the transparent surface.
      const t = Math.min(1, p / 0.2);
      root.style.setProperty("--ps-depth", (t * t * (3 - 2 * t)).toFixed(3));
      // Raw full-page progress slides the water column darker as you descend.
      root.style.setProperty("--ps-scroll", p.toFixed(4));
      // The abyss + the Kubernetes helm reveal over the final 20% (from 80%).
      const er = Math.min(1, Math.max(0, (p - 0.8) / 0.2));
      root.style.setProperty("--ps-end", (er * er * (3 - 2 * er)).toFixed(3));
    };
    window.addEventListener("scroll", updateDive, { passive: true });
    window.addEventListener("resize", updateDive);
    updateDive();

    /* Spawn the independent bubble field. Each <b> gets its own size, lane, rise
       duration, sway, peak opacity and a negative delay — so the field starts
       already in motion, staggered, with no two bubbles sharing a path or speed.
       Bigger bubbles rise a touch faster. Skipped under reduced-motion. */
    const rise = document.querySelector(".ps-rise");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rise && !reduce) {
      const rnd = (a, b) => a + Math.random() * (b - a);
      const count = Math.max(16, Math.min(38, Math.round(window.innerWidth / 34)));
      let html = "";
      for (let i = 0; i < count; i++) {
        const sz = rnd(1.5, 7);
        const ttl = rnd(40, 64) - sz; // slow; larger ⇒ a touch faster
        const sway = (Math.random() < 0.5 ? -1 : 1) * rnd(4, 24);
        html +=
          '<b style="--x:' +
          rnd(0, 100).toFixed(1) +
          "%;--sz:" +
          sz.toFixed(1) +
          "px;--ttl:" +
          ttl.toFixed(1) +
          "s;--dl:-" +
          rnd(0, ttl).toFixed(1) +
          "s;--sway:" +
          sway.toFixed(0) +
          "px;--o:" +
          rnd(0.12, 0.42).toFixed(2) +
          '"></b>';
      }
      rise.innerHTML = html;
    }

    /* Prompt absorption: each prompt is a sticky "bubble"; the prose of
       everything that went into it scrolls up and slides behind the bubble
       (opaque, on top). A counter tallies the numbered build steps as each
       one's top passes under the bubble's lower edge. No per-item transforms —
       just the count, so the prose stays prose. */
    const scenes = Array.from(document.querySelectorAll(".ps-prompt"));
    if (scenes.length) {
      let queued = false;
      const absorb = () => {
        queued = false;
        for (const scene of scenes) {
          const bubble = scene.querySelector(".ps-bubble");
          const sticky = scene.querySelector(".ps-prompt__sticky");
          if (!bubble || !sticky) continue;
          const edge = bubble.getBoundingClientRect().bottom;
          const counter = scene.querySelector(".ps-bubble__count .n");
          let done = 0;
          // Only true build steps count — the "skip" aside is not one.
          scene.querySelectorAll(".ps-step:not(.skip)").forEach((step) => {
            if (step.getBoundingClientRect().top < edge - 6) done++;
          });
          if (counter) counter.textContent = done;
          // The bubble is "absorbing" only while pinned at its sticky offset with
          // prompt still below it — i.e. prose is actually sliding under. Gate
          // the blur skirt on that, so it's invisible before the prompt is
          // reached and after it's scrolled past.
          const top = parseFloat(getComputedStyle(sticky).top) || 0;
          const r = scene.getBoundingClientRect();
          const stuck = r.top <= top + 0.5 && r.bottom >= top + bubble.offsetHeight;
          scene.classList.toggle("is-absorbing", stuck);
        }
      };
      const onAbsorb = () => {
        if (!queued) {
          queued = true;
          requestAnimationFrame(absorb);
        }
      };
      window.addEventListener("scroll", onAbsorb, { passive: true });
      window.addEventListener("resize", onAbsorb);
      absorb();
    }

    // Dive rail: highlight the current chapter, mark passed ones done.
    const items = Array.from(document.querySelectorAll(".ps-rail-item"));
    const ids = items.map((a) => a.getAttribute("href").slice(1));

    const setActive = (id) => {
      const ai = ids.indexOf(id);
      items.forEach((a, i) => {
        a.classList.toggle("active", i === ai);
        a.classList.toggle("done", ai > -1 && i < ai);
      });
    };

    items.forEach((a) => {
      a.addEventListener("click", (e) => {
        const target = document.getElementById(a.getAttribute("href").slice(1));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    const chapters = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if ("IntersectionObserver" in window && chapters.length) {
      const visible = new Set();
      const obs = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            if (en.isIntersecting) visible.add(en.target.id);
            else visible.delete(en.target.id);
          }
          const current = ids.find((id) => visible.has(id));
          if (current) setActive(current);
        },
        { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
      );
      chapters.forEach((c) => obs.observe(c));
    }
    if (ids.length) setActive(ids[0]);
  }

  /* ---------- Screenshot lightbox (download page changelog) ----------
     Thumbnails carry data-full (fullscreen src) + data-caption. Click opens
     the shared #lightbox overlay; backdrop / ✕ / Escape close it. */
  const lightbox = document.getElementById("lightbox");
  const thumbs = Array.from(document.querySelectorAll(".shot-thumb"));
  if (lightbox && thumbs.length) {
    const img = lightbox.querySelector(".lightbox-img");
    const caption = lightbox.querySelector(".lightbox-caption");
    const closeBtn = lightbox.querySelector(".lightbox-close");
    let lastFocused = null;

    const open = (thumb) => {
      lastFocused = thumb;
      img.src = thumb.getAttribute("data-full") || "";
      const text = thumb.getAttribute("data-caption") || "";
      img.alt = text;
      caption.textContent = text;
      caption.hidden = !text;
      lightbox.hidden = false;
      document.body.classList.add("no-scroll");
      closeBtn.focus();
    };

    const close = () => {
      lightbox.hidden = true;
      img.src = "";
      document.body.classList.remove("no-scroll");
      if (lastFocused) lastFocused.focus();
    };

    thumbs.forEach((t) => t.addEventListener("click", () => open(t)));
    closeBtn.addEventListener("click", close);
    // Click on the backdrop (not the image/caption) closes.
    lightbox.addEventListener("click", (e) => {
      if (!e.target.closest(".lightbox-figure") && !e.target.closest(".lightbox-close")) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !lightbox.hidden) close();
    });
  }
})();
