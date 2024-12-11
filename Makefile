tsc:
	npm run tsc

tsc-watch:
	npm run tsc:watch

pretty: ## Runs Prettier on all files
	npm run pretty

lint: ## Runs ESLint on all files
	npm run lint

check: pretty lint tsc
check: ## Runs all the checks and tests we have

clean: ## Cleans ./dist
	rm -rf dist/*

build: clean tsc
build:
	npm run compile
	grep -v '\"private\":' package.json > ./dist/package.json

publish: ## Build, tag, and publish to npmjs
	./publish.sh

.DEFAULT_GOAL := help

help: ## Prints this help.
	@grep -h -E '^[a-zA-Z1-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
