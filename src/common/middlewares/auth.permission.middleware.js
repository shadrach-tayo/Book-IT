exports.minimumPermissionLevelRequired = required_permission_level => {
  return (request, response, next) => {
    const userPermissionLevel = parseInt(request.jwt.permissionLevel);
    // console.log(
    //   "jtw ",
    //   required_permission_level,
    //   userPermissionLevel,
    //   userPermissionLevel & required_permission_level
    // );
    if (userPermissionLevel & required_permission_level) {
      return next();
    }
    response
      .status(403)
      .send({ status: "error", message: "Unauthorized access" });
  };
};

exports.onlySameUserOrAdminCanDoThisAction = function(ADMIN_PERMISSION) {
  return (request, response, next) => {
    let userId = request.jwt.userId;
    console.log(userId, request.params.id);
    if (request.params && request.params.id && request.params.id === userId) {
      return next();
    } else {
      console.log("jtw ", request.jwt, ADMIN_PERMISSION);
      const userPermissionLevel = parseInt(request.jwt.permissionLevel);
      if (userPermissionLevel & ADMIN_PERMISSION) {
        return next();
      } else {
        return response
          .status(403)
          .send({ status: "error", message: "Unauthorized access" });
      }
    }
  };
};

exports.onlySameUserCanDoThisAction = () => {
  return (request, response, next) => {
    let userId = request.jwt.userId;
    if (request.params != userId) {
      response
        .status(403)
        .send({ status: "error", message: "Unauthorized access" });
    } else {
      return next();
    }
  };
};
