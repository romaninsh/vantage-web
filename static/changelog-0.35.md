# Vantage 0.35

GraphQL apps read nested data now: a column can point at a field buried inside another object, and
APIs that wrap their rows in a paged envelope load. Tables also state what their endpoint supports,
so sorting and searching run on the server where it can do them and locally where it can't.

## What's new

- A summary tab can carry a button that opens a link in your browser, to jump from a row to the same
  record in the system it came from.
- A table can name its own column headings, so they read properly on screens with no page behind
  them to set one — a master/detail relation tab, for instance.
- A master/detail screen can drop the record form when the data is only ever read.

## 0.35.1

- A colour rule can end in `*` to cover every label sharing a prefix, and the colour then replaces
  the prefix on the tag, so a row reads `api dev back` rather than
  `component:api environment:dev team:back`. An exact rule still wins.
- Fix: a column holding several labels showed them as one tag with the values run together.

## 0.35.2

- Your agent can ask what Vantage would send for a table — the SQL, the GraphQL document, the
  command a CLI-backed table runs — without running it, which is usually faster than narrowing an
  empty or over-full grid down a row at a time. It works with "Allow MCP agents to read data"
  switched off, since it shows the question and never your data.
