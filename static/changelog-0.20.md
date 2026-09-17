# Vantage 0.20

Vantage talks to Kubernetes. Add a Kubernetes datasource and browse your cluster's resources — pods,
deployments, nodes and the rest of the API — as plain tables, the same way you'd browse any other
data source. It connects through your current kubeconfig context, and a table can be pinned to a
single namespace. A later patch made a page's default sort actually order the rows, rather than only
lighting up the header arrow, even where the data source can't sort on its own.

## What's new

- A page that opens already sorted shows the up/down arrow on that column straight away, so it reads
  as though you had clicked the header yourself.
- Fix: a data source that briefly failed to refresh could snap the grid back to an older cached
  version. Rows hold steady now when a fetch doesn't come through.

## 0.20.1

- Drilling into a related tab or opening a table no longer freezes while everything loads. The page
  appears straight away and fills in as the rows arrive, even when the source is slow or briefly
  down.

## 0.20.2

- Fix: a date in the future read "3 months ago" instead of "in 3 months".

## 0.20.3

- Fix: on a live table, a refresh reshuffled the rows into the source's order before snapping back
  to your sort. A new or changed row now settles into place without the rest of the list jumping.
