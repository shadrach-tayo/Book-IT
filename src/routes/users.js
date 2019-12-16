const createUserRoutes = ({
  multer,
  makeCallback,
  userController,
  authValidationMiddleware,
  permissionsMiddleware
}) => {
  const upload = multer();

  return function(router) {
    router.post("/signup", upload.none(), makeCallback(userController.Signup));
    // router.post("/login", upload.none(), makeCallback(userController.Login));
    router.get(
      "/users/:id",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess(["readAny", "readOwn"], "profile"),
        permissionsMiddleware.isSameUserOrAdmin
      ],
      makeCallback(userController.getById)
    );
    router.get(
      "/user",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess("readOwn", "profile")
      ],
      makeCallback(userController.getSingleUser)
    );
    router.get(
      "/users",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess("readAny", "profile")
      ],
      makeCallback(userController.listUsers)
    );
    router.put(
      "/users/:id",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess(
          ["updateAny", "updateOwn"],
          "profile"
        ),
        permissionsMiddleware.isSameUserOrAdmin
      ],
      makeCallback(userController.updateById)
    );
    router.delete(
      "/users/:id",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.grantAccess("deleteAny", "profile")
      ],
      makeCallback(userController.deleteById)
    );
  };
};

module.exports = createUserRoutes;
