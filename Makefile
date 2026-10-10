# Vantage UI site — build helpers
#
# Requires: zola (brew install zola), tailwindcss standalone CLI
# (brew install tailwindcss), node+playwright for snapshots.

.PHONY: css css-watch dev build snapshots clean

css:
	tailwindcss -i css/main.css -o static/main.css --minify

css-watch:
	tailwindcss -i css/main.css -o static/main.css --watch

# Run Tailwind in watch mode alongside zola serve; Ctrl-C stops both.
# `data/` holds files templates read with load_data (the glossary), which zola
# doesn't watch by default.
dev:
	tailwindcss -i css/main.css -o static/main.css --watch & \
	trap "kill $$!" EXIT; \
	zola serve --extra-watch-path data

build: css
	zola build

# Capture page snapshots. BASE_URL/OUT_DIR are honoured, e.g.
#   BASE_URL=http://127.0.0.1:1111 OUT_DIR=snapshots/local make snapshots
snapshots:
	node snapshots/capture.mjs

clean:
	rm -rf public static/main.css
