# Vantage 0.20

Vantage talks to Kubernetes now: point a datasource at your cluster and browse pods, deployments,
and the rest of the API as plain tables.

## What's new

- **Connect to Kubernetes.** Add a Kubernetes datasource and browse your cluster's resources — pods,
  deployments, nodes, and more — as tables, the same way you'd browse any other data source. It
  connects through your current kubeconfig context, and you can pin a table to a single namespace.
- **A default sort now lights up the header.** When a page opens already sorted, the column it's
  sorted by shows its up/down arrow straight away — so it reads exactly like you'd clicked the header
  yourself, instead of leaving you guessing which column set the order.
- **Fix:** a data source that briefly failed to refresh could snap the grid back to an older cached
  version. Refreshes now hold the rows you're looking at steady when a fetch doesn't come through.

## 0.20.1

- **A default sort now orders every grid, not just the header.** Pages set to open sorted now
  actually arrive in that order — even on tables whose data source can't sort on its own — instead of
  only lighting up the header arrow, so the rows are where you expect from the first glance.
- **Opening a page or a related tab no longer pauses.** Drilling into a related tab or opening a
  table used to freeze for a moment while everything loaded; now it appears straight away and fills
  in as the rows arrive, even when the source is slow or briefly down.

## 0.20.2

- **Fix: upcoming dates no longer read "ago".** A date in the future — like a launch still to come —
  showed up as "3 months ago"; it now reads "in 3 months", so a newest-first list reads in the right
  order at a glance.

## 0.20.3

- **Fix: a sorted list no longer flickers when it refreshes.** On a live table, hitting refresh (or a
  background poll) briefly reshuffled the rows into the source's order before snapping back to your
  sort — a visible jump. Refreshes now stay in your chosen order the whole time, and a new or changed
  row settles into place without the rest of the list jumping around. New rows also show up reliably as
  the count updates.
