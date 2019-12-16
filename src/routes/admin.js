const createAdminRoutes = ({
  multer,
  makeCallback,
  adminController,
  authValidationMiddleware,
  permissionsMiddleware,
  permissions
}) => {
  const upload = multer();

  return function(router) {};
};

module.exports = createAdminRoutes;
