const createUserRoutes = ({
  multer,
  makeCallback,
  userController,
  authValidationMiddleware
}) => {
  const upload = multer();

  return function(router) {
    router.post("/signup", upload.none(), makeCallback(userController.Signup));
    router.post("/login", upload.none(), makeCallback(userController.Login));
    router.get(
      "/user/:id",
      [upload.none(), authValidationMiddleware.validJWTNeeded],
      makeCallback(userController.getById)
    );
    router.get(
      "/user",
      [upload.none(), authValidationMiddleware.validJWTNeeded],
      makeCallback(userController.getSingleUser)
    );
    router.get(
      "/users",
      [upload.none(), authValidationMiddleware.validJWTNeeded],
      makeCallback(userController.listUsers)
    );
    router.put(
      "/user/:id",
      [upload.none(), authValidationMiddleware.validJWTNeeded],
      makeCallback(userController.updateById)
    );
  };
};

module.exports = createUserRoutes;
