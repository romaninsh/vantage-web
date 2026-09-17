# Vantage 0.37

An action can be a multi-step dialog. `kind: wizard` takes a list of steps, each one an ordinary
page body — pick a file, check a preview grid, fill in a form — with a rail on the left showing
where you are. Back keeps what you typed, and Cancel leaves nothing behind, because nothing is saved
until you say so. A step can run a `worker` script beside its page and show the step's variables
live, so a long import moves a progress bar row by row with the figures next to it ("1,240 /
5,000") instead of freezing the dialog. Cancel stops it mid-import, leaving whatever had been
written; a failure holds the step and offers Retry. A later patch gave that worker a time ceiling,
so a runaway loop fails the step rather than keeping it busy forever.

## What's new

- The `csv_file` step component opens a file picker and turns the file into a table you can preview
  and import from. Ids come from a column of your choice and leading zeros survive; a duplicate code
  is refused, by line number, before anything is written. `tables.<name>.import_values(...)` reports
  how many records it created, how many were already there (never overwritten), and whether you
  stopped it.
- Three new page components: `button` runs a short script on click, `progress` draws a bar over two
  live values, and `log` shows timestamped lines as they arrive, keeping the newest in view unless
  you have scrolled up.
- A wizard can hold an unsaved record that several steps edit (`servo:` on a form), and
  `params.fields` picks which columns each form shows. Such a form has no Save button of its own —
  the wizard's Next is the save.
- Fix: a save the database rejects says why ("Expected `int` but found `NONE`") instead of "default
  write failed".
- Fix: actions opened after signing in could report every table as offline.
- Fix: on a new record, picking a related row stored its id as text instead of a link, and a date
  set by a script was stored as nothing at all.
- Fix: closing a wizard with Escape left its background work running.

## 0.37.1

- Fix: `${ if x { "a" } else { "b" } }` read only as far as the first `}`, so it never compiled and
  the value never appeared. Braces nest now, and a brace inside a quoted string counts as text.
- Fix: a failed expression pointed at the first line of the value rather than the spot that broke.
