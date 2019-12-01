const { userController } = require("../controllers");
const makeCallback = require("./callback");
const multer = require("multer");

// middlewares
const { verifyUserMiddleware } = require("../authorization/middlewares");
const { authValidationMiddleware } = require("../common/middlewares");

const createUserRoutes = require("./users");
const createAuthRoutes = require("./auth");

const userRoute = createUserRoutes({
  multer,
  makeCallback,
  userController,
  authValidationMiddleware
});

const authRoute = createAuthRoutes({
  multer,
  makeCallback,
  userController,
  verifyUserMiddleware
});

module.exports = router => {
  userRoute(router);
  authRoute(router);

  /* GET home page. */

  router.route("/").get(function(req, res, next) {
    res.render("index", { title: "Express" });
  });
};
