var express = require('express');
var router = express.Router();
var loginApi = require('./controllers/login-api')();
var logoutApi = require('./controllers/logout-api')();
var signUpApi = require('./controllers/signUp-api')();
var serviceTypesApi = require('./controllers/select-services-api')();
var applyVoucherApi = require('./controllers/apply-voucher-api')();
var authenticationApi = require('./controllers/authentication-api')();
var placeRequestApi = require('./controllers/place-request-api')();
var cancelOrderApi = require('./controllers/cancel-order-api')();
var isServiceAvailableApi = require('./controllers/service-availability-api')();
var myAccountApi = require('./controllers/my-account-api')();

router.all("*", authenticationApi.checkAuthentication);
router.post("/login", loginApi.loginAuth);
router.post("/logout", logoutApi.doLogout);
router.post("/isLoggedIn", authenticationApi.isLoggedIn);
router.post("/isServiceAvailable", isServiceAvailableApi.checkServiceAvailability);
router.post("/signUp", signUpApi.signUp);
router.get("/serviceTypes", serviceTypesApi.getServiceTypes);
router.post("/applyVoucher", applyVoucherApi.applyVoucher);
router.post("/place-order", placeRequestApi.placeRequest);
router.get("/open-order", placeRequestApi.getOpenOrderDetails);
router.post("/cancel-order", cancelOrderApi.cancelOrder);
router.get("/account", myAccountApi.getMyAccountDetails);
router.post("/account", myAccountApi.saveMyAccount);
router.post("/change-password", myAccountApi.changePassword);


module.exports = router;
