# Vantage 0.27

Columns can show more than what's stored — a value looked up from a related record, or worked out
on the fly — dates read the way people write them, and tap-to-copy on everything. Dashboards gained
trend badges and charts that shrink to fit, and hosted SurrealDB Cloud connects out of the box.

## What's new

- **Columns that look things up.** A table column can now show a value from a related record — a
  batch's name beside each tag, a course name beside each booking — or a value worked out from the
  row, without storing it in your database. Works on SurrealDB, SQL, and REST datasources.
- **Dates you can actually read.** Timestamps in summary and detail views render in a friendly,
  human form — "2 days ago", "15 Jul 14:32" — instead of raw machine strings.
- **Copy anything.** Every value is selectable, double-click copies the whole thing, and a small
  copy icon sits next to the ones you reach for most — with a quick "Copied to clipboard" to
  confirm.
- **Trend badges on your stats.** A dashboard stat can show how it's moved recently — a green "+3"
  or red "−2" beside the number, with a tooltip explaining the window — so a KPI tells you
  direction at a glance, not just today's count.
- **Charts that stay put.** Pie and donut charts shrink to fit their tile as the window narrows
  instead of spilling over their neighbours, and tall dashboards scroll so nothing gets cut off at
  the bottom.
- **Connect to SurrealDB Cloud.** SurrealDB datasources can authenticate at the namespace level, so
  a hosted SurrealDB Cloud instance connects with the credentials it expects.
- **Secrets stay out of your config.** REST datasources can pull auth tokens and credentials from
  environment variables instead of hard-coding them in the project, and can send fixed query
  parameters on every request.

## 0.27.1

- **Onboarding, one hop from your secrets.** The connect-your-data cards for backends that need a
  stored credential now show a button that jumps straight to the secrets editor, so you can drop
  in a connection string or API key without hunting for where it lives.
- **Fix: the Mac download now installs properly.** The downloaded disk image opens an installer
  window that asks you to drag Vantage into your Applications folder, instead of leaving you to
  run it from the read-only image — which is what quietly blocked in-app updates. Install it, launch
  it from Applications, and updates apply as they should.
