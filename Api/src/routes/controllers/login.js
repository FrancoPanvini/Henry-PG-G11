const express = require("express");
const forgotPassword = require("./services/login_services/postForgotPassword");
const router = express.Router();
const postLogin = require("./services/login_services/postlogin");
const newPassword = require("./services/login_services/postNewPassword");

router.post("/", postLogin);
router.post("/forgot", forgotPassword)
router.post("/newpass", newPassword)

module.exports = router;
