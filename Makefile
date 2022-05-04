.PHONY: build run

build: clean
	mkdir docs
	mkdocs build

clean:
	rm -rf docs

run: build
	mkdocs serve

