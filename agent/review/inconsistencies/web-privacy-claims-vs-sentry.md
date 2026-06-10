# "No data leaving your machine" contradicted by always-on Sentry telemetry

- **Severity:** critical
- **Category:** inconsistencies
- **Location:** `content/_index.md:7`

The hero subhead promises "No cloud, no lock-in, no data leaving your machine", and the features page repeats "Local & private — Your app, data and config never leave the box" (`themes/vantage/templates/features.html:253-255`). The shipped app initialises Sentry unconditionally in `main()` (`vantage-ui/crates/app/src/main.rs:107`) with `send_default_pii: true`, and `sentry_ctx::set_page_attachments` uploads page, table and datasource YAML — files that contain live connection credentials — to Sentry's EU cloud. As written, the site's central privacy claim is verifiably false for the current build, which is exactly the overclaiming the positioning doc warns this audience punishes.

```
hero_subhead = "… No cloud, no lock-in, no data leaving your machine."
-- features.html --
<h6 class="mb-1">Local &amp; private</h6>
<p class="text-muted small mb-0">Your app, data and config never leave the box.</p>
-- vantage-ui crates/app/src/main.rs:107 --
let _sentry_guard = sentry::init((
    "https://c38da4d…@o45113….ingest.de.sentry.io/45113…",
    sentry::ClientOptions { send_default_pii: true, … }
```

**Recommendation:** Either make telemetry opt-in (and stop attaching datasource YAML) before launch, or soften the copy now: e.g. "your data stays in your own datasources" plus an honest "anonymous crash reporting (can be disabled)" note. Do not ship "no data leaving your machine" while always-on Sentry uploads config with credentials.
