# StandAlone OnlyOffice (SAOO)

This fork of [OnlyOffice's DocumentServer](https://github.com/ONLYOFFICE/DocumentServer) is an
attempt to create a purely NodeJS-based online editor for Office documents with the fidelity
or OnlyOffice.

Thus far, it is a recipe to port a standalone editor for spreadsheets based on a running
instance of the OnlyOffice installed over Docker and on the source of OnlyOffice.

Progressively, the source will be more used and the running instance will not be used anymore.

## How to Install

* Install [nginx](http://nginx.com)
* Install [NodeJS](http://nodejs.org/)
* Install [MySQL](http://mysql.org/)
* Checkout this project (e.g. download zip or git clone)
* Create a MySQL database and run `deploy/Schema/MySql.CreateDb.sql` on it and add user-name
  and passwords on `deploy/CoAuthoringService/CoAuthoring/sources/config.json`
* Adapt and install `onlyoffice-nginx.conf` (especially the path to the static directory)
* From the home directory invoke `xbuild OnlineEditorsExample/OnlineEditorsExample.csproj`
* In one shell, invoke `node ./deploy/CoAuthoringService/CoAuthoring/sources/server.js`
* In another shell, invoke `node mimick/app.js`
* Direct your browser to [`http://localhost/docEditorAttempt.html`](http://127.0.0.1/docEditorAttempt.html)

## Areas of investigations

* Something that produces `Editor.bin` ? (seems open as per [this thread](http://dev.onlyoffice.org/viewtopic.php?f=44&t=6859)).
  Investigations thus far seem to show me that the file is almost produced through proprietary code.
* Something that produces fonts? Currently this is a breaking case.
* A complete build system

