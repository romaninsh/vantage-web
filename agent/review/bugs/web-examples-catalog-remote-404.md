# Remote examples catalog URL 404s — the declared "source of truth" doesn't exist

- **Severity:** medium
- **Category:** bugs
- **Location:** `themes/vantage/templates/examples.html:12`

Both `examples.html` and `index.html` try to load `https://raw.githubusercontent.com/romaninsh/vantage-ui-examples/main/catalog.yaml` at build time, falling back to `static/examples-catalog.yaml`. There is no `catalog.yaml` on `origin/main` of vantage-ui-examples (verified via `git ls-tree origin/main`), so the remote fetch fails on every build and the site silently serves the committed copy — while the fallback's own header claims the remote file is "the source of truth" and tells maintainers to "keep the two in sync". When someone does add the remote file, untested data (e.g. `screenshot` paths resolved through `get_url()` against this site's static dir) will start flowing into production builds unreviewed.

```
{% set catalog = load_data(
    url="https://raw.githubusercontent.com/romaninsh/vantage-ui-examples/main/catalog.yaml",
    format="yaml",
    required=false
) %}
-- static/examples-catalog.yaml --
# Source of truth: https://github.com/romaninsh/vantage-ui-examples/blob/main/catalog.yaml
```

**Recommendation:** Either commit `catalog.yaml` to the examples repo's main branch, or remove the remote `load_data` and treat the committed file as the only source. If keeping the remote fetch, pin expectations (validate `screenshot` paths exist) so a remote edit can't break the build silently.
