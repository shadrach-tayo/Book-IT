var createError = require("http-errors");
var express = require("express");
const mongoose = require("mongoose");
const loader = require("./loaders");
const dotenv = require("dotenv");
require("./setupdb");
const config = require("./config");

dotenv.config();

// // call function to setup database
// setupDB();

// user defined
const routes = require("./routes");

var app = express();
const router = express.Router();

// setup routes
routes(router);

// initialize loaders
loader(app);

app.use("/", router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
