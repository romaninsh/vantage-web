# Vantage 0.8

GraphQL joins the list of backends Vantage can talk to. Point a datasource at a GraphQL endpoint and
the rest of the admin — grids, sort, search, right-click drilldowns — just works.

## What's new

- **GraphQL datasources.** A new `type: graphql` option alongside SQLite, Postgres, SurrealDB, REST
  and the AWS pair. Set `url:` to your endpoint, pick a `dialect:` (`generic` for flat-argument
  schemas like the public SpaceX API, `hasura` for Hasura-style `where: { _eq: … }` arguments), and
  optionally override the filter argument name or send an auth header. Tables on a GraphQL
  datasource read like any other Vantage table — the GraphQL root field is just the table's name.
- **References column.** Tables that declare has-many relations grow a sticky leftmost `Open` column
  with one xsmall primary button per relation. Clicking a button opens the related model in a new
  tab filtered to that row — one click instead of right-click → menu pick. Declare extras with a
  top-level `has_many:` list on `table/*.yaml` so a single row can surface several related models
  side-by-side.
