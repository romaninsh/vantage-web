#!/usr/bin/env python3
"""Generate llms.txt, llms-full.txt and per-page markdown from a built site.

Run after `zola build`:  python3 script/llms.py public

Most product pages are rendered by templates and have no markdown body, so
the text is taken from the built HTML rather than from content/. Pages come
from sitemap.xml, which already leaves out drafts and `unlisted` pages.

Writes, following https://llmstxt.org:
  public/llms.txt                 curated index linking to the markdown pages
  public/llms-full.txt            every page concatenated
  public/<path>/index.html.md     markdown version of each page
"""

import re
import sys
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse

BASE_URL = "https://vantage-ui.com/"

SUMMARY = (
    "Vantage UI is an AI-first desktop app builder for data-heavy business "
    "apps. A project is a folder of YAML that your own AI agent edits over "
    "MCP while the native Rust/GPUI app renders it live over your existing "
    "databases and APIs, with no data migration. It is built on the "
    "open-source Vantage framework: Rust crates for entities, datasources, "
    "relations and live data."
)

# llms.txt sections, in order: (heading, first path segments). Pages whose
# segment isn't listed land in "Optional".
SECTIONS = [
    ("Product", ["", "features", "framework", "download", "library", "follow"]),
    ("Solutions", ["solutions"]),
    ("Examples", ["examples"]),
    ("Blog", ["blog"]),
]

DOCS = [
    ("Vantage framework book", "https://romaninsh.github.io/vantage/",
     "concepts and guides for the Rust framework under Vantage UI"),
    ("Framework source", "https://github.com/romaninsh/vantage",
     "the vantage-* crates on GitHub"),
    ("Crates on crates.io", "https://crates.io/search?q=vantage",
     "published vantage-* crates"),
]

SKIP_TAGS = {"head", "script", "style", "svg", "noscript", "template", "picture", "video", "button", "form", "select", "textarea"}
CHROME_TAGS = {"header", "nav", "footer"}
BLOCK_TAGS = {"p", "div", "section", "article", "aside", "main", "ul", "ol", "table", "thead", "tbody", "tr", "figure", "figcaption", "blockquote", "dl", "dt", "dd", "details", "summary"}
VOID_TAGS = {"br", "hr", "img", "input", "meta", "link", "source", "wbr", "area", "base", "col", "embed", "param", "track"}
# Inline elements that templates butt together as grid cells
# (<span>SurrealDB</span><span>live queries</span>); pad them so words don't
# merge. tidy() removes the stray spaces this leaves before punctuation.
PADDED_TAGS = {"span", "small", "i", "em", "label"}
HEADING = re.compile(r"h[1-6]")


