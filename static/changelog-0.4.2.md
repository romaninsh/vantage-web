# Vantage 0.4.2

A focused follow-up to 0.4.1: a launch-from-Finder fix, fuller AWS
browsing, and SSO-friendly authentication via the `vantage-aws` 0.4.7
update.

- **Fixed: SQLite datasources work when launched from Finder.** Relative
  `sqlite:` URLs now resolve against the inventory root instead of the
  process working directory, so opening Vantage from `/Applications/`
  loads the same databases that `cargo run` does.
- **AWS list views now return all pages.** CloudWatch log streams, ECS
  services and tasks — anything that used to silently stop at AWS's
  first-page limit now walks `nextToken` until exhausted, surfacing
  every entry in busy log groups and large clusters
  ([vantage#231](https://github.com/romaninsh/vantage/pull/231)).
- **`AWS_PROFILE` and SSO finally supported.** Vantage now respects
  `AWS_PROFILE` and shells out to `aws configure export-credentials` for
  SSO, assumed-role, and `credential_process` profiles, so SSO-only AWS
  accounts work as long as `aws sso login` is current
  ([vantage#230](https://github.com/romaninsh/vantage/pull/230)).
- **DynamoDB sort-key filtering and a scan-filter fix.** New
  `begins_with` condition for `SK`-prefixed single-table designs, plus
  a fix where filtered `Scan` calls used to silently return zero results
  even when matches existed
  ([vantage#230](https://github.com/romaninsh/vantage/pull/230)).
- **SurrealDB connections are now CBOR end-to-end.** `ws://` and `wss://`
  URLs route through the CBOR engine; the legacy JSON wire format is
  gone. Existing inventory keeps working — you only see this if you
  cared about record-id fidelity, which now round-trips losslessly
  ([vantage#233](https://github.com/romaninsh/vantage/pull/233)).
