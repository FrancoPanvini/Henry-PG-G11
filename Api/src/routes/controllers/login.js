const express = require("express");
const router = express.Router();
const postLogin = require("./services/login_services/postlogin");

router.post("/", postLogin);

module.exports = router;
