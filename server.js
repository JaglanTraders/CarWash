var express = require("express");
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ursurvey');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("connected to db 'ursurvey'");
    //mongoose.model("userList");
});

var router = express.Router();

//var mongojs = require("mongojs"); // To communicate with mongodb
//var db = mongojs("ursurvey", ["userList"]);
var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/"));
app.use(express.static(__dirname + "/web"));
app.use(bodyParser.json());
app.use('/api', router);

var appRoutes = require('./api/routes')
    appRoutes(app);

//router.post("/login", function (req, res) {
//    console.log("recieved post request", req.body);
//    if(req.body.userId == null || req.body.password == null)
//        res.status(404).send({message : "Invalid Username/Password"});
//    db.userList.find(req.body, function(err, docs){
//        if(docs.length != 0)
//            res.json(docs);
//        else
//            res.status(404).send({message : "Invalid Username/Password"});
//    });
//});

app.listen(4000);
console.log("Node server running on 4000");