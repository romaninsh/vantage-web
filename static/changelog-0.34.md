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
