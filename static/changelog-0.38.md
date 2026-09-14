# Vantage 0.38

One scripting engine behind every script in your YAML: bindings, guards, labels, actions,
workers and the data layer's query builders all run the same way, on the same rules.

## What's new

- **Binding scripts read the page directly.** A script names what it needs —
  `scenery("order").where("bakery", bakery.value)` — instead of quoting it as
  `"${bakery.value}"`. Existing pages need the quotes removed: a quoted read now compares
  against that literal text.
- **A long script can live in its own file.** Write `worker: !include import.rhai` (or
  `!include part.yaml` to splice YAML) and keep the file next to the one that names it. It
  cannot reach outside the project, and editing it reloads the page like editing the YAML.
- **List rows are templates.** A list's `text:` and `label:` are ordinary text with
  `${ … }` holes — `'${ member + "  ·  " + share }'` — the same shape every label uses. A
  bare expression (`text: member`) needs the wrapper now.
- **Braces inside a hole just work.** `${ if x > 1 { "many" } else { "one" } }` is one hole;
  so is a `#{ text, color }` map.
- **A runaway script stops.** Every script has a budget — small on the UI thread, larger for
  workers and actions — so an accidental infinite loop ends with an error in the log instead
  of a frozen window.
- **Editor help.** The bundled schemas mark every scripted field, and a `# language=rhai`
  comment above a script block gives JetBrains and VS Code Rhai highlighting inside the YAML.
- Removed, none of them used by any project: column `render:`, `copy:`, `expr:` and `lazy:`,
  table `expressions:` and `unit: { rhai: … }`, and a reference's `rhai:`. The builder skill
  points at the table-side alternatives.
