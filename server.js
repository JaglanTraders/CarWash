var express = require("express");
var app = express();
var mongojs = require("mongojs"); // To communicate with mongodb
var db = mongojs("ursurvey", ["userList"]);
var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/"));
app.use(express.static(__dirname + "/web"));
app.use(bodyParser.json());

app.post("/login", function (req, res) {
    console.log("recieved post request", req.body);
    db.userList.find(function(err, docs){
        res.json(docs);
    });
});

app.listen(4000);
console.log("Node server running on 4000");