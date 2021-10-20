const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index.js");

const passport = require("passport");
require("./middlewares/passport");

require("./db.js");

const server = express();

server.name = "API";
server.use(cookieParser());
server.use(cors());
server.use(express.urlencoded({ extended: false, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));

server.use(morgan("dev"));

server.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.all("*", function (req, res, next) {
  passport.authenticate("bearer", (err, user) => {
    if (err) return next(err);
    if (user) {
      req.user = user;
    }
    return next();
  })(req, res, next);
});

server.use("/", routes);

server.use(passport.initialize());

// Error catching endware.
server.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
