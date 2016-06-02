/*
    globals require console
*/
var Express = require('express');
var Http = require('http');

var app = Express();
app.use(Express.static(__dirname + '/'));

Http.createServer(app).listen(9006, function () {
    console.log('listening on %s', 9006);
});
