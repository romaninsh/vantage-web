// Motion for the blog's `blog.carousel` component.
//
// Cards ride a 3D ring. The ring's speed depends on where the cards are: as a
// card passes the front it slows to a tenth of full speed so it can be read,
// then the ring picks up again. On top of the shared path each card wanders on
// its own (a bob, a drift towards or away from you, a slight tilt and roll),
// seeded per card so no two move alike. The front card lifts out and grows
// from its top edge, where screenshots keep their content.
//
// The vertical perspective follows the carousel's position in the window, so
// scrolling gives the cards behind a little parallax.
//
// Without JavaScript, or with reduced motion requested, the CSS leaves the
// cards standing still on the ring.

(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const TAU = Math.PI * 2;
    const SLOW = 0.1;          // speed at the front, as a share of full speed
    const SLOT_SECONDS = 6;    // average time to move one slot round the ring
    const ZOOM = 1.45;         // scale of the card at the front
    const LIFT = 0.2;          // how far the front card comes out, in card widths
    const GAP = 0.2;           // extra ring radius, in card widths, so cards don't touch

    // Small deterministic generator, so a card's wander is the same each visit.
    function seeded(seed) {
        let s = seed * 9301 + 49297;
        return () => {
            s = (s * 9301 + 49297) % 233280;
            return s / 233280;
        };
    }

    function wander(i) {
        const r = seeded(i + 1);
        const pick = (lo, hi) => lo + (hi - lo) * r();
        return {
            bob: [pick(5, 9), pick(0.5, 0.9), pick(0, TAU), pick(2, 4), pick(1.3, 1.9), pick(0, TAU)],
            depth: [pick(8, 18), pick(0.3, 0.6), pick(0, TAU)],
            tilt: [pick(0.8, 1.6), pick(0.4, 0.8), pick(0, TAU)],
            roll: [pick(0.5, 1.2), pick(0.3, 0.7), pick(0, TAU)],
        };
    }

    function start(carousel) {
        const ring = carousel.querySelector(".carousel-ring");
        const cards = Array.from(ring.children).filter((el) => el.tagName === "FIGURE");
        const n = cards.length;
        if (n < 2) return;

        const step = TAU / n;
        // Full speed chosen so that one slot takes SLOT_SECONDS on average; the
        // speed curve below averages (1 + SLOW) / 2 across a slot.
        const fullSpeed = step / (SLOT_SECONDS * (1 + SLOW) / 2);
        const moods = cards.map((_, i) => wander(i));

        let phase = 0;
        let speedScale = 1;   // eases to 0 while hovered
        let hovered = false;
        let originY = 15;     // perspective origin, in percent
        let last = 0;
        let running = false;

        carousel.addEventListener("pointerenter", () => (hovered = true));
        carousel.addEventListener("pointerleave", () => (hovered = false));

        function frame(now) {
            if (!running) return;
            const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
            last = now;
            const t = now / 1000;

            // Slow down whenever a card is near the front: sin² across a slot is
            // 0 at the front and 1 halfway between cards.
            speedScale += ((hovered ? 0 : 1) - speedScale) * Math.min(dt * 4, 1);
            const between = Math.sin((phase / step) * Math.PI) ** 2;
            phase += fullSpeed * (SLOW + (1 - SLOW) * between) * speedScale * dt;

            const width = ring.offsetWidth;
            // The extra fifth of a card width keeps neighbours' corners apart,
            // even while they wander.
            const radius = width / 2 / Math.tan(Math.PI / n) + width * GAP;

            cards.forEach((card, i) => {
                const angle = i * step - phase;
                const front = ((Math.cos(angle) + 1) / 2) ** 6;   // 1 at the front, near 0 elsewhere
                const calm = 1 - 0.6 * front;                     // wander less while being read
                const m = moods[i];

                const bob = calm * (m.bob[0] * Math.sin(t * m.bob[1] + m.bob[2]) + m.bob[3] * Math.sin(t * m.bob[4] + m.bob[5]));
                const depth = calm * m.depth[0] * Math.sin(t * m.depth[1] + m.depth[2]);
                const tilt = calm * m.tilt[0] * Math.sin(t * m.tilt[1] + m.tilt[2]);
                const roll = calm * m.roll[0] * Math.sin(t * m.roll[1] + m.roll[2]);
                const scale = 1 + (ZOOM - 1) * front;

                card.style.transform =
                    `rotateY(${angle}rad) translateZ(${radius + LIFT * width * front + depth}px) ` +
                    `translateY(${bob}px) rotateX(${tilt}deg) rotateZ(${roll}deg) scale(${scale})`;
                card.style.filter = `brightness(${0.55 + 0.45 * front})`;
            });

            // Parallax: look down on the ring from higher up as it rises in the
            // window, and from lower down as it sinks.
            const box = carousel.getBoundingClientRect();
            const offset = (box.top + box.height / 2 - window.innerHeight / 2) / window.innerHeight;
            const target = Math.max(-30, Math.min(60, 15 - offset * 70));
            originY += (target - originY) * Math.min(dt * 6, 1);
            carousel.style.perspectiveOrigin = `50% ${originY}%`;

            requestAnimationFrame(frame);
        }

        new IntersectionObserver((entries) => {
            const visible = entries.some((e) => e.isIntersecting);
            if (visible && !running) {
                running = true;
                last = 0;
                requestAnimationFrame(frame);
            } else if (!visible) {
                running = false;
            }
        }).observe(carousel);
    }

    function init() {
        document.querySelectorAll(".carousel:not([data-moving])").forEach((c) => {
            c.dataset.moving = "";
            start(c);
        });
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
})();
