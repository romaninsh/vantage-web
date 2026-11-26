# Vantage 1.8

The same project can run against your local database and your production one: each profile in
`application.yaml` names its own env file, and a selector by the settings cog switches between
them. 1.8.1 taught agents to put the API and its web frontend online, as a Docker image on Google
Cloud Run with a MongoDB Atlas database.

## What's new

- A datasource's `${secret.…}` reads the active profile's env file, and `${profile.<key>}` reads
  its other lines.
- With two or more profiles, the title bar shows the active one; the choice is remembered per
  project. `VANTAGE_PROFILE` no longer picks it.
- A secret the active env file doesn't set names that file in its error.
- Fix: a new web frontend failed to install with `ENOENT … vendor/…`.
- Fix: a project's stack failed to start with `exited (128)` after its Docker network was removed.
  A failed stack command now shows Docker's own error.
- Fix: switching to another project could reopen the one you left.
- Fix: MongoDB filled the project's database log with health checks, about 600 lines a minute. New
  projects' health checks need Docker Engine 25 or later.
