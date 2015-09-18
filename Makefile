KARMA = ./node_modules/protractor/bin/protractor test/protractor_conf.js

install:; @npm install

test: test.dev test.min
test.dev:; @${KARMA}
test.min:; @MINIFY=true ${KARMA}

.PHONY: install test test.dev test.min
