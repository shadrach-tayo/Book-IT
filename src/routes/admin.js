const createAdminRoutes = ({
  multer,
  makeCallback,
  userController,
  authValidationMiddleware,
  permissionsMiddleware,
  permissions
}) => {
  const upload = multer();

  return function(router) {
    router.post("/signup", upload.none(), makeCallback(userController.Signup));
    router.post("/login", upload.none(), makeCallback(userController.Login));
    router.get(
      "/users/:id",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.minimumPermissionLevelRequired(permissions.FREE),
        permissionsMiddleware.onlySameUserOrAdminCanDoThisAction(
          permissions.ADMIN
        )
      ],
      makeCallback(userController.getById)
    );
    router.get(
      "/user",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.minimumPermissionLevelRequired(permissions.FREE)
      ],
      makeCallback(userController.getSingleUser)
    );
    router.get(
      "/users",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.minimumPermissionLevelRequired(permissions.FREE)
      ],
      makeCallback(userController.listUsers)
    );
    router.put(
      "/users/:id",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.minimumPermissionLevelRequired(
          permissions.CAN_EDIT_USER
        ),
        permissionsMiddleware.onlySameUserOrAdminCanDoThisAction(
          permissions.CAN_EDIT_ALL
        )
      ],
      makeCallback(userController.updateById)
    );
    router.delete(
      "/users/:id",
      [
        upload.none(),
        authValidationMiddleware.validJWTNeeded,
        permissionsMiddleware.minimumPermissionLevelRequired(
          permissions.CAN_DELETE_USER
        )
      ],
      makeCallback(userController.deleteById)
    );
  };
};

module.exports = createAdminRoutes;