class PageText(HTMLParser):
    """Turn one rendered page into rough markdown.

    Collects only inside <main> when the page has one; otherwise the whole
    <body> minus site chrome (header/nav/footer).
    """

    def __init__(self, page_url, use_main):
        super().__init__(convert_charrefs=True)
        self.page_url = page_url
        self.use_main = use_main
        self.stack = []  # open elements: (tag, skip, opens_scope, href, tooltip)
        self.skip_depth = 0
        self.in_scope = not use_main
        self.pre = 0
        self.out = []
        self.saved_out = []  # outer buffers while collecting a tooltip
        self.seen_tips = set()
        self.seen_h1 = False
        self.last_level = 1
        # A second h1 starts an embedded document (a changelog entry on
        # /download). Until its parent closes, its headings sit below the
        # heading that introduced it: (parent stack depth, level offset).
        self.nested = None
        self.title = ""
        self.in_title = False

    def emit(self, text):
        if self.skip_depth == 0 and self.in_scope:
            self.out.append(text)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "title":
            self.in_title = True
        if tag in VOID_TAGS:
            if tag == "br":
                self.emit("\n")
            elif tag == "hr":
                self.emit("\n\n---\n\n")
            return

        cls = a.get("class") or ""
        # Icons carry no text, but status icons say what they mean in a
        # title ("Supported"), which is the point of capability tables.
        if "material-symbols" in cls and a.get("title"):
            self.emit(" " + a["title"] + " ")
        # Likewise a glyph span labelled for screen readers (`~` = "Partly supported").
        labelled = tag == "span" and bool(a.get("aria-label"))
        if labelled:
            self.emit(" " + a["aria-label"] + " ")
        skip = (
            labelled or
            tag in SKIP_TAGS
            or (not self.use_main and tag in CHROME_TAGS)
            or "hidden" in a
            or a.get("aria-hidden") == "true"
            or "material-symbols" in cls
            or "zola-anchor" in cls
            or a.get("id") == "lightbox"
        )
        opens_scope = self.use_main and tag == "main" and not self.in_scope
        # Glossary tooltips repeat on every capability table that uses the
        # term, so they print once per page. Notes on a partial-support cell
        # (`cap-partial`) are specific to that backend and always print.
        tooltip = None
        if a.get("role") == "tooltip":
            parent_cls = self.stack[-1][5] if self.stack else ""
            tooltip = "note" if "cap-partial" in parent_cls else "glossary"
        self.stack.append((tag, skip, opens_scope, a.get("href"), tooltip, cls))
        if opens_scope:
            self.in_scope = True
        if skip:
            self.skip_depth += 1
            return

        if HEADING.fullmatch(tag):
            level = int(tag[1])
            if self.nested is None and level == 1 and self.seen_h1:
                self.nested = (len(self.stack) - 2, self.last_level)  # [-1] is the h1
            if self.nested:
                level = min(6, level + self.nested[1])
            else:
                self.seen_h1 |= level == 1
                self.last_level = level
            self.emit("\n\n" + "#" * level + " ")
        elif tag == "li":
            self.emit("\n- ")
        elif tag == "pre":
            self.pre += 1
            self.emit("\n\n```\n")
        elif tag == "code" and not self.pre:
            self.emit("`")
        elif tag in ("strong", "b"):
            self.emit("**")
        elif tag in ("td", "th"):
            self.emit(" | ")
        elif tag == "a":
            self.emit("[")
        elif tooltip:
            self.saved_out.append(self.out)
            self.out = []
        elif tag in BLOCK_TAGS:
            self.emit("\n\n")
        elif tag in PADDED_TAGS:
            self.emit(" ")

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        if tag in VOID_TAGS or not any(t == tag for t, *_ in self.stack):
            return
        # Pop to the matching open tag; tolerates unclosed children.
        while self.stack:
            open_tag, skip, opens_scope, href, tooltip, _ = self.stack.pop()
            if skip:
                self.skip_depth -= 1
            else:
                self.close(open_tag, href, tooltip)
            if opens_scope:
                self.in_scope = False
            if self.nested and len(self.stack) <= self.nested[0]:
                self.nested = None
            if open_tag == tag:
                break

    def close(self, tag, href, tooltip):
        if HEADING.fullmatch(tag) or tag in BLOCK_TAGS:
            self.emit("\n\n")
        elif tag == "pre":
            self.pre -= 1
            self.emit("\n```\n\n")
        elif tag == "code" and not self.pre:
            self.emit("`")
        elif tag in ("strong", "b"):
            self.emit("**")
        elif tag == "a":
            if href and not href.startswith(("#", "javascript:")):
                self.emit("](" + urljoin(self.page_url, href) + ")")
            else:
                self.emit("]")
        elif tooltip:
            # The tip's bold heading repeats the visible label; drop it.
            tip = re.sub(r"\s+", " ", "".join(self.out)).strip()
            tip = re.sub(r"^\*\*[^*]*\*\*\s*", "", tip)
            self.out = self.saved_out.pop()
            if tip and (tooltip == "note" or tip not in self.seen_tips):
                self.seen_tips.add(tip)
                self.emit(f" ({tip}) ")
        elif tag in PADDED_TAGS:
            self.emit(" ")

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self.skip_depth or not self.in_scope:
            return
        self.out.append(data if self.pre else re.sub(r"\s+", " ", data))


