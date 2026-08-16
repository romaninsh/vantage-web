# Vantage 0.34

Until now, every person opening a shared app had to be handed its passwords and paste them into a
file of their own. Those passwords then sat in plain text next to the app, and everyone who had
them could see everything. An app can now keep its credentials centrally: you sign in with your
work account, and Vantage loads only what you are allowed to have.

## What's new

- **Sign in with your work account.** When an app keeps its credentials centrally, opening it asks
  you to sign in once. Your browser opens, you pick your account, and you're back — the app fills
  in and connects. Later launches don't ask again. **Sign Out of Work Account** is in the Vantage
  menu when you want to end it.
- **You see what you're entitled to.** Access is decided per credential by whoever administers your
  organisation's accounts. If your team can reach the mailing system but not the customer database,
  the pages built on the mailing system work and the others say so plainly — one app, shaped to
  each person, rather than one app per group.
- **Screens can authenticate as you.** Where a service accepts it, Vantage can connect as the
  signed-in person rather than through a shared password — so the service's own logs name who did
  what, and there's no password to leak or rotate.
- **App updates wait for the Vantage they need.** If a published app update needs a newer Vantage
  than you're running, your app keeps working on the version it has and tells you to update Vantage
  first, instead of loading screens it can't read.
- Fix: credentials no longer leak into the terminal pane. Commands you run from an app can no
  longer read its passwords out of their environment, and switching apps no longer leaves the
  previous app's credentials behind.

## 0.34.1

- Fix: nightly and custom-built copies of Vantage refused app updates that named the version they
  were already running, and kept asking you to update Vantage.

## 0.34.2

- **Actions that build their own form.** An app can offer an operation whose fields come from the
  operation itself rather than from the app's configuration — you get the right boxes, in the right
  order, with the right types, and they stay correct when the operation changes. Where the
  operation offers a fixed set of choices, you get them.
- Fix: an action that failed said nothing. The dialog closed and looked exactly like success, so
  work that never happened — an email that didn't send, a record that didn't save — passed for
  done. Failures now tell you, and say what went wrong.
- Fix: a row action on a table whose key column isn't called "id" said you hadn't picked a row when
  you had.
- Fix: an action naming a feature this copy of Vantage can't offer used to complain about the app's
  configuration. It now says the feature is unavailable, and points at the connection or credential
  behind it.

## 0.34.3

- **Actions run in front of you.** Fill in the form, press Run, and the dialog stays put: a spinner
  while the work happens, then what came back — the message, the reference, whatever the operation
  reports — waiting for you to close it. You no longer have to guess from a dialog that vanished
  whether the email went out.
- **A failed action can be retried without starting over.** When something goes wrong you get the
  reason in the dialog, with a button to copy it, and **Back** returns you to the form with
  everything you typed still there. Fix the one wrong field and try again.

## 0.34.4

- Fix: the generated files Vantage keeps out of an app's version control are now matched by shape
  rather than named one folder at a time, so a kind of screen added later is covered from the day
  it appears.

## 0.34.5

- **You can see who you're signed in as.** On an app that keeps its credentials centrally, the
  account sits under the app name in the sidebar — and reads **Not authenticated**, in warning
  colour, when the app wants a sign-in it hasn't got. That line explains every empty page above it.
- **Sign in and out from the app menu.** Both now live in the switcher dropdown next to the account,
  where you're looking when you notice something is wrong.
- Fix: signing in left the pages you already had open still showing their errors. They now rebuild,
  so the screens that were empty fill in without you reopening them.
- Fix: signing out left those pages showing the data they had already loaded. They now clear.
- Fix: two copies of Vantage open on the same app fought over the same row cache, and the second
  one reported every table as unavailable. Each copy — standard, nightly, and each custom build —
  now keeps its own, so they can run side by side.
- Fix: signing in to one app signed you in to another that happened to use the same account
  settings, and a nightly build could pick up the sign-in from your standard one. Each app on each
  copy of Vantage now holds its own; you'll be asked to sign in once more after updating.
- **The splash leads with apps.** Installing something your organisation publishes is the first
  card rather than the third, and on an app-channel build it's named for what it offers.
- Fix: the title bar of a custom build said "Vantage" when everywhere else — the Dock, the window
  title, the About box — used the build's own name.

## 0.34.6

- Fix: columns a page hides, and columns worked out from other columns, turned up as editable boxes
  on a record form. Typing free text over one of them could overwrite the values the rest of the
  record was derived from.
- Fix: a field with a default value came up empty when you created a record. Defaults now fill
  themselves in, and a date field can start at today.
- Fix: a read-only field looked editable — you could type in it and nothing you typed was kept. It
  now shows as disabled.

## 0.34.7

- Fix: dates and times in an app built into Vantage showed as blank cells, or as a long run of
  digits. They now read as dates and times.
- Fix: a cell holding a list, or a record nested inside another record, looked empty. You now get a
  short summary of what's in it.
- Fix: opening the rows attached to a record threw away that table's own column names, widths and
  formatting. They now look the way they do on the table's own page.

## 0.34.8

- **Check for Updates says what it found.** It used to look like nothing had happened. It now names
  the version you're on when there's nothing newer, shows you the reason when the check couldn't be
  made, and says so plainly when an app didn't come from a published list and so has no updates to
  fetch.
- Fix: a check that ran on its own and found a newer version kept quiet about it. You're now told
  once, the first time each new version turns up.

## 0.34.9

- **A table can leave its Add button out.** Where rows only ever appear because you ran an
  operation, the page no longer offers you an Add that was never going to work.
