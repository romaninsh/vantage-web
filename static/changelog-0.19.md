# Vantage 0.19

A record can carry a custom Summary tab: a read-only dashboard you lay out in YAML and bind to the
selected row, sitting alongside the usual Details and relation tabs. Headings, stats, status badges,
progress bars, a countdown and lists of related rows, arranged in columns — and a single bad field
shows a small inline error rather than taking down the whole tab. The launch-control example uses it
to show a launch coming together live.

## What's new

- The tab refreshes as its data changes, and timed elements keep moving between updates: a countdown
  ticks down smoothly, and readouts for speed, altitude and downrange carry forward so the numbers
  climb instead of jumping each time the server reports.
- A tab can list a record's related rows — the crew on a launch, the payloads on a flight — each as
  a row of labels and badges that updates as that data changes.
- A number with a unit reads the way you'd say it: 26,500 kg as 26.5 t, 6,400 m as 6.4 km.
