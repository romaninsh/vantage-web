# Vantage 0.11

This release lets you build a dashboard on top of a command-line tool.

## What's new

- **Command-line data sources.** Point a data source at a local command — like `aws` CLI — and each
  table fetches its rows by running that tool and reading the JSON it prints. A small script per
  table shapes the command's arguments, and drilling from a row into a related table passes the
  parent's id through as a command flag, so the usual master/detail navigation works with no API or
  database behind it. Choose **Command (CLI)** when you add a data source.
