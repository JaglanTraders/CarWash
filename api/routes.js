var express = require('express');
var router = express.Router();
var loginApi = require('./controllers/login-api')();
var logoutApi = require('./controllers/logout-api')();
var signUpApi = require('./controllers/signUp-api')();
var serviceTypesApi = require('./controllers/select-services-api')();
var applyVoucherApi = require('./controllers/apply-voucher-api')();
var authenticationApi = require('./controllers/authentication-api')();

router.all("*", authenticationApi.checkAuthentication);
router.post("/login", loginApi.loginAuth);
router.post("/logout", logoutApi.doLogout);
router.post("/isLoggedIn", authenticationApi.isLoggedIn);
router.post("/signUp", signUpApi.signUp);
router.get("/serviceTypes", serviceTypesApi.getServiceTypes);
router.post("/applyVoucher", applyVoucherApi.applyVoucher);


module.exports = router;
