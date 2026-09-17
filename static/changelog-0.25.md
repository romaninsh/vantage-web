# Vantage 0.25

A SurrealDB data source used one shared database password. It can now reach a hosted instance and
sign you in through your browser instead.

## What's new

- Signing in goes through your own identity provider, Google via Auth0 for example, and the data
  source connects with the token that comes back. The login is remembered and the next launch
  reconnects on its own.

## 0.25.1

- Fix: SurrealDB record IDs and timestamps could show up blank or as raw numbers.
