# Vantage 1.9

A preview of an agent chat panel now docks at the right of the window, so you can ask a coding
agent about your project without leaving it. Claude Agent is there by default: the first time you
open the panel, Vantage downloads what the agent needs, with nothing to install yourself. If the
agent asks you to log in, the login runs inside the panel. The agent starts in the project folder
and can read the page you have open, run data scripts and read logs through Vantage's own MCP
server.

## What's new

- Toggle the panel with the title-bar button or Cmd-Shift-A. The first open shows the download's
  progress; later opens start straight away, even offline. Pick another agent, such as Codex, with
  `agent.selected` in `settings.json`, or add an `agent.custom` entry for any Agent Client
  Protocol command you already have and select it. The Set up with AI screen now points at the
  panel first, with your own editor as an option.
- Replies stream in as they are written. File edits show as diffs, the agent's plan as a
  checklist, and `/compact` as a divider. Pick the agent's mode and model under the message box.
  When the agent asks for permission or a login while the panel is closed, the toggle shows a
  dot, and the Dock icon bounces if Vantage is in the background. Closing the panel mid-turn
  leaves the agent running. Esc stops the current turn. If the agent crashes, the panel shows the
  reason and a Restart button.
- Type `@` in the message box to complete project files and skills, and `/` to list the agent's
  commands.
- Dialogs and sheets stay clear of the panel, so you can keep using it while one is open.
- Conversations are saved per project. Pick an earlier one under Threads in the panel header;
  Claude Agent picks up where it left off, after a restart too. Switching profiles keeps the same
  list.
- The agent in the panel knows Vantage's skills from its first message, so it can start a new
  project or add a page the Vantage way.

## 1.9.1

- Long agent conversations scroll and resize smoothly, and the panel no longer pulls you back to
  the bottom while you are reading an earlier reply.

## 1.9.2

- When an agent crashes, the panel now shows its last messages before the error instead of
  dropping them.

## 1.9.3

- A project's `refs/` folder stays out of git and out of app sync.

## 1.9.4

- Claude Agent in the panel loads Vantage skills as its own skills, without a permission prompt,
  instead of reading their files. When you name a file it can't find in the project, it asks
  where it is instead of searching your computer.

## 1.9.5

- Drag files or folders from Finder onto the agent panel, or pick them from the new + button
  by the message box, to add them to your message. Each one shows as a chip above the text
  box; the agent gets a link to it, not its contents.
- Files from outside the project can be copied into the project's `refs/` folder or
  referenced where they are; a drop asks which each time.

## 1.9.6

- The libraries Vantage uses for secure connections (TLS, certificates, HTTP/2) are updated to
  versions with published security fixes.

## 1.9.7

- A service added to `composer.yaml` while the stack runs now starts and shows in the Services
  sheet; a removed one stops, and a changed one is marked until you restart it.

## 1.9.8

- After a project switch, the title bar names the open project, not the one the app started with.
- Going back to Welcome stops the previous project's services, APIs and menu-bar pages.
- A profile switch waits for a project switch to finish, and isn't offered on Welcome.

## 1.9.9

- Leaving a project now stops everything it started before the next screen opens: the agent,
  background jobs, frontend dev containers, APIs and services. Switching projects, Welcome,
  Cmd-Q and the window's close button all do this; the close button now waits for the project
  to stop, then quits. If stopping takes more than a second, a card lists what is still running,
  with Force quit and then Don't wait.
- Opening a project always starts its services, including the first open. Picking the open
  project from the switcher does nothing.

## 1.9.10

- After you close a project or go to Welcome, MCP tools, actions, the feedback form, saved column
  widths and filters no longer act on the closed project.

## 1.9.11

- On Welcome, Project Settings, Secrets and the other project tools in the title bar no longer
  open the project you just closed.

## 1.9.12

- Switching, going to Welcome or quitting while a project is still opening now closes it like an
  open one: its connect is cancelled and its tasks stop.

## 1.9.13

- The agent panel belongs to its project: a switch ends the old project's agent and opens a fresh
  panel over the new project's conversations. Whether the panel is open carries across Welcome.

## 1.9.14

- Pinned tabs come back when you reopen a project; unpinned tabs don't, and with nothing pinned
  the first page opens. A switch no longer leaves the old project's layout behind.

## 1.9.15

- Relative dates read the same everywhere: `3 days ago` in a wide column, a label or a record
  view, `3 d ago` in a column under 120 px. Add `freshness: true` beside `render: relative` to
  colour a date by age.
- Fix: SurrealDB dates showed as `1791200315, 0` in `render: relative` grid columns and blank in
  page headers.
- A `select` with `appearance: chips` takes `align: start`, `center` or `end` (the default) to
  place its chips in the row.
- A page `form` over a record of a table that takes updates edits it in place, with Save and
  Revert, instead of showing it read-only.
- A grid or crud row action with `triggers: { double_click: true }` runs when a row is
  double-clicked, so a double-click can open an edit dialog.
- Fix: with `log_changes:` on a SurrealDB project, changes saved but no audit entry was written,
  with "Expected `datetime`" in the log.

## 1.9.16

- Ask the agent for a pipeline and it sets one up on GitHub and Google Cloud: checks that run
  your app on every pull request, a deploy on every merge, and a deploy account that can only
  publish new versions of your own services, from a protected `main`.
- The agent can move a SurrealDB project to SurrealDB Cloud: it tells you what to create in the
  Cloud console, then loads your schema and data.
