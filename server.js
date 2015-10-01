var express = require("express");
var app = express();

app.use(express.static(__dirname + "/"));
app.use(express.static(__dirname + "/web"));

app.listen(4000);

console.log("Node server running on 4000");