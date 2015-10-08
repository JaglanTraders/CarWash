var express = require("express");
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ursurvey');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("connected to db 'ursurvey'");
});

var router = require('./api/routes');

//var mongojs = require("mongojs"); // To communicate with mongodb
//var db = mongojs("ursurvey", ["userList"]);
var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/"));
app.use(express.static(__dirname + "/web"));
app.use(bodyParser.json());
app.use('/api', router);

app.listen(4000);
console.log("Node server running on 4000");