# Vantage 0.5

Vantage UI gets serious about working with AI coding agents: an embedded MCP server, a "Set up with
AI" project wizard, and a feedback loop that lets agents leave you notes (and you forward them, with
logs, in one click).

## What's new

- **"Set up with AI" wizard.** A first-run flow that walks an agent through scaffolding a new
  project, dropping bundled _skills_ (markdown instructions plus YAML schemas) that teach any agent
  following the [agentskills.io](https://agentskills.io) convention how to author Vantage configs.
- **Embedded MCP server.** Vantage UI exposes a local MCP endpoint so coding agents (Claude Code,
  Cursor, anything that speaks MCP) can introspect your project's datasources and config without
  leaving the editor.
- **Log viewer + one-click feedback.** Browse the app's structured logs in-app and attach them to a
  "Send feedback…" message so bug reports don't need a separate `tail -f`.
- **Datasource hot-reload.** Edit a YAML datasource and the connection rebuilds in place — no app
  restart.
- **Update channels behave properly.** Stable builds offer stable updates; nightly builds offer
  nightly updates. The auto-updater uses the version reported by the running binary instead of
  guessing.
- **Nightly icon variant.** Nightly builds get a distinct icon so they don't get confused with
  stable in your dock.
- **Privacy: error reports redact datasource credentials.** Sentry reports no longer carry
  connection strings, hostnames or credentials from your datasources.
- **Fix: SurrealDB form values round-trip cleanly.** Forms backed by SurrealDB no longer fail
  deserialization for tagged CBOR values.

## 0.5.1

- SurrealDB option in the "Set up with AI" wizard, with a bundled skill that walks the agent through
  `INFO FOR DB` / `INFO FOR TABLE` introspection and the YAML mappings for record-link relations.

## 0.5.2

- The "Send feedback…" dialog now picks up `FEEDBACK.md` from the project root. Tick _Include
  feedback from the agent_ to ship the agent's notes alongside your own; _View agent feedback_ pops
  a larger viewer so you can read it first. Sent contents are deleted from disk.
- The bundled `vantage-ui-builder` skill (now 1.3.0) tells the agent to drop UX, validator and
  schema suggestions into `FEEDBACK.md` as it works, under a `# Vantage Admin <version>` header.
- Bundled skills install under `.agents/skills/` instead of `.claude/skills/`, so they're picked up
  by any agent following the [agentskills.io](https://agentskills.io) convention.
- Opening or switching to a project refreshes any installed skills whose embedded version has moved
  on, and tops up missing skill folders for datasources you added by hand. Gated on `AGENTS.md`
  being present at the project root, so projects that never ran the wizard stay untouched. Skills
  you've edited are left alone; on-disk versions newer than embedded are never downgraded.
