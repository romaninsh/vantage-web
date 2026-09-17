# Vantage 0.33

Vantage has always kept itself up to date; the apps you open inside it did not. A change someone
made this morning reached you only if they sent a link and you installed over the top of what you
had. An installed app now remembers where it came from and fetches its own updates. On enterprise
builds it checks when you open it — a short "checking for updates" screen with an Open anyway button
if you'd rather not wait — and every ten minutes after that. The update button in the title bar
swaps the changed files underneath the running app, so pages redraw where they stand and nothing
restarts.

## What's new

- The apps under "Open an example" are fetched when you open the picker, so newly published ones
  appear without waiting for a new Vantage. Offline you get a short built-in list.
- Re-installing an app replaces only the published files. A local database, a `.env`, installed
  skills are left alone, and Vantage names any published file you had edited and asks before
  overwriting it.
- Enterprise builds carry their own name in the window, Dock and About box, their own icon, their
  own update channel, and a settings folder of their own, so they sit beside a standard Vantage
  without either disturbing the other.
- An action can declare its dialog in YAML as before and on confirm run a routine compiled into the
  app, and a build can carry a model written in Rust whose tables screens use with no table file
  describing each one.
