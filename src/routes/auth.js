const createAuthRoutes = ({
  multer,
  makeCallback,
  authController,
  verifyUserMiddleware,
  authValidationMiddleware
}) => {
  const upload = multer();

  return function(router) {
    router.post(
      "/auth",
      [upload.none(), verifyUserMiddleware.isPasswordAndUserMatch],
      makeCallback(authController.Login)
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
