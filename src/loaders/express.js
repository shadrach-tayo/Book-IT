var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");

// user defined
const routes = require("../routes");

function createError(status) {
  return (req, res, next) => {
    const error = { status, message: "Server error" };
    next(error);
  };
}

module.exports = async app => {
  // view engine setup
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "jade");

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "../../public")));

  // setup routes
  const router = express.Router();
  routes(router);
  app.use("/", router);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404)); // write the create error function
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
};
