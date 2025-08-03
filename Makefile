.PHONY: build clean run

build: clean
	mkdir -p docs/.well-known
	poetry run mkdocs build
	echo -n 'bitcoinistrue.com' > docs/CNAME
	cp _config.yml docs/_config.yml
	cp nostr.json docs/.well-known/nostr.json

clean:
	rm -rf docs

run: build
	poetry run mkdocs serve

