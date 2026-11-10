# Vantage UI Website

Static site for [vantage-ui.com](https://vantage-ui.com), built with
[Zola](https://www.getzola.org/) and [Tailwind CSS v4](https://tailwindcss.com/)
(standalone CLI — no Node project).

## Local Development

1. **Install tools**

   ```bash
   brew install zola tailwindcss
   ```

2. **Run locally**

   ```bash
   make dev
   ```

   This runs the Tailwind CLI in watch mode and `zola serve` together.
   Site will be available at `http://127.0.0.1:1111`.

3. **Production build**

   ```bash
   make build   # tailwindcss --minify + zola build → public/
   ```

## Snapshots

`make snapshots` captures full-page screenshots of all pages at desktop
(1440px) and mobile (390px) widths using Playwright. Use
`BASE_URL=http://127.0.0.1:1111 OUT_DIR=snapshots/local make snapshots`
to capture a local build.

## Analytics

The Google tag (`google_tag_id` in `config.toml`) is only emitted when the
build runs with `SITE_ENV=production`, as `deploy.yml` does. `zola serve`
and local builds send nothing: `static/js/analytics.js` logs each event to
the browser console as `[ga] event_name {params}` instead.

Every event carries `content_group`, the first path segment (`home`, `blog`,
`solutions`, `examples`, `download`, …), set in base.html's `gtag('config')`.

| Event | Params | Fired by |
|---|---|---|
| `download_click` | `channel`, `version`, `os` | the stable and nightly buttons on /download/ |
| `cta_click` | `cta`, `location` (hero, nav, footer, section) | main buttons on home, solutions, features, library, example pages, nav, footer |
| `example_open` | `example`, `link_url` | links to `/examples/<slug>/`, "Open in Vantage" (`vantage://`) and source links |
| `form_start` | `form` | first focus in the enterprise lead form |
| `generate_lead` | `method` (`form`, `mailto_fallback`) | enterprise lead form result (`vantage:lead` event from enterprise-lead.js) |
| `changelog_open` | `version` | a user opening a changelog entry on /download/ |
| `screenshot_view` | `caption` | a changelog screenshot opening in the lightbox |
| `section_view` | `section`, `page_path` | each `h2[id]` / `section[id]` first entering the viewport |
| `scroll_depth` | `percent` (25, 50, 75, 90) | scrolling, once per mark per page |

A click event needs no JS: put `data-track` on the link or button and one
`data-track-*` attribute per param (kebab-case becomes snake_case):

```html
<a href="/download/" data-track="cta_click" data-track-cta="download" data-track-location="hero">
```

From a script, call `window.vantageTrack("event_name", { … })`.

In GA Admin, mark `download_click` and `generate_lead` as key events
(Data display → Events), and register `channel`, `version`, `example`,
`section` and `cta` as event-scoped custom dimensions (Data display →
Custom definitions) so explorations can use them.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`: Tailwind +
Zola build, sync to the `vantage-ui.com` S3 bucket, then CloudFront
invalidation. The workflow file must keep its name — vantage-ui's
nightly release workflow triggers it by filename to refresh the nightly
download manifest.
