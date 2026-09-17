# Vantage 0.34

Until now every person opening a shared app had to be handed its passwords and paste them into a
file of their own, where they sat in plain text next to the app and let anyone who had them see
everything. An app can now keep its credentials centrally. Opening it asks you to sign in once: your
browser opens, you pick your work account, and the app fills in and connects; later launches don't
ask again. Access is decided per credential by whoever administers your organisation's accounts, so
if your team can reach the mailing system but not the customer database, the pages built on the
mailing system work and the others say so.

## What's new

- Where a service accepts it, Vantage connects as the signed-in person rather than through a shared
  password, so the service's own logs name who did what and there is no password to rotate.
- Sign Out of Work Account is in the Vantage menu.
- If a published app update needs a newer Vantage than you're running, the app keeps working on the
  version it has and tells you to update Vantage first, instead of loading screens it can't read.
- Fix: credentials no longer leak into the terminal pane. A command you run from an app can't read
  its passwords out of the environment, and switching apps doesn't leave the previous app's
  credentials behind.

## 0.34.1

- Fix: nightly and custom-built copies of Vantage refused app updates that named the version they
  were already running.

## 0.34.2

- An app can offer an operation whose fields come from the operation itself rather than from the
  app's configuration, so you get the right boxes in the right order, and they stay correct when the
  operation changes.
- Fix: an action that failed said nothing — the dialog closed and looked exactly like success, so an
  email that never sent passed for done.

## 0.34.3

- Actions run in front of you: press Run and the dialog stays put, with a spinner and then whatever
  the operation reported. A failure shows the reason with a button to copy it, and Back returns you
  to the form with everything you typed still in it.

## 0.34.5

- On an app that keeps its credentials centrally, the account sits under the app name in the
  sidebar, and reads "Not authenticated" in warning colour when the app wants a sign-in it hasn't
  got — which explains every empty page above it. Signing in and out moved to the switcher dropdown
  beside it.
- Fix: pages open when you signed in kept showing their errors, and pages open when you signed out
  kept showing their data. Both now rebuild.
- Fix: two copies of Vantage open on the same app fought over one row cache, and the second reported
  every table as unavailable. Each copy keeps its own.
- Fix: signing in to one app signed you in to another using the same account settings. Each app on
  each copy of Vantage holds its own now, so you'll be asked to sign in once more after updating.

## 0.34.6

- Fix: columns a page hides, columns worked out from other columns, and read-only fields all turned
  up as editable boxes on a record form, and a field with a default value came up empty on a new
  record.

## 0.34.7

- Fix: in an app built into Vantage, dates showed as blank cells or a long run of digits, a cell
  holding a list or a nested record looked empty, and the rows attached to a record lost that
  table's own column names, widths and formatting.

## 0.34.8

- Check for Updates names the version you're on when there's nothing newer, and gives the reason
  when the check couldn't be made. A check that runs on its own and finds a new version now tells
  you, once per version.

## 0.34.9

- A table can leave its Add button out, for pages whose rows only ever appear because you ran an
  operation.
