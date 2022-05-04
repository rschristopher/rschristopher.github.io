.PHONY: build run

build:
	git checkout docs
	git pull
	mkdocs build

run: build
	mkdocs serve

