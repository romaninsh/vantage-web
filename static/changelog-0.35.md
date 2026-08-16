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