def tidy(md):
    md = md.replace(" ", " ")
    # Drop empty links, unwrap anchor-only links, drop empty emphasis.
    md = re.sub(r"\[\s*\](\([^)]*\))?", "", md)
    md = re.sub(r"\[([^\[\]]*)\](?!\()", r"\1", md)
    md = re.sub(r"\*\*\s*\*\*", "", md)
    # `**word **` doesn't render as bold; move edge spaces outside the pair.
    md = re.sub(
        r"\*\*([^*\n]+?)\*\*",
        lambda m: (" " if m[1][0].isspace() else "") + f"**{m[1].strip()}**" + (" " if m[1][-1].isspace() else ""),
        md,
    )
    out, in_fence = [], False
    for line in md.split("\n"):
        if line.startswith("```"):
            in_fence = not in_fence
        elif not in_fence:
            line = re.sub(r" {2,}", " ", line).strip()
            line = re.sub(r" +([,.;:!?)\]])", r"\1", line)
            line = re.sub(r"([(\[]) +", r"\1", line)
        out.append(line)
    md = "\n".join(out)
    md = re.sub(r"^(- |#+)\s*$", "", md, flags=re.M)
    md = re.sub(r"\n{3,}", "\n\n", md)
    md = re.sub(r"(^- .*)\n\n(?=- )", r"\1\n", md, flags=re.M)
    return md.strip() + "\n"


def page_markdown(html, url):
    parser = PageText(url, use_main="<main" in html)
    parser.feed(html)
    body = tidy("".join(parser.out))
    title = re.sub(r"\s*\|\s*Vantage\s*$", "", parser.title.strip()) or "Vantage UI"
    # Pages open with their own h1, sometimes after a kicker line or badge.
    if not re.match(r"(?:.*\n){0,4}# ", body):
        body = f"# {title}\n\n{body}"
    return title, body


def meta_description(html):
    m = re.search(r'<meta name="description" content="([^"]*)"', html)
    if not m:
        return ""
    # Front matter descriptions may carry markdown emphasis and links.
    text = unescape(m.group(1)).replace("**", "")
    return re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", text)


def index_line(page):
    _, _, md_url, title, description, _ = page
    return f"- [{title}]({md_url})" + (f": {description}" if description else "")


def main(public):
    public = Path(public)
    urls = re.findall(r"<loc>([^<]+)</loc>", (public / "sitemap.xml").read_text())

    pages = []  # (segment, url, md_url, title, description, markdown)
    for url in urls:
        path = urlparse(url).path
        html_file = public / path.lstrip("/") / "index.html"
        if path.startswith("/categories/") or not html_file.exists():
            continue
        html = html_file.read_text()
        title, md = page_markdown(html, url)
        (html_file.parent / "index.html.md").write_text(md)
        segment = path.strip("/").split("/")[0]
        pages.append((segment, url, url + "index.html.md", title, meta_description(html), md))

    full = [f"# Vantage UI\n\n> {SUMMARY}\n"]
    full += [f"---\n\nSource: {url}\n\n{md}" for _, url, _, _, _, md in pages]
    (public / "llms-full.txt").write_text("\n".join(full))

    out = [
        "# Vantage UI", "",
        f"> {SUMMARY}", "",
        f"Each link below is the markdown version of a page. The whole site in one file: {BASE_URL}llms-full.txt", "",
    ]
    placed = set()
    for heading, segments in SECTIONS:
        rows = sorted(
            (p for p in pages if p[0] in segments),
            key=lambda p: (segments.index(p[0]), p[1].count("/")),
        )
        if rows:
            placed.update(p[1] for p in rows)
            out += [f"## {heading}", "", *map(index_line, rows), ""]
    out += ["## Docs", "", *(f"- [{n}]({u}): {d}" for n, u, d in DOCS), ""]
    rest = [p for p in pages if p[1] not in placed]
    if rest:
        out += ["## Optional", "", *map(index_line, rest), ""]
    (public / "llms.txt").write_text("\n".join(out))

    size = sum(len(p[5]) for p in pages) // 1024
    print(f"llms.txt: {len(pages)} pages; llms-full.txt: {size} KiB")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "public")
