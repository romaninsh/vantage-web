# Vantage 0.33

Vantage has always kept itself up to date. The apps you open inside it did not: a change someone
made this morning reached you only if they sent you a link and you installed over the top of what
you had. An installed app now remembers where it came from, so it can fetch its own updates — and
the list of apps you can install comes from the web rather than being fixed when your copy was
built.

## What's new

- **The example list is live.** The apps under "Open an example" are fetched when you open the
  picker, so newly published ones appear without waiting for a new Vantage. Offline, you still get
  a short built-in list.
- **Installed apps update themselves.** On enterprise builds, an app checks for a new version when
  you open it — a short "checking for updates" screen with an **Open anyway** button if you'd
  rather not wait — and again every ten minutes while you work. When there's an update, the
  familiar update button appears in the title bar; clicking it swaps the changed files underneath
  the running app, so pages redraw where they stand and nothing restarts. Whoever writes your
  screens can push a fix to everyone at once.
- **Re-installing an app updates it instead of wiping it.** Only the published files are replaced.
  Anything you or your agent added alongside them — a local database, a `.env`, installed skills —
  is left alone. If you'd edited one of the published files yourself, Vantage names those files and
  asks before overwriting them.
- **Enterprise builds have their own identity.** A custom name in the window, Dock and About box,
  a custom icon, a settings folder of their own so they sit beside a standard Vantage without
  either disturbing the other, and their own update channel.
- **A form can hand off to built-in code.** An action declares its dialog in YAML as before, and on
  confirm runs a routine compiled into the app — for work that belongs in code rather than in a
  script.
- **Compiled-in models can serve tables.** A build can carry a model written in Rust and offer its
  tables to the app directly, so screens can use them without a table file describing each one.
