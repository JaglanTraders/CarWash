var express = require("express");
var app = express();
var fs = require('fs');
var morgan = require('morgan');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var session = require('express-session')
var db = mongoose.connection;
var router = require('./api/routes');
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/log/access.log', {flags: 'a'});
// setup the logger
app.use(morgan('dev', {stream: accessLogStream}));

mongoose.connect('mongodb://localhost/ursurvey');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("connected to db 'ursurvey'");
});

app.use(session({
    name : "JTSessionId",
    secret: 'jt',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(__dirname + "/"));
app.use(express.static(__dirname + "/web"));
app.use(bodyParser.json());
app.use('/api', router);

app.listen(4000);
console.log("Node server running on 4000");