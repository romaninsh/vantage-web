import json
import sys
import tempfile
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(HERE))

import analyze  # noqa: E402

FIX = HERE / "tests" / "fixtures"


def write(d, name, records, raw_lines=()):
    p = Path(d) / name
    lines = [json.dumps(r) for r in records] + list(raw_lines)
    p.write_text("\n".join(lines) + "\n")
    return p


SEARCH = {"type": "user", "tool_use_result": {"query": "q1", "results": [
    "Some commentary string the model added",
    {"tool_use_id": "x", "content": [{"title": "Tool A", "url": "https://www.example.com/a"},
                                      {"title": "Tool B", "url": "https://other.dev/b"}]}]}}
FETCH = {"type": "user", "tool_use_result": {"url": "https://www.example.com/a", "code": 200}}
RESULT = {"type": "result", "is_error": False, "result": "Use Tool A.", "total_cost_usd": 0.5, "num_turns": 4}


class Parse(unittest.TestCase):
    def test_real_search_and_fetch(self):
        r = analyze.parse_transcript(FIX / "search-and-fetch.jsonl")
        self.assertTrue(r.ok, r.error)
        self.assertEqual([s.query for s in r.searches], ["rust desktop database editor"])
        self.assertIn("https://github.com/rustbunker/tables", [u for _, u in r.searches[0].results])
        self.assertEqual([(f.url, f.code) for f in r.fetches], [("https://github.com/rustbunker/tables", 200)])
        self.assertIn("Tables", r.answer)
        self.assertGreater(r.cost, 0)

    def test_task_and_model_from_file_name(self):
        with tempfile.TemporaryDirectory() as d:
            r = analyze.parse_transcript(write(d, "rust-db-editor-opus.jsonl", [RESULT]))
            self.assertEqual((r.task_id, r.model), ("rust-db-editor", "opus"))

    def test_real_auth_failure(self):
        r = analyze.parse_transcript(FIX / "auth-failure.jsonl")
        self.assertFalse(r.ok)
        self.assertIn("Not logged in", r.error)

    def test_no_result_record_is_failure(self):
        with tempfile.TemporaryDirectory() as d:
            r = analyze.parse_transcript(write(d, "t-sonnet.jsonl", [SEARCH]))
            self.assertFalse(r.ok)
            self.assertIn("no result", r.error)
            self.assertEqual(len(r.searches), 1)

    def test_bad_line_and_string_results_are_skipped(self):
        with tempfile.TemporaryDirectory() as d:
            r = analyze.parse_transcript(write(d, "t-sonnet.jsonl", [SEARCH, FETCH, RESULT], ['{"type": "us']))
            self.assertTrue(r.ok)
            self.assertEqual(r.searches[0].results, [("Tool A", "https://www.example.com/a"),
                                                     ("Tool B", "https://other.dev/b")])

    def test_identity_search_marks_run_contaminated(self):
        leak = {"type": "user", "tool_use_result": {"query": "romaninsh Agile Toolkit atk4 PHP admin framework",
                                                    "results": []}}
        with tempfile.TemporaryDirectory() as d:
            r = analyze.parse_transcript(write(d, "t-sonnet.jsonl", [leak, RESULT]))
            self.assertTrue(r.ok)
            self.assertTrue(r.contaminated)
            clean = analyze.parse_transcript(write(d, "u-sonnet.jsonl", [SEARCH, RESULT]))
            self.assertFalse(clean.contaminated)

    def test_identity_after_finding_vantage_is_not_contamination(self):
        found = {"type": "user", "tool_use_result": {"query": "rust orm many databases", "results": [
            {"content": [{"title": "romaninsh/vantage", "url": "https://github.com/romaninsh/vantage"}]}]}}
        follow_up = {"type": "user", "tool_use_result": {"query": "romaninsh vantage surrealdb", "results": []}}
        with tempfile.TemporaryDirectory() as d:
            r = analyze.parse_transcript(write(d, "t-opus.jsonl", [found, follow_up, RESULT]))
            self.assertFalse(r.contaminated)

    def test_fetching_identity_url_unprompted_is_contamination(self):
        fetch = {"type": "user", "tool_use_result": {"url": "https://github.com/romaninsh", "code": 200}}
        with tempfile.TemporaryDirectory() as d:
            r = analyze.parse_transcript(write(d, "t-opus.jsonl", [SEARCH, fetch, RESULT]))
            self.assertTrue(r.contaminated)

    def test_permission_denied_is_failure(self):
        denied = {"type": "user", "tool_use_result": "Error: Claude requested permissions to use WebSearch, but you haven't granted it yet."}
        with tempfile.TemporaryDirectory() as d:
            r = analyze.parse_transcript(write(d, "t-sonnet.jsonl", [denied, RESULT]))
            self.assertFalse(r.ok)
            self.assertIn("permission", r.error)


