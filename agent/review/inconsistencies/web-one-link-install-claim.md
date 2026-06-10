# "One link installs Vantage and pulls the app" contradicts the examples page's "coming soon" handler

- **Severity:** medium
- **Category:** inconsistencies
- **Location:** `content/solutions/internal-tools-teams.md:50`

The internal-tools share flow presents, as a today-capability, "The team opens it — One link installs Vantage and pulls the app from GitHub." The examples page and template state the opposite: "One-click `vantage://` open straight from this page is on the way" and the "Open in Vantage UI" button is rendered disabled with the tooltip "One-click open is coming soon (vantage:// handler)" (`themes/vantage/templates/macros/blocks.html`). Two pages describing the same mechanism disagree on whether it ships — and the positioning doc's rule is to tag features Now/Coming soon honestly.

```
<h4>The team opens it</h4>
<p>One link installs Vantage and pulls the app from GitHub. Each person
authorizes their own database connection — and they're in.</p>
-- examples.html --
One-click <code>vantage://</code> open straight from this page is on the way.
```

**Recommendation:** Rewrite step 3 to match reality ("clone the repo and point Vantage at the folder — one-link open is coming") or add a "soon" tag like the developers page journey uses for roadmap steps.
