const createAdminRoutes = ({
  multer,
  makeCallback,
  adminController,
  authValidationMiddleware,
  permissionsMiddleware,
  permissions
}) => {
  const upload = multer();

  return function(router) {
    router.post(
      "/admin/signup",
      upload.none(),
      makeCallback(adminController.Signup)
    );
  };
};

module.exports = createAdminRoutes;
