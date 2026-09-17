# Vantage 0.38

Every script in your YAML now runs on one engine — bindings, guards, labels, actions, workers and
the data layer's query builders, all on the same rules. What you see of that is scripts reading the
page directly: `scenery("order").where("bakery", bakery.value)` rather than quoting it as
`"${bakery.value}"`. Existing pages need the quotes removed, because a quoted read now compares
against that literal text. List rows became templates in the same move, so a list's `text:` and
`label:` are ordinary text with `${ … }` holes and a bare expression like `text: member` needs the
wrapper.

## What's new

- `worker: !include import.rhai` keeps a long script in its own file beside the YAML that names it;
  `!include part.yaml` splices YAML the same way. An included file can't reach outside the project,
  and editing it reloads the page.
- Braces inside a hole work: `${ if x > 1 { "many" } else { "one" } }` is one hole, and so is a
  `#{ text, color }` map.
- Every script has a time budget — small on the UI thread, larger for workers and actions — so an
  accidental infinite loop ends with an error in the log instead of a frozen window.
- The bundled schemas mark every scripted field, and a `# language=rhai` comment above a script
  block gives JetBrains and VS Code Rhai highlighting inside the YAML.
- Removed, none of them used by any project: column `render:`, `copy:`, `expr:` and `lazy:`, table
  `expressions:` and `unit: { rhai: … }`, and a reference's `rhai:`.
