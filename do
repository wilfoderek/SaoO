#!/bin/bash
die() { echo $1; exit 100; }
which npm >/dev/null 2>/dev/null || die "requires nodejs and npm"
which grunt >/dev/null 2>/dev/null || die "requires grunt, try npm install -g grunt-cli"

if ! [[ $* == *--apponly* ]]; then
    ( cd ./OfficeWeb/sdk/build/opensource/ && npm install && grunt $@ ) || die "failed to build sdk"
fi
if ! [[ $* == *--sdkonly* ]]; then
    ( cd ./OfficeWeb/build && npm install && grunt $@ ) || die "failed to build app"
else
    for x in Excel PowerPoint Word; do
        if [ -e ./OfficeWeb/deploy/sdk/$x/sdk-all.js ]; then
            echo "cp ./OfficeWeb/sdk/$x/sdk-all.js ./OfficeWeb/deploy/sdk/$x/sdk-all.js"
            cp ./OfficeWeb/sdk/$x/sdk-all.js ./OfficeWeb/deploy/sdk/$x/sdk-all.js
        fi
    done
fi

npm install || die "failed npm install"
echo "Looks like it worked, type node ./server.js and navigate your browser to localhost:9006"
