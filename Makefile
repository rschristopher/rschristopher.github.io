.PHONY: build clean run

build: clean
	mkdir docs
	poetry run mkdocs build
	echo -n 'isbitcointrue.com' > docs/CNAME

clean:
	rm -rf docs

run: build
	poetry run mkdocs serve

