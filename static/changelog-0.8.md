# Vantage 0.8

GraphQL joins the backends Vantage can talk to. Set `type: graphql` with your endpoint in `url:` and
pick a `dialect:` — `generic` for flat-argument schemas like the public SpaceX API, `hasura` for
`where: { _eq: … }` arguments. The rest of the admin works as it does anywhere else: grids, sort,
search, right-click drilldowns. The GraphQL root field is just the table's name.

## What's new

- You can override the filter argument name or send an auth header.
- A table that declares has-many relations grows a sticky leftmost `Open` column with a button per
  relation, which opens the related model in a new tab filtered to that row. A top-level `has_many:`
  list on `table/*.yaml` adds extras, so one row can surface several related models side by side.
