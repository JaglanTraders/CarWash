var express = require('express');
var router = express.Router();
var loginApi = require('./controllers/login-api')();
var signUpApi = require('./controllers/signUp-api')();
var serviceTypesApi = require('./controllers/select-services-api')();
var applyVoucherApi = require('./controllers/apply-voucher-api')();

router.post("/login", loginApi.loginAuth);
router.post("/signUp", signUpApi.signUp);
router.get("/serviceTypes", serviceTypesApi.getServiceTypes);
router.post("/applyVoucher", applyVoucherApi.applyVoucher);


module.exports = router;
