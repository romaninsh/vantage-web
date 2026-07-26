/* The Library, second printing.
 *
 * Flat-first: the page renders as stacked paper cards with no JS at all.
 * On capable viewports this module adds body.lib2-live and the same DOM
 * becomes a closed book below the hero. Scrolling engages the page the
 * way periscope's dive does: a scroll-driven --lib-depth custom property
 * fades a field of falling, 3D-tumbling leaves into the fixed backdrop
 * (each leaf has its own appearance threshold, so the flurry thickens
 * with depth), and the book flips its cover open as it enters the view.
 *
 * Robustness rules: exactly one .spread carries .active, everything else
 * is CSS; nothing in the DOM ever moves; the page-turn leaf is a
 * content-free scrap of paper appended per turn and removed after.
 */
(() => {
  "use strict";

  const book = document.getElementById("lib2-book");
  if (!book) return;

  const root = document.documentElement;
  const body = document.body;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── scroll depth: 0 on arrival → 1 a third of the way down ── */
  const updateDepth = () => {
    const max = root.scrollHeight - root.clientHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    const t = Math.min(1, p / 0.3);
    root.style.setProperty("--lib-depth", (t * t * (3 - 2 * t)).toFixed(3));
  };
  window.addEventListener("scroll", updateDepth, { passive: true });
  window.addEventListener("resize", updateDepth);
  updateDepth();

  /* ── the leaf flurry ─────────────────────────────────────────
     Each leaf gets its own lane, size, fall time, sway, tumble
     speed, peak opacity and — crucially — an appearance threshold
     (--th): it only fades in once --lib-depth passes it, so the
     backdrop starts empty and fills as you scroll. */
  const fall = document.querySelector(".lib2-fall");
  if (fall && !reduce) {
    const rnd = (a, b) => a + Math.random() * (b - a);
    const tints = ["leaf-rose", "leaf-sage", "leaf-sky", "leaf-ochre"];
    const count = Math.max(12, Math.min(28, Math.round(window.innerWidth / 52)));
    let html = "";
    for (let i = 0; i < count; i++) {
      const ttl = rnd(9, 18);
      html +=
        '<span style="--x:' + rnd(0, 100).toFixed(1) + "%" +
        ";--sz:" + rnd(16, 38).toFixed(0) + "px" +
        ";--ttl:" + ttl.toFixed(1) + "s" +
        ";--dl:-" + rnd(0, ttl).toFixed(1) + "s" +
        ";--sway:" + rnd(18, 70).toFixed(0) + "px" +
        ";--spin:" + rnd(2.5, 6).toFixed(1) + "s" +
        ";--th:" + ((i / count) * 0.8).toFixed(2) +
        ";--o:" + rnd(0.45, 0.9).toFixed(2) + '">' +
        '<svg viewBox="0 0 100 100" class="' + tints[i % 4] + '">' +
        '<use href="#lib2-leafshape"/></svg></span>';
    }
    fall.innerHTML = html;

    /* Power management, adopted from the framework page: the flurry
       carries full energy for 7s after the user's last interaction,
       winds down to a standstill by 10s, and then pauses entirely —
       zero CPU — until the user returns and interacts. Slowing is
       done through playbackRate, so leaves glide down gently instead
       of freezing mid-air. */
    let leafAnims = null;
    const anims = () => {
      if (!leafAnims || !leafAnims.length) {
        leafAnims = fall
          .getAnimations({ subtree: true })
          .filter((a) => a.animationName === "lib2-fall" || a.animationName === "lib2-tumble");
      }
      return leafAnims;
    };
    const smooth = (a, b, x) => {
      const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };
    let lastActivity = performance.now();
    let running = false;
    const tick = (now) => {
      const energy = document.hidden ? 0 : 1 - smooth(7, 10, (now - lastActivity) / 1000);
      for (const a of anims()) {
        if (energy === 0) a.pause();
        else { a.play(); a.playbackRate = energy; }
      }
      if (energy === 0) { running = false; return; } // asleep until the next wake
      requestAnimationFrame(tick);
    };
    const wakeLeaves = () => {
      lastActivity = performance.now();
      if (!running) { running = true; requestAnimationFrame(tick); }
    };
    ["scroll", "pointermove", "pointerdown", "keydown", "touchstart", "wheel"].forEach((ev) =>
      window.addEventListener(ev, wakeLeaves, { passive: true }));
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { anims().forEach((a) => a.pause()); running = false; }
      else wakeLeaves();
    });
    wakeLeaves();
  }

  /* ── book mode: flat <-> live is only ever a body class ────── */
  const capable = () =>
    window.matchMedia("(min-width: 960px)").matches &&
    window.matchMedia("(min-height: 560px)").matches &&
    !reduce;
  const live = () => body.classList.contains("lib2-live");

  const applyMode = () => body.classList.toggle("lib2-live", capable());
  applyMode();
  let resizeT = 0;
  window.addEventListener("resize", () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(applyMode, 200);
  });

  /* ── spreads ─────────────────────────────────────────────── */
  const spreads = Array.from(book.querySelectorAll(".spread"));
  const cornerPrev = book.querySelector(".lib2-corner.prev");
  const cornerNext = book.querySelector(".lib2-corner.next");
  const coverFront = book.querySelector(".lib2-cover .front");

  const flip = (dir) => {
    book.querySelectorAll(".lib2-leaf").forEach((l) => l.remove());
    const leaf = document.createElement("div");
    leaf.className = "lib2-leaf " + (dir > 0 ? "fwd" : "back");
    book.appendChild(leaf);
    const done = () => leaf.remove();
    leaf.addEventListener("animationend", done, { once: true });
    setTimeout(done, 1200); // safety: never leave a leaf behind
  };

  const idxFromHash = (h) => spreads.findIndex((s) => "#" + s.id === h);
  let current = 0;
  let swapT = 0;

  const show = (i) => {
    spreads.forEach((s) => s.classList.remove("active", "out"));
    spreads[i].classList.add("active");
  };

  /* a turn is: fade the old spread out, start the paper leaf, swap
     the content mid-turn (while it's hidden), fade the new spread in
     under the leaf's second half */
  const setSpread = (i, animate) => {
    if (i < 0 || i >= spreads.length || i === current) return;
    const from = current;
    const dir = i - current;
    current = i;
    book.style.setProperty("--prog", String(i / (spreads.length - 1)));
    cornerPrev.disabled = i === 0;
    cornerNext.disabled = i === spreads.length - 1;
    history.replaceState(null, "", i === 0 ? location.pathname : "#" + spreads[i].id);
    clearTimeout(swapT);
    if (animate && live()) {
      spreads[from].classList.add("out");
      flip(dir);
      swapT = setTimeout(() => show(i), 400);
    } else {
      show(i);
    }
  };

  /* ── opening the cover: is-closed → opening → is-open ─────
     The ceremony itself is pure CSS (see lib2-cover-open and
     friends in the template); this just walks the states. */
  const isClosed = () => book.classList.contains("is-closed");
  const busy = () => isClosed() || book.classList.contains("opening");

  const openBook = (instant) => {
    if (!isClosed()) return;
    book.classList.remove("is-closed");
    if (instant) {
      book.classList.add("is-open");
      return;
    }
    book.classList.add("opening");
    setTimeout(() => {
      // turn done: the cover lies on the left, back face up. Now the
      // fade-in act — the left page cross-fades in over it.
      book.classList.remove("opening");
      book.classList.add("is-open", "just-opened");
      setTimeout(() => book.classList.remove("just-opened"), 700);
    }, 1650); // just past the 1.6s ceremony
  };

  coverFront.addEventListener("click", () => openBook(false));
  coverFront.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openBook(false); }
  });

  // the book peeks above the fold on arrival; scrolling it (almost)
  // fully into view opens the cover — the second act of the
  // engagement that the falling leaves begin
  const opener = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting && live() && isClosed()) {
          setTimeout(() => openBook(false), 250);
          opener.disconnect();
        }
      }
    },
    { threshold: 0.92 }
  );
  opener.observe(book);

  /* ── init: deep links land on their spread, book already open ── */
  const target = idxFromHash(location.hash);
  setSpread(Math.max(0, target), false);
  if (target > 0) openBook(true);

  /* ── input ───────────────────────────────────────────────── */
  cornerNext.addEventListener("click", () => setSpread(current + 1, true));
  cornerPrev.addEventListener("click", () => setSpread(current - 1, true));

  window.addEventListener("keydown", (e) => {
    if (!live() || busy() || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); setSpread(current + 1, true); }
    if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); setSpread(current - 1, true); }
  });

  let touchX = null;
  book.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  book.addEventListener("touchend", (e) => {
    if (touchX === null || !live() || busy()) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 60) setSpread(current + (dx < 0 ? 1 : -1), true);
  }, { passive: true });

  // TOC + any in-page link to a spread: turn instead of scrolling (book mode)
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || !live()) return;
    const i = idxFromHash(a.getAttribute("href"));
    if (i < 0) return;
    e.preventDefault();
    openBook(true);
    setSpread(i, true);
  });

  window.addEventListener("hashchange", () => {
    const i = idxFromHash(location.hash);
    if (i >= 0 && live()) { openBook(true); setSpread(i, true); }
  });

  /* ── prompt slips copy themselves — they're meant to be pasted
     straight into the reader's own assistant ─────────────────── */
  document.querySelectorAll(".slip").forEach((slip) => {
    slip.addEventListener("click", () => {
      const p = slip.querySelector("p");
      if (!p || !navigator.clipboard) return;
      navigator.clipboard.writeText(p.innerText.replace(/\s+/g, " ").trim()).then(() => {
        slip.classList.add("copied");
        setTimeout(() => slip.classList.remove("copied"), 1400);
      });
    });
  });
})();
