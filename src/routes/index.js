const multer = require("multer");
const { userController, authController } = require("../controllers");
const makeCallback = require("./callback");
const permissions = require("../common/permissions");

// middlewares
const { verifyUserMiddleware } = require("../authorization/middlewares");
const {
  authValidationMiddleware,
  permissionsMiddleware
} = require("../common/middlewares");

const createUserRoutes = require("./users");
const createAdminRoutes = require("./admin");
const createAuthRoutes = require("./auth");

const userRoute = createUserRoutes({
  multer,
  makeCallback,
  userController,
  authValidationMiddleware,
  permissionsMiddleware,
  permissions
});

const adminRoute = createAdminRoutes({
  multer,
  makeCallback,
  userController,
  authValidationMiddleware,
  permissionsMiddleware,
  permissions
});

const authRoute = createAuthRoutes({
  multer,
  makeCallback,
  userController,
  authController,
  verifyUserMiddleware,
  authValidationMiddleware
});

module.exports = router => {
  userRoute(router);
  authRoute(router);
  adminRoute(router);

  /* GET home page. */

  router.route("/").get(function(req, res, next) {
    res.render("index", { title: "Express" });
  });
};
