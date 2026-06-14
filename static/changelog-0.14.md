# Vantage 0.14

A real terminal lands in Vantage. The old log viewer was a line-by-line text box that couldn't keep
up with anything fancier than plain lines — colored output, progress bars that redraw in place, or
screens that clear and repaint all came out garbled. The new terminal is the real thing: it
understands the same escape codes your shell does, so output looks exactly as it would in a
terminal, and you can scroll back through a long history without it choking.

## What's new

- **Read-only terminal viewer.** A proper VT terminal you can drop into a dialog. ANSI colors, bold
  and underline, in-place redraws (`\r`), and full-screen repaints all render correctly. Scroll back
  through a long history with the wheel, the scrollbar, or PageUp/PageDown/Home/End, and jump
  straight to the latest output. Drag to select text and it's copied to your clipboard. A "new
  output" pill appears when fresh lines land below where you've scrolled.

- **Logs now run through the terminal.** The app log panel (the title-bar Feedback button) and any
  page log view — including CloudWatch log events — now render in the new terminal instead of the
  old line box. Colors, progress redraws, and long wrapped lines all come through, and new lines
  stream in and stick to the bottom as they arrive.

- **Run a command from a button.** A new kind of action opens a dialog showing a description, the
  exact command (in a monospace box you can copy), and a live terminal. Hit **Run** and the command
  executes in a real terminal session — so its colors, spinners, and progress bars all work — with
  output streaming in. **Stop** sends Ctrl+C (the program can catch it); **Stop** again kills it.
  Press Esc to do the same, or to close once it's finished. Try it on the Products page in the
  surreal-bakery example: **Bake muffins**.

- **Tables fill in as they load.** Drill into a big table and it shows up right away with
  not-yet-loaded rows dimmed, then fills them in on its own — no blank grid, and no nudging the
  mouse to make new rows appear.

## 0.14.2

- **Stacked-area charts.** A new `stacked_area` chart type stacks multiple series into cumulative
  bands. Drop `labels: false` to suppress axis text for dense dashboard tiles.
- **Fix:** terminal action dialog no longer clips the run button when the command is long.
- **Fix:** `${row.*}` placeholders now interpolate in terminal actions' command, args, cwd, and
  description.

## 0.14.3

- **Custom tab titles.** A page can now set a `tab_title:` template, so a drilled-into tab shows a
  flat, data-driven label instead of a `Parent → Child` breadcrumb. `${row.*}` fills in values from
  the row you drilled from — e.g. a deployments tab that reads `Deployments: acme-flights`.