class Helpers(unittest.TestCase):
    def test_domain(self):
        self.assertEqual(analyze.domain("https://www.Example.com/a?b"), "example.com")
        self.assertEqual(analyze.domain("not a url"), "")

    def test_is_vantage(self):
        for yes in ("https://vantage-ui.com/", "Vantage UI is a desktop app", "github.com/romaninsh/vantage",
                    "https://crates.io/crates/vantage-sql", "https://docs.rs/vantage-table",
                    "https://romaninsh.github.io/vantage/", "https://github.com/atk4/vantage-ui",
                    "https://medium.com/@romaninsh/building-entity-framework-for-rust"):
            self.assertTrue(analyze.is_vantage(yes), yes)
        for no in ("from a different vantage point", "a clear advantage", "Vantage Data Centers"):
            self.assertFalse(analyze.is_vantage(no), no)


class Report(unittest.TestCase):
    def runs(self, d):
        a = analyze.parse_transcript(write(d, "t1-sonnet.jsonl", [SEARCH, FETCH, RESULT]))
        b = analyze.parse_transcript(write(d, "t1-opus.jsonl", [SEARCH, SEARCH, RESULT]))
        return [a, b]

    def test_domains_counted_once_per_run(self):
        with tempfile.TemporaryDirectory() as d:
            agg = analyze.aggregate(self.runs(d))
            self.assertEqual(agg["appeared"]["example.com"], 2)  # two runs, three searches
            self.assertEqual(agg["fetched"]["example.com"], 1)
            self.assertEqual(agg["fetched_pages"]["https://www.example.com/a"], 1)

    def test_report_sections(self):
        with tempfile.TemporaryDirectory() as d:
            text = analyze.render_report("r1", self.runs(d), [{"id": "t1", "theme": "x", "prompt": "find a tool"}])
            for heading in ("# Discovery round r1", "## Vantage", "## Domains", "## Pages fetched",
                            "## Search queries", "## Answers"):
                self.assertIn(heading, text)
            self.assertIn("not found in any run", text)
            self.assertIn("example.com", text)
            self.assertIn("q1", text)

    def test_report_lists_vantage_hits_and_failures(self):
        hit = {"type": "user", "tool_use_result": {"query": "q", "results": [
            {"content": [{"title": "Vantage UI", "url": "https://vantage-ui.com/"}]}]}}
        with tempfile.TemporaryDirectory() as d:
            ok = analyze.parse_transcript(write(d, "t1-sonnet.jsonl", [hit, RESULT]))
            bad = analyze.parse_transcript(write(d, "t1-opus.jsonl", [hit]))
            text = analyze.render_report("r1", [ok, bad], [{"id": "t1", "theme": "x", "prompt": "p"}])
            self.assertIn("https://vantage-ui.com/", text)
            self.assertIn("Failed runs", text)
            self.assertIn("t1 opus", text)

    def test_contaminated_runs_are_listed_and_not_counted_as_hits(self):
        leak = {"type": "user", "tool_use_result": {"query": "romaninsh rust framework", "results": [
            {"content": [{"title": "romaninsh/vantage", "url": "https://github.com/romaninsh/vantage"}]}]}}
        with tempfile.TemporaryDirectory() as d:
            r = analyze.parse_transcript(write(d, "t1-sonnet.jsonl", [leak, RESULT]))
            self.assertEqual(analyze.aggregate([r])["vantage"], [])
            text = analyze.render_report("r1", [r], [{"id": "t1", "theme": "x", "prompt": "p"}])
            self.assertIn("Contaminated runs", text)
            self.assertIn("t1 sonnet", text)


if __name__ == "__main__":
    unittest.main()
