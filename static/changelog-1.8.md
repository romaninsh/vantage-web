# Vantage 1.8

One project can now run against your local database and your production one without editing a
file. Each profile in `application.yaml` names its own env file, and a selector next to the
settings cog switches between them; the window reconnects and every page reloads under the new
profile.

## What's new

- `profiles: { local: { env_file: .env }, prod: { env_file: .env.prod } }` in `application.yaml`
  now reaches datasources: `${secret.mongo_url}` reads the active profile's env file, and
  `${profile.<key>}` reads its other lines.
- With two or more profiles, the title bar shows the active one beside the settings cog. The choice
  is remembered per project.
- `VANTAGE_PROFILE` no longer picks the desktop's profile; the selector does.
- A secret the active env file doesn't set names that file in its error.
- API frontends' dev containers now pull `romaninsh/vantage-web-dev` from Docker Hub, tagged with
  this app's version (1.8.0), instead of `ghcr.io/atk4/vantage-web-dev` tagged by client version.
  `VANTAGE_WEB_DEV_IMAGE` still names any image.

## 1.8.1

- Agents can now put a project's API and web frontend online: a production profile, a Docker image
  on `romaninsh/vantage-server`, and Google Cloud Run with a MongoDB Atlas database.
- Dev containers pull `romaninsh/vantage-web-dev:1.8`, the release line, instead of the exact app
  version, so a patch release of the app doesn't wait for a new image.
- A new web frontend installs again: Vantage asked it to depend on `@vantage-ui/client` 0.4.3, but
  the 1.8 dev image carries 0.5.0, so its install failed with `ENOENT … vendor/…`. New frontends
  now get 0.5.0; existing ones keep the client they committed.
- A project's stack starts again after its Docker network was removed while it was stopped: the
  start used to fail every time with `exited (128)`; Vantage now recreates the containers once
  (volumes stay). A failed stack command now shows Docker's own error, not just the command line.
- Switching to another project no longer reopens the one you left. When the new project's services
  came up during the switch, the window reconnected the old project and dropped the new one; that
  reconnect now waits for the switch and then runs over the new project.
- A project's database log is readable again. The generated `composer.yaml` checked health every
  2 seconds, and MongoDB logged each check's connections in four lines (about 600 lines a minute).
  Health is now checked every second while a service starts and every 30 seconds after, and
  MongoDB runs with `--quiet`. Projects with an existing `composer.yaml` keep theirs. The checks
  need Docker Engine 25 or later.
