const express = require("express");
const router = express.Router();
const postLogin = require("./controllers/login_controllers/postlogin")

router.post("/", postLogin)

module.exports = router