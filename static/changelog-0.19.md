# Vantage 0.19

Records can carry a custom **Summary** tab now — a read-only dashboard you lay out in YAML and bind
to the selected row. The launch-control example uses it to show a launch coming together live: a
countdown to liftoff, then real-time ascent telemetry that keeps moving between server updates.

## What's new

- **Custom Summary tabs.** A page can now add a read-only tab you design yourself — headings, stats,
  status badges, progress bars, a countdown, and lists of related rows, arranged in columns and bound
  to the row you've selected. It sits alongside the usual Details and relation tabs, and a single bad
  field shows a small inline error instead of taking down the whole tab.
- **Live, to the second.** The tab refreshes itself as its data changes, and timed elements keep
  moving on their own between updates: a countdown ticks down smoothly, and live readouts — speed,
  altitude, downrange — carry forward so the numbers climb in real time instead of jumping each time
  the server reports a new value.
- **Related rows, inline.** A tab can list a record's related rows — the crew on a launch, the
  payloads on a flight — each as a little row of labels and badges that updates as that data changes.
- **Friendly units.** A number with a unit now reads the way you'd say it — 26,500 kg shows as
  26.5 t, 6,400 m as 6.4 km — instead of a wall of digits.
