var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var jsonParser = bodyParser.json();


app.post("/PseudoOfficeResourceServer/CanvasService.ashx", jsonParser, function(req, res) { // jsonParser
    if(!req.body) return res.sendStatus(400);
    res.setHeader('Content-Type', 'text/plain');
    var command = req.body.c;
    console.log("Command " + command);
    if("getsettings" == command) {
        res.send(JSON.stringify({"type":"getsettings",
        	"data":"{\"canLicense\":false,\"canEdit\":true,\"canDownload\":true,\"canCoAuthoring\":true,\"canReaderMode\":false,\"canAd\":true,\"canBranding\":true,\"isAutosaveEnable\":true,\"AutosaveMinInterval\":300,\"g_cAscCoAuthoringUrl\":\"/coauthoring\",\"g_cAscSpellCheckUrl\":\"/spellchecker\",\"isAnalyticsEnable\":false,\"TrackingInterval\":300}"})        
			);
    } else if("open" == command) {
        res.send(JSON.stringify({"type":"waitopen", "data":"0"}));
    } else if("chopen" == command) {
        res.send(JSON.stringify({"type":"open","data":"1562159707/Editor.bin"}));
    }
});

app.get("/PseudoOfficeResourceServer/ResourceService.ashx", function(req,res) {
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

app.listen(8080);

