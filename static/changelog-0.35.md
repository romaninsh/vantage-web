# Vantage 0.35

## What's new

- **Buttons on a record's summary.** A summary tab can carry a button that opens a link in your
  browser, so you can jump from a row straight to the same record in the system it came from.
- **GraphQL apps read nested data.** A column can point at a field buried inside another object,
  and APIs that wrap their rows in a paged envelope now load. Tables also state what their endpoint
  supports, so sorting and searching run on the server where it can do them and locally where it
  can't.
- **Column headings you choose.** A table can name its own headings, so they read properly on
  screens with no page behind them to set one — a master/detail relation tab, for instance.
- **Hide the Details tab.** A master/detail screen can drop the record form when the data is only
  ever read.

## 0.35.1

- **Colour a whole family of labels at once.** A colour rule can end in `*` to cover every label
  sharing a prefix, and the colour then replaces that prefix on the tag — so a row reads `api dev
  back` rather than `component:api environment:dev team:back`. An exact rule still wins.
- Fix: a column holding several labels showed them as one tag with the values run together. Each
  label now gets its own tag, and its own colour.

## 0.35.2

- **Your agent can read the query, not just the rows.** When a table comes back empty, shows far
  too much, or ignores a filter you set, the agent helping you can now ask what Vantage would
  actually send — the SQL, the GraphQL document, the command a CLI-backed table runs — without
  running it. The gap between what you meant and what gets sent is usually the whole problem, and
  this shows it outright instead of narrowing it down a row at a time.
- That works even with "Allow MCP agents to read data" switched off, because it only ever shows the
  question, never your data.
