# Vantage 0.4.1

Vantage now ships itself. New native macOS download with a built-in
auto-updater, plus the supporting release pipeline to keep shipping
cleanly going forward.

- **Built-in auto-update** — Vantage now checks for new releases shortly
  after launch, and on demand from *Vantage Admin → Check for Updates…*.
  When something newer is available, an arrow-down icon appears next to
  the feedback button in the title bar; clicking it downloads, verifies,
  and installs in place via `hdiutil` + `rsync`, then offers a one-click
  restart.
- **Live progress in the title bar** — the update icon morphs into a
  filling progress circle as the new build downloads, then keeps spinning
  while the new binary is unpacked over the running app. No more
  guessing whether anything is happening.
- **SHA256-verified updates** — every downloaded build is hashed and
  matched against the signed manifest before being installed; any
  mismatch aborts the install before the running app is touched.
- **Native Mac download from the website** — the *Download for Mac*
  button on the Vantage site is now wired to a live release manifest, so
  it always points at the most recent shipped build (with the version
  and SHA256 fingerprint shown next to it).
- **Sentry crash symbolication** — release builds now ship with a `dSYM`
  companion that's uploaded to Sentry on every release, so panic reports
  show real source locations instead of raw hex addresses.
- **Self-maintaining release notes** — these notes are generated from
  per-version files in `app/resources/changelog/` at build time, so the
  in-app "What's new" view never falls out of sync with the actual
  release contents.
