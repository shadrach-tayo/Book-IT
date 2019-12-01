const createAuthRoutes = ({
  multer,
  makeCallback,
  userController,
  verifyUserMiddleware
}) => {
  const upload = multer();

  return function(router) {
    router.post(
      "/auth",
      [upload.none(), verifyUserMiddleware.isPasswordAndUserMatch],
      makeCallback(userController.Login)
    );
  };
};

module.exports = createAuthRoutes;
