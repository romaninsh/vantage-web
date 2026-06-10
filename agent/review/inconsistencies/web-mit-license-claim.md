# "MIT-licensed" claims rest on a LICENSE file with someone else's copyright

- **Severity:** high
- **Category:** inconsistencies
- **Location:** `content/_index.md:8`

The site asserts MIT licensing in three prominent places: the hero caption, the framework band (`content/_index.md:74`), and the footer ("**Vantage Framework** is open source, MIT licensed", `themes/vantage/templates/macros/navigation.html` footer macro). The framework repo's only LICENSE file is copied from Diesel and reads "Copyright (c) 2015 Sean Griffin", and no Apache-2.0 file exists despite the crates' dual-license claim (verified in vantage code review, `bugs/docs-license-wrong-copyright.md`). Technical buyers who check the repo before adopting will find the licensing story does not hold up.

```
hero_caption = "… Built on the open-source, MIT-licensed [Vantage Framework](/framework/) …"
-- footer (navigation.html) --
<a href="https://github.com/romaninsh/vantage" …><strong>Vantage Framework</strong>
is open source, MIT licensed</a>.
-- vantage/LICENSE --
The MIT License (MIT)
Copyright (c) 2015 Sean Griffin
```

**Recommendation:** Fix the LICENSE file in the vantage repo (correct copyright holder, add the missing Apache-2.0 text if dual-licensed) before or together with the site launch. The site copy itself can stay once the repo matches it.
