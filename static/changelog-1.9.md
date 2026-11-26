# Vantage 1.9

An agent chat panel (a preview) docks at the right of the window, so you can ask a coding agent
about your project without leaving it. Claude Agent is the default and downloads itself on first
open; it starts in the project folder and reads the open page, data and logs through Vantage's own
MCP server.

Later 1.9 releases tied the panel to its project and made leaving a project stop everything it
started: the agent, background jobs, frontend dev containers, APIs and services. The agent also
learned to set up a GitHub and Google Cloud pipeline and to move a SurrealDB project to SurrealDB
Cloud.

## What's new

- Toggle the panel with the title-bar button or Cmd-Shift-A. Another agent, such as Codex, or any
  Agent Client Protocol command can be picked in `settings.json`.
- Replies stream in as they are written; file edits show as diffs and the agent's plan as a
  checklist. Esc stops the current turn, and a crashed agent shows the reason, its last messages
  and a Restart button.
- When the agent asks for permission or a login while the panel is closed, the toggle shows a dot
  and the Dock icon bounces.
- Type `@` to complete project files and skills, and `/` for the agent's commands. Drag files from
  Finder onto the panel, or use the + button, to attach them.
- Conversations are saved per project. Pick an earlier one under Threads; Claude Agent picks up
  where it left off.
- If stopping a project takes more than a second, a card lists what is still running, with Force
  quit and then Don't wait. Pinned tabs come back when you reopen a project.
- A service added to `composer.yaml` while the stack runs starts; a removed one stops.
- Relative dates read the same everywhere, and `freshness: true` colours a date by age. A row
  action can run on double-click, and a page form over an updatable record edits it in place.
- Fix: SurrealDB dates showed as `1791200315, 0` in relative-date columns.
- Fix: after a project switch, the title bar named the project the app started with.
