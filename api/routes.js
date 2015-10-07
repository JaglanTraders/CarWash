module.exports = function(app){
    app.post("/login", function (req, res) {
        console.log("recieved post request", req.body);
        if(req.body.userId == null || req.body.password == null)
            res.status(404).send({message : "Invalid Username/Password"});
        db.userList.find(req.body, function(err, docs){
            if(docs.length != 0)
                res.json(docs);
            else
                res.status(404).send({message : "Invalid Username/Password"});
        });
    });
}