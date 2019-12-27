const createAdminRoutes = ({ multer, makeCallback, adminController }) => {
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
