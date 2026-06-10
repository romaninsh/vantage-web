# "Six-step process" disagrees with the book's nine-step persistence guide

- **Severity:** low
- **Category:** inconsistencies
- **Location:** `themes/vantage/templates/framework.html:692`

The "Bring your own backend" section calls adding a backend "a well-defined six-step process" and lists six steps, the last of which merges two of the book's chapters. The linked mdBook chapter (vantage/docs4/src/SUMMARY.md) actually defines nine steps, including "Step 8: Vista Integration" and "Step 9: Contained Relations". The vantage code review flagged the same step-count drift in the README (`inconsistencies/docs-readme-status-table-step-numbers.md`); the site inherits it, so a reader following the link sees a different process than advertised.

```
<p>… Adding a backend is a well-defined six-step process in the book's
<a href="https://romaninsh.github.io/vantage/new-persistence.html" …>Adding a New Persistence</a> chapter.</p>
<ol class="row g-2 list-unstyled mb-4">
    <li class="col-md-6">1. Define the type system</li>
    ...
    <li class="col-md-6">6. Add relationships and multi-backend support</li>
</ol>
```

**Recommendation:** Match the book: either say "nine-step process" and list all nine, or drop the count ("a well-defined, step-by-step guide") so the page can't drift again when the book changes.
