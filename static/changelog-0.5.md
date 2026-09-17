# Vantage 0.5

Vantage UI gets serious about working with AI coding agents. A first-run "Set up with AI" wizard
walks an agent through scaffolding a project and drops bundled skills — markdown instructions plus
YAML schemas — that teach any agent following the [agentskills.io](https://agentskills.io)
convention how to author Vantage configs. A local MCP endpoint lets Claude Code, Cursor or anything
else that speaks MCP introspect your project's datasources and config without leaving the editor.

## What's new

- Browse the app's structured logs in the app and attach them to a "Send feedback…" message, so a
  bug report doesn't need a separate `tail -f`.
- Edit a YAML datasource and the connection rebuilds in place, with no app restart.
- Stable builds offer stable updates and nightly builds offer nightly ones, and a nightly build gets
  its own icon so it isn't confused with stable in your dock.
- Error reports no longer carry connection strings, hostnames or credentials from your datasources.
- Fix: forms backed by SurrealDB failed to read tagged CBOR values.

## 0.5.1

- The "Set up with AI" wizard offers SurrealDB, with a bundled skill covering `INFO FOR DB` /
  `INFO FOR TABLE` introspection and the YAML mappings for record-link relations.

## 0.5.2

- The "Send feedback…" dialog picks up `FEEDBACK.md` from the project root. Tick _Include feedback
  from the agent_ to send the agent's notes with your own, or _View agent feedback_ to read them
  first; sent contents are deleted from disk. The bundled builder skill tells the agent to write its
  UX, validator and schema suggestions there as it works.
- Bundled skills install under `.agents/skills/`, so any agent following the
  [agentskills.io](https://agentskills.io) convention picks them up. Opening a project refreshes
  installed skills whose bundled version has moved on and tops up missing folders; skills you have
  edited are left alone.
