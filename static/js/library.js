/* The Library — descent + page-turn engine.
 *
 * The page is flat-first: every chapter renders as a plain paper article
 * (SEO, no-JS, small screens, reduced motion). On capable viewports this
 * module adds body.lib-live and runs the theatre: a fixed book stage the
 * scroll descends onto, a cover that opens once, and CSS-3D leaf turns
 * between chapter spreads. Chapter content is MOVED (not copied) between
 * its home <article> and the book's page slots, so event listeners bound
 * at load (e.g. the site lightbox) survive; clones exist only on the
 * transient turning leaf.
 */
(() => {
  "use strict";

  const flow = document.getElementById("lib-flow");
  const book = document.getElementById("lib-book");
  if (!flow || !book) return;

  const body = document.body;
  const articles = Array.from(flow.querySelectorAll(".lib-ch"));

  const capable = () =>
    window.matchMedia("(min-width: 960px)").matches &&
    window.matchMedia("(min-height: 560px)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!capable() || !articles.length) return; // stay flat

  body.classList.add("lib-live");

  /* ── refs ─────────────────────────────────────────────── */
  const cover = document.getElementById("lib-cover");
  const slotL = book.querySelector(".lib-slot-l");
  const slotR = book.querySelector(".lib-slot-r");
  const pagenoL = slotL.querySelector(".lib-pageno");
  const pagenoR = slotR.querySelector(".lib-pageno");
  const edgesL = book.querySelector(".lib-edges-l");
  const edgesR = book.querySelector(".lib-edges-r");
  const cornerPrev = book.querySelector(".lib-corner.prev");
  const cornerNext = book.querySelector(".lib-corner.next");
  const ribbon = document.getElementById("lib-ribbon");
  const bookSec = document.getElementById("book");

  // cache the halves up front — they move between home article and the
  // book's slots, so re-querying the article would come back empty
  const pages = articles.map((a) => ({
    l: a.querySelector(".pg-left"),
    r: a.querySelector(".pg-right"),
  }));
  const pgL = (i) => pages[i].l;
  const pgR = (i) => pages[i].r;

  let current = -1; // spread index
  let opened = false;
  let turning = false;
  let turned = false; // has the reader ever turned a page

  /* ── chrome: running headers, numbers, ribbon, corners ── */
  const chrome = (i) => {
    const art = articles[i];
    const title = art.dataset.title || "";
    const chapter = art.querySelector(".ch-head h2");
    slotL.dataset.running = title;
    slotR.dataset.running = chapter ? chapter.textContent : title;
    const isChapter = /^ch-\d+$/.test(art.id);
    const n = isChapter ? parseInt(art.id.slice(3), 10) : 0;
    pagenoL.textContent = isChapter ? String(n * 2) : "";
    pagenoR.textContent = isChapter ? String(n * 2 + 1) : "";
    ribbon.textContent = i === 0 ? "❦" : (art.dataset.short || "").replace(/\s+/g, "");
    cornerPrev.disabled = i === 0;
    cornerNext.disabled = i === articles.length - 1;
    const p = i / (articles.length - 1);
    edgesL.style.width = 6 + 14 * p + "px";
    edgesR.style.width = 6 + 14 * (1 - p) + "px";
  };

  const syncHash = (i) =>
    history.replaceState(null, "", "#" + articles[i].id);

  const homePg = (pg) => {
    if (!pg) return;
    const home = articles.find((a) => a.id === pg.dataset.home);
    if (home) home.appendChild(pg);
  };
  // remember each half's home article so it can be returned after a move
  articles.forEach((a) => {
    const l = a.querySelector(".pg-left");
    const r = a.querySelector(".pg-right");
    if (l) l.dataset.home = a.id;
    if (r) r.dataset.home = a.id;
  });

  /* place a spread directly (no leaf) */
  const place = (i) => {
    if (current >= 0) {
      homePg(slotL.querySelector(".pg"));
      homePg(slotR.querySelector(".pg"));
    }
    slotL.appendChild(pgL(i));
    slotR.appendChild(pgR(i));
    chrome(i);
    current = i;
    syncHash(i);
  };

  const clonePg = (pg) => {
    const c = pg.cloneNode(true);
    c.removeAttribute("id");
    c.querySelectorAll("[id]").forEach((n) => n.removeAttribute("id"));
    c.dataset.home = "";
    return c;
  };

  /* ── the turn ─────────────────────────────────────────── */
  const turn = (dir) => {
    if (turning || !opened) return;
    const next = current + dir;
    if (next < 0 || next >= articles.length) return;
    turning = true;
    turned = true;
    body.classList.remove("lib-hint-on");

    const leaf = document.createElement("div");
    leaf.className = "lib-leaf";
    const front = document.createElement("div");
    front.className = "face front";
    const back = document.createElement("div");
    back.className = "face back";
    leaf.append(front, back);

    if (dir > 0) {
      // forward: current right lifts, revealing next right; lands as next left
      front.appendChild(clonePg(pgR(current)));
      back.appendChild(clonePg(pgL(next)));
      homePg(slotR.querySelector(".pg"));
      slotR.appendChild(pgR(next));
      book.appendChild(leaf);
      requestAnimationFrame(() => leaf.classList.add("fwd"));
    } else {
      // back: the page lying on the left lifts and returns to the right
      front.appendChild(clonePg(pgR(next)));
      back.appendChild(clonePg(pgL(current)));
      homePg(slotL.querySelector(".pg"));
      slotL.appendChild(pgL(next));
      leaf.style.transform = "rotateY(-180deg)";
      book.appendChild(leaf);
      requestAnimationFrame(() => leaf.classList.add("back"));
    }

    leaf.addEventListener(
      "animationend",
      () => {
        if (dir > 0) {
          homePg(slotL.querySelector(".pg"));
          slotL.appendChild(pgL(next));
        } else {
          homePg(slotR.querySelector(".pg"));
          slotR.appendChild(pgR(next));
        }
        leaf.remove();
        chrome(next);
        current = next;
        syncHash(next);
        turning = false;
      },
      { once: true }
    );
  };

  const goTo = (i) => {
    if (!opened || i === current || turning) return;
    if (Math.abs(i - current) === 1) turn(i - current);
    else place(i);
  };

  /* ── opening the cover ────────────────────────────────── */
  const idxFromHash = (h) => articles.findIndex((a) => "#" + a.id === h);

  const openBook = (instant) => {
    if (opened) return;
    opened = true;
    const target = Math.max(0, idxFromHash(location.hash));
    place(target);
    if (instant) {
      book.classList.add("lib-skip");
      requestAnimationFrame(() =>
        setTimeout(() => book.classList.remove("lib-skip"), 80)
      );
    }
    book.classList.remove("closed");
    book.classList.add("open");
    cover.addEventListener(
      "transitionend",
      () => {
        book.classList.add("cover-done");
        if (!turned && current === 0) body.classList.add("lib-hint-on");
      },
      { once: true }
    );
    if (instant) {
      book.classList.add("cover-done");
      if (!turned && current === 0) body.classList.add("lib-hint-on");
    }
  };

  cover.querySelector(".front").addEventListener("click", () => openBook(false));
  cover.querySelector(".front").addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") openBook(false);
  });

  /* ── descent choreography ─────────────────────────────── */
  let openTimer = 0;
  const setStep = (step) => {
    body.classList.toggle("lib-stage-on", step !== "hero");
    body.classList.toggle("lib-far", step === "desc1");
    body.classList.toggle("lib-near", step === "desc2");
    body.classList.toggle("lib-landed", step === "book");
    clearTimeout(openTimer);
    if (step === "book" && !opened) openTimer = setTimeout(() => openBook(false), 650);
  };

  const secObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) {
          if (e.target.classList.contains("lib-desc")) e.target.classList.remove("on");
          continue;
        }
        if (e.target.classList.contains("lib-desc")) e.target.classList.add("on");
        setStep(e.target.dataset.libSec);
      }
    },
    { threshold: 0.55 }
  );
  document.querySelectorAll("[data-lib-sec]").forEach((s) => secObserver.observe(s));

  /* ── input: corners, keys, swipe, in-book anchors ─────── */
  cornerNext.addEventListener("click", () => turn(1));
  cornerPrev.addEventListener("click", () => turn(-1));

  window.addEventListener("keydown", (e) => {
    if (!opened || !body.classList.contains("lib-landed")) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); turn(1); }
    if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); turn(-1); }
  });

  let touchX = null;
  book.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  book.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 60) turn(dx < 0 ? 1 : -1);
  }, { passive: true });

  // TOC + any in-book link to a chapter: turn instead of scrolling
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const i = idxFromHash(a.getAttribute("href"));
    if (i < 0) return;
    e.preventDefault();
    if (opened) goTo(i);
    else {
      bookSec.scrollIntoView({ behavior: "auto" });
      openBook(true);
      goTo(i);
    }
  });

  window.addEventListener("hashchange", () => {
    const i = idxFromHash(location.hash);
    if (i >= 0 && opened) goTo(i);
  });

  /* deep link: land on the book immediately, no theatre */
  if (idxFromHash(location.hash) >= 0) {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    bookSec.scrollIntoView({ behavior: "auto" });
    setStep("book");
    openBook(true);
    html.style.scrollBehavior = prev;
  }

  /* downgrade to the flat article if the viewport stops qualifying */
  let resizeT = 0;
  window.addEventListener("resize", () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => {
      if (capable() || !body.classList.contains("lib-live")) return;
      if (current >= 0) {
        homePg(slotL.querySelector(".pg"));
        homePg(slotR.querySelector(".pg"));
      }
      body.classList.remove("lib-live", "lib-stage-on", "lib-far", "lib-near", "lib-landed", "lib-hint-on");
    }, 250);
  });
})();
