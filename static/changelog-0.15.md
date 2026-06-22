# Vantage 0.15

Vantage gets a built-in secrets manager for your project's `.env`, and nightly now installs as its
own app alongside stable instead of replacing it.

## What's new

- **Manage project secrets in the app.** A new editor opens from the title bar for your project's
  `.env`: add variables with a file description, per-variable notes, single- or multi-line values,
  and masked secret fields. It saves a standard `.env` that any dotenv loader reads, plus a
  committed `.env.example` template that never holds real values, and flags template keys you
  haven't filled in locally yet. Handy for keeping credentials for internal tooling in one place —
  e.g. a `cmd` datasource that shells out to a script can read its keys and tokens straight from
  `.env`.
- **Nightly is its own app.** The nightly build installs as **Vantage Nightly** next to the stable
  app instead of overwriting it, and keeps its own settings and recent-projects list — the two no
  longer step on each other.
- **Themes and customizable chart colors.** Pick a look for the app, and tune chart colors right on
  a chart: a palette customizer with sliders for hue, spread, and lightness, plus **Copy as JSON**
  to save what you land on. Set a project-wide palette in your config so every chart shares one
  scheme.
- **Install examples in one click.** A link on the website now opens Vantage, downloads the example
  with a progress bar, shows you what's inside, asks you to trust the source, and installs it ready
  to open — no manual unzip-and-find-the-folder.
- **Fix:** the app no longer crashes the first time you open it on a new machine. Launching without
  a project now drops you on the welcome screen instead of quitting.
- **Fix:** nightly stopped nagging about an update that was already installed. It now offers an
  update only when a newer nightly actually exists.

## 0.15.1

- **Error toasts for broken datasources.** When a scripted (`cmd`) datasource fails on a manual
  action — opening its tab or hitting Refresh — you now get a toast naming it (e.g. "Problem with
  tfstate.") with a one-line summary, instead of a silent hang. Failures during background hydration
  stay in the row error state and the logs, so they don't spam toasts.
- **Fix:** a page that explicitly listed its id column had it silently dropped from the grid. The id
  now renders when you ask for it.
- **Fix:** Refresh on a two-pass (list + detail) datasource no longer wipes hydrated detail columns
  — only rows whose list fields actually changed get re-augmented, and the visible rows re-hydrate
  immediately.
