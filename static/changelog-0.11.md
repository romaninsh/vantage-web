# Vantage 0.11

Point a data source at a local command — the `aws` CLI, say — and each table fetches its rows by
running that tool and reading the JSON it prints. A small script per table shapes the command's
arguments, and drilling from a row into a related table passes the parent's id through as a command
flag, so the usual master/detail navigation works with no API or database behind it.

## What's new

- Choose Command (CLI) when you add a data source.
