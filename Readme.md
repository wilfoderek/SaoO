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

## Areas of investigations

* Something that produces `Editor.bin` ? (seems open as per [this thread](http://dev.onlyoffice.org/viewtopic.php?f=44&t=6859)).
  Investigations thus far seem to show me that the file is almost produced through proprietary code.
