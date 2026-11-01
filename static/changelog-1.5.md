# Vantage 1.5

A record page can show its history in one place: `kind: activity` merges comments, field changes
and work logs into one live timeline, with a box to post a comment. A gauge button in the title bar
outlines slow widgets and says why each one repainted. Later patches added web frontends for APIs,
built in a container with no Node on your machine.

## What's new

- `kind: activity` merges several tables into one time-ordered feed, with tabs per source and
  folded runs of changes.
- The feed's `compose:` box posts a comment, completing names after `@` and `#`.
- Stat cards draw a trend line behind the value from `spark:` (an array or a scenery's rows),
  count to new values, and shrink to fit narrow widths.
- Grid and tree columns take `render: sparkline` with `series:` and `max:` for a small per-row
  trend.
- Fix: dashboards with charts redrew twice per step while the window was resized.
- Fix: a loading grid redrew itself every frame; its placeholder now pulses briefly, then rests.

## 1.5.1 — 2026-10-12

- Agents can give an API a web frontend in `web/<api>/`, with the new `vantage-web` and
  `vantage-client` skills.

## 1.5.2 — 2026-10-13

- A `web/<api>/` frontend builds in a Docker container started from its Web row in Services,
  with no Node on the machine; the open page reloads after each build.
- Agents open the frontend in your browser as they build it; until the first build lands, the
  page shows where to follow the build in Services.
- The container puts the `@vantage-ui/client` tarball in a new frontend's `vendor/` folder.
- `kind: script` actions run in the app, with a progress sheet for their `state:` and inputs
  that resume a `wait()`; `notify()` now shows a toast.
- On a new project, agents ask a few short questions first and fit a web frontend's style to
  its purpose.
