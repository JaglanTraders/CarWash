var express = require('express');
var router = express.Router();
var loginApi = require('./controllers/login-api')();
var signUpApi = require('./controllers/signUp-api')();

router.post("/login", loginApi.loginAuth);
router.post("/signUp", signUpApi.signUp);


module.exports = router;
