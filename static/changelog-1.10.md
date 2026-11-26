# Vantage 1.10

A project's API can now serve partners and AI agents, not only its own web page. `kind: rest`
serves your tables as plain HTTP and JSON, with an OpenAPI document, API keys you issue by editing
a table, and a rate limit per caller. Any API can also serve itself over MCP, so an agent reads and
changes data under the same rules as the page.

A session no longer needs a sign-in. With `session: { anonymous: true }` every visitor gets one,
which is what a share-link site needs: anyone with the link reads the record, and only whoever
unlocked it with its key may edit it.

## What's new

- A REST API runs from the Services panel and can check an `X-Api-Key` header against a key table
  that only this app can open.
- `mcp: {}` in an API file serves it as an MCP server on its own port, or at `/mcp` on the API's
  port. The Services panel shows its URL.
- Session fields can be lists, an API entity can be served by id only, and an action takes
  `rate_limit:`.
- When a nested script action throws, the button shows the innermost script's message, not a chain
  of errors. The full chain still goes to the log.
- Scripts can page through a table: `table("item").sort("name").offset(25).limit(25)` reads the
  second 25 rows.
- The agent can test a script action from a script instead of pressing a button on a hidden page.
- Fix: a Cloud Run redeploy written by the agent answered 429 while the server connected its
  datasources.
