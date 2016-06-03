#!/bin/bash
die() { echo $1; exit 100; }
which npm >/dev/null 2>/dev/null || die "requires nodejs and npm"
which grunt >/dev/null 2>/dev/null || die "requires grunt, try npm install -g grunt-cli"
( cd ./OfficeWeb/sdk/build/opensource/ && npm install && grunt ) || die "failed to build sdk"
( cd ./OfficeWeb/build && npm install && grunt ) || die "failed to build app"
npm install || die "failed npm install"
echo "Looks like it worked, type node ./server.js and navigate your browser to localhost:9006"
