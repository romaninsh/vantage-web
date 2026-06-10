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
})();
