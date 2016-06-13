# StandAlone OnlyOffice (SAOO)

This fork of [OnlyOffice's DocumentServer](https://github.com/ONLYOFFICE/DocumentServer) is an
attempt to create a purely NodeJS-based online editor for Office documents with the fidelity
or OnlyOffice.

Thus far, it is a recipe to port a standalone editor for spreadsheets based on a running
instance of the OnlyOffice installed over Docker and on the source of OnlyOffice.

Progressively, the source will be more used and the running instance will not be used anymore.

## How to Install (and run)

* Install [NodeJS](http://nodejs.org/)
* Checkout this project (e.g. download zip or git clone)
* type `./do` in the shell
* Direct your browser to [`http://localhost:9006/`](http://localhost:9006/)

## Arguments to `./do`

* `--apponly` if you have only made changes in the OfficeWeb/apps directory
* `--sdkonly` if you have only made changes in the OfficeWeb/sdk directory
* `--fast` try to make the build faster (makes speed of SDK build way way faster)
