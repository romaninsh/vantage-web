# Vantage 0.8

GraphQL joins the list of backends Vantage can talk to. Point a datasource at a GraphQL endpoint
and the rest of the admin — grids, sort, search, right-click drilldowns — just works.

## What's new

- **GraphQL datasources.** A new `type: graphql` option alongside SQLite, Postgres, SurrealDB, REST
  and the AWS pair. Set `url:` to your endpoint, pick a `dialect:` (`generic` for flat-argument
  schemas like the public SpaceX API, `hasura` for Hasura-style `where: { _eq: … }` arguments), and
  optionally override the filter argument name or send an auth header. Tables on a GraphQL
  datasource read like any other Vantage table — the GraphQL root field is just the table's name.
- **GraphQL in the datasource dialog.** The "New datasource" / edit dialog lists GraphQL as a
  first-class type and prompts for the endpoint URL, so you don't have to hand-author the YAML.
- **Bundled SpaceX example inventory.** A new `spacex/` project ships with the app: ten entities
  (Launches, Rockets, Missions, Payloads, Capsules, Cores, Dragons, Ships, Landpads, Launchpads)
  against the public SpaceX GraphQL fixture, with status-chip colours, tooltips, and right-click
  drilldowns wired in. Useful both as a smoke test and as a worked example for your own GraphQL
  schemas.
