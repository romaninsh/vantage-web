# Vantage 0.14

A real terminal lands in Vantage. The old log viewer was a line-by-line text box, so coloured
output, progress bars that redraw in place and screens that clear and repaint all came out garbled.
The new one understands the same escape codes your shell does: ANSI colours, bold and underline,
in-place redraws and full-screen repaints all render, you can scroll back through a long history
with the wheel or PageUp/PageDown, and dragging to select copies to the clipboard. The app log panel
and any page log view, CloudWatch events included, run through it.

## What's new

- A new kind of action opens a dialog with a description, the exact command in a box you can copy,
  and a live terminal. Run executes it in a real terminal session, so its colours and progress bars
  work; Stop sends Ctrl+C and Stop again kills it. Try Bake muffins on the Products page of the
  surreal-bakery example.
- Drill into a big table and it appears right away with not-yet-loaded rows dimmed, then fills them
  in on its own, with no blank grid and no nudging the mouse to make rows appear.

## 0.14.2

- `stacked_area` stacks multiple series into cumulative bands, and `labels: false` suppresses axis
  text on a dense dashboard tile.

## 0.14.3

- A page can set a `tab_title:` template, so a drilled-into tab reads `Deployments: acme-flights`
  rather than a `Parent → Child` breadcrumb. `${row.*}` fills in values from the row you came from.
