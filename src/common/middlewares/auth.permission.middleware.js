const { roles } = require("../roles");

function grantAccess(action, resource) {
  return async (req, res, next) => {
    try {
      if (Array.isArray(action)) {
        const permissions = action.map(act =>
          roles.can(req.jwt.role)[act](resource)
        );

        const isGranted = permissions.some(permission => !!permission.granted);

        if (!isGranted) {
          return res.status(403).json({
            status: "error",
            message: "Unauthorized access"
          });
        }
      } else {
        const permission = roles.can(req.jwt.role)[action](resource);

        if (!permission.granted) {
          return res.status(403).json({
            status: "error",
            message: "Unauthorized access"
          });
        }
      }

      next();
    } catch (error) {
      res.status(401).json({
        status: "error",
        message: error.message
      });
    }
  };
}

exports.isSameUserOrAdmin = (request, response, next) => {
  let userId = request.jwt.userId;
  // console.log(userId, request.params.id);

  if (request.params && request.params.id && request.params.id === userId) {
    return next();
  } else {
    if (request.jwt.role === "admin") {
      return next();
    } else {
      return response
        .status(403)
        .send({ status: "error", message: "Unauthorized access" });
    }
  }
};

exports.isAdmin = (request, response, next) => {
  if (request.jwt.role === "admin") {
    return next();
  } else {
    return response
      .status(403)
      .send({ status: "error", message: "Unauthorized access" });
  }
};

/*
exports.onlySameUserCanDoThisAction = (request, response, next) => {
  let userId = request.jwt.userId;
  if (request.params != userId) {
    response
      .status(403)
      .send({ status: "error", message: "Unauthorized access" });
  } else {
    return next();
  }
};
*/

exports.grantAccess = grantAccess;
