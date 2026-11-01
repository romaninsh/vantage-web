# Vantage 1.10

A project's API can now serve partners and AI agents, not only its own web page. `kind: rest`
serves your tables as plain HTTP and JSON, with an OpenAPI document, API keys you issue by editing
a table, and a rate limit per caller. Any API can also serve itself over MCP, so an agent reads and
changes data under the same rules as the page.

A session no longer needs a sign-in. With `session: { anonymous: true }` every visitor gets one,
which is what a share-link site needs: anyone with the link reads the record, and only whoever
unlocked it with its key may edit it.

## What's new

- An `api/<name>.yaml` with `kind: rest` and a `path:` runs from the Services panel. A `secret:`
  auth profile checks an `X-Api-Key` header against a key table that only this app can open.
- `mcp: {}` in an API file serves it as an MCP server on its own port; `mcp: { mount: main }`
  serves it at `/mcp` on the API's port. The Services panel and `api_status` show its URL.
- `session: { anonymous: true }` in `application.yaml` gives every caller without a token a session.
  Session fields can be lists (`session.add("plans", id)`), `api: { list: false }` serves an entity
  by id only, and an action takes `rate_limit:`.
- When a script action called with `actions.x()` throws, or calls another that does, the button
  that caught it gets the innermost script's words, not a chain of `actions.x: Runtime error: …`.
  The full chain still goes to the log.
- The agent can test a script action from `run_data_script` (`actions.add_target(#{ … })`) when
  "Allow MCP agents to write data" is on, instead of pressing a button on a hidden page.
- Cloud Run deploys the agent writes wait for `/v1/ready`, so a redeploy no longer answers 429
  while the server connects its datasources.
- The agent uses `random_int`, `random_string` and `uuid_v7` for public ids and keys instead of
  `generate_password`.
- Scripts can page through a table: `table("item").sort("name").offset(25).limit(25)` reads the
  second 25 rows.
