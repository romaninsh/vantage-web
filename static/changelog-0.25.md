# Vantage 0.25

## What's new

- **Sign in to a cloud data source.** A SurrealDB data source can now reach a hosted (cloud)
  instance and log you in through your browser — you sign in with your identity provider (for
  example Google, via Auth0) and Vantage connects using the token it hands back, instead of a
  shared database password. Your login is remembered, so the next launch reconnects on its own.

## 0.25.1

- Fix: SurrealDB record IDs and timestamps could show up blank or as raw numbers instead of
  their real value.
