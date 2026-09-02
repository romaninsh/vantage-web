# Vantage 0.37

## What's new

- **Wizards.** An action can now be a multi-step dialog: `kind: wizard` with a list of steps, each
  one an ordinary page body — pick a file, check a preview grid, fill in a form. A step rail on
  the left shows where you are; Back keeps what you typed; Cancel anywhere leaves nothing behind,
  because nothing is saved until you say so.
- **Steps that work while you watch.** A step can run a `worker` script in the background beside
  its page: the page shows the step's variables live, so a long import moves a progress bar row by
  row instead of freezing the dialog, with the figures beside it ("1,240 / 5,000"). A worker can
  wait for you — "Start import" — and Cancel really stops it, mid-import, leaving whatever had
  already been written. A failure holds the step and offers Retry, keeping the log of the attempt
  that failed.
- **Import a CSV.** The new `csv_file` step component opens a file picker and turns the file into a
  table you can preview and import from — arbitrary columns, ids taken straight from a column of
  your choice (leading zeros survive), and a duplicate code in the file is refused, by line number,
  before anything is written. `tables.<name>.import_values(...)` maps rows onto records and reports
  what it did: how many were created, how many were already there (never overwritten), and whether
  you stopped it.
- **Buttons, progress bars and logs on pages.** Three new page components: `button` runs a short
  script on click (flip a flag, set a value), `progress` draws a bar over two live values, and
  `log` shows timestamped lines as they arrive, newest kept in view unless you have scrolled up to
  read something.
- **Forms over a shared draft.** A wizard can hold an unsaved record that several steps edit
  (`servo:` on a form); `params.fields` picks which columns each form shows. A form's Enter can
  run an `on_submit:` script instead of saving, and such a form no longer shows a Save button of
  its own — the wizard's Next is the save.
- Fix: a save that the database rejects now tells you why ("Expected `int` but found `NONE`")
  instead of "default write failed".
- Fix: actions opened after signing in could report every table as offline.
- Fix: on a new record, picking a related row stored its id as text instead of a link, and a date
  set by a script was stored as nothing at all.
- Fix: closing a wizard with the Escape key left its background work running.
