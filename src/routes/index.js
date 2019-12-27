const multer = require("multer");
const {
  userController,
  authController,
  adminController,
  hotelController
} = require("../controllers");
const makeCallback = require("./callback");

// middlewares
const { verifyUserMiddleware } = require("../authorization/middlewares");
const {
  authValidationMiddleware,
  permissionsMiddleware
} = require("../common/middlewares");

const createUserRoutes = require("./users");
const createAdminRoutes = require("./admin");
const createAuthRoutes = require("./auth");
const createHotelRoutes = require("./hotel");

const userRoute = createUserRoutes({
  multer,
  makeCallback,
  userController,
  authValidationMiddleware,
  permissionsMiddleware
});

const hotelRoute = createHotelRoutes({
  multer,
  makeCallback,
  hotelController,
  authController,
  authValidationMiddleware,
  verifyUserMiddleware,
  permissionsMiddleware
});

const adminRoute = createAdminRoutes({
  multer,
  makeCallback,
  adminController,
  authValidationMiddleware,
  permissionsMiddleware
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
  hotelRoute(router);

  /* GET home page. */

  router.route("/").get(function(req, res, next) {
    res.render("index", { title: "Express" });
  });
};
