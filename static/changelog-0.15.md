# Vantage 0.15

Vantage has a secrets editor for your project's `.env`, opened from the title bar: variables with a
file description, per-variable notes, single- or multi-line values and masked secret fields. It
saves a standard `.env` that any dotenv loader reads, plus a committed `.env.example` that never
holds real values, and flags template keys you haven't filled in locally. A `cmd` datasource that
shells out to a script can read its keys and tokens from there.

## What's new

- The nightly build installs as Vantage Nightly next to the stable app instead of overwriting it,
  and keeps its own settings and recent-projects list.
- Pick a theme for the app, and tune chart colours on the chart itself with sliders for hue, spread
  and lightness. Copy as JSON saves what you land on, and a project-wide palette in your config
  gives every chart one scheme.
- A link on the website opens Vantage, downloads the example with a progress bar, shows you what's
  inside, asks you to trust the source, and installs it ready to open.
- Fix: the app crashed the first time you opened it on a new machine. Launching without a project
  drops you on the welcome screen.

## 0.15.1

- A `cmd` datasource that fails on something you did — opening its tab, hitting Refresh — now raises
  a toast naming it ("Problem with tfstate.") with a one-line summary, instead of hanging silently.
- Fix: a page that explicitly listed its id column had it dropped from the grid.
