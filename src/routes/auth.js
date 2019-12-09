const createAuthRoutes = ({
  multer,
  makeCallback,
  userController,
  authController,
  verifyUserMiddleware,
  authValidationMiddleware
}) => {
  const upload = multer();

  return function(router) {
    router.post(
      "/auth",
      [upload.none(), verifyUserMiddleware.isPasswordAndUserMatch],
      makeCallback(userController.Login)
    );
    router.post(
      "/auth/refresh",
      [
        upload.none(),
        authValidationMiddleware.verifyRefreshBodyField,
        authValidationMiddleware.validRefreshNeeded
      ],
      makeCallback(authController.refreshToken)
    );
  };
};

module.exports = createAuthRoutes;
