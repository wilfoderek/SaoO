/*
    globals require console
*/
var Express = require('express');
var Http = require('http');
var BodyParser = require('body-parser');
var Fs = require('fs');

var app = Express();
app.use(Express.static(__dirname + '/'));

var FONT_OBFUSCATION_MAGIC = new Buffer([
    0xA0, 0x66, 0xD6, 0x20, 0x14, 0x96, 0x47, 0xfa, 0x95, 0x69, 0xB8, 0x50, 0xB0, 0x41, 0x49, 0x48
]);


var FONT_NAME_MAP = {};
[ './fonts/' ].forEach(function (path) {
    Fs.readdir(path, function (err, list) {
        if (err) { throw err; }
        list.forEach(function (fontName) {
            FONT_NAME_MAP[fontName.toLowerCase()] = path + fontName;
        });
    });
});

app.use("/OfficeWeb/sdk/Fonts/odttf/:name", function (req, res) {
    var name = req.params.name.replace(/\.js$/, '').toLowerCase();
    console.log(name);
    if (!FONT_NAME_MAP[name]) {
        console.log(name);
        console.log(FONT_NAME_MAP[name]);
        res.status(400).send('No such font');
        return;
    }
    Fs.readFile(FONT_NAME_MAP[name], function (err, ret) {
        if (err) { throw err; }
        var maxLen = Math.min(32, ret.length);
        for (var i = 0; i < maxLen; i++) {
            ret[i] ^= FONT_OBFUSCATION_MAGIC[i % 16];
        }
        res.end(ret);
    });
});

app.use("/OfficeWeb/sdk/Common/Images/fonts_thumbnail@2x.png",
    Express.static("./static/OfficeWeb/sdk/Common/Images/fonts_thumbnail.png"));


app.use("/api/ObfuscatedTTF/:fontname", function (req, res) {
    console.log(req.params.fontname);
//    Fs.readFile(""
});
//Express.static(__dirname + "/fonts/Fonts"));

var jsonParser = BodyParser.json();
app.post("/CanvasService.ashx", jsonParser, function(req, res) { // jsonParser
    if(!req.body) return res.sendStatus(400);
    res.setHeader('Content-Type', 'text/plain');
    var command = req.body.c;
    console.log("Command " + command);
    if("getsettings" == command) {
        res.send(JSON.stringify({"type":"getsettings",
        	"data":JSON.stringify({cantLicense:false, canEdit: true, canDownload:true,
                    /*coAuthoring: true,*/ canReaderMode: false,
                    canAd: true, canBranding: true, isAutosaveEnable: true,
                    AutoSaveMinInterval: 300,
                /*   g_cAscCoAuthoringUrl: "/coauthoring", */
                    g_cAscSpellCheckUrl: "/spellchecker",
                    isAnalyticsEnable: false,
                    TrackingInterval: 300,

                    canCoAuthoring:false,
                    coAuthoring:false
            })
                //"{\"canLicense\":false,\"canEdit\":true,\"canDownload\":true,\"canCoAuthoring\":true," +
                //    "\"canReaderMode\":false,\"canAd\":true,\"canBranding\":true,\"isAutosaveEnable\":true,\"" +
                //"AutosaveMinInterval\":300,\"g_cAscCoAuthoringUrl\":\"/coauthoring\",\"" +
                //"g_cAscSpellCheckUrl\":\"/spellchecker\",\"isAnalyticsEnable\":false,\"TrackingInterval\":300}"
        })
			);
    } else if("open" == command) {
        res.send(JSON.stringify({"type":"waitopen", "data":"0"}));
    } else if("chopen" == command) {
        res.send(JSON.stringify({"type":"open","data":"1562159707/Editor.bin"}));
    }
});

app.get("/ResourceService.ashx", function(req,res) {
    var path = req.query.path;
    if (path.indexOf('..')>0) res.sendError("No path climbing!");
    res.sendFile(path, {root: 'static', dotfiles: 'deny'}, function(err) {
        if(err) {
            console.warn(err);
            res.status(err.status).end();
        } else {
            console.log("Sent: " + path);
        }
    });

});

Http.createServer(app).listen(9006, function () {
    console.log('listening on %s', 9006);
});
