function createAuthValidation({ config, jwt, crypto }) {
  async function validJWTNeeded(request, response, next) {
    if (request.headers["authorization"]) {
      try {
        const authorization = request.headers["authorization"].split(" ");
        if (authorization[0] !== "Bearer") {
          return response
            .status(401)
            .send({ status: "error", message: "Not authorized" });
        } else {
          request.jwt = jwt.verify(authorization[1], config.jwtSecret);
          return next();
        }
      } catch (error) {
        return response
          .status(403)
          .send({ status: "error", message: error.message });
      }
    } else {
      // authorization header not set
      return response
        .status(401)
        .send({ status: "error", message: "Unauthorized Access" });
    }
  }

  async function verifyRefreshBodyField(request, response, next) {
    if (request.body && request.body.refresh_token) {
      return next();
    } else {
      response
        .status(400)
        .send({ status: "error", message: "Refresh token field is empty" });
    }
  }

  async function validRefreshNeeded(request, response, next) {
    const b = new Buffer(request.body.refresh_token, "base64");
    const refresh_token = b.toString();
    const hash = crypto
      .createHmac("sha512", request.jwt.refreshKey)
      .update(request.jwt.userId + config.jwtSecret)
      .digest("base64");
    if (hash === refresh_token) {
      request.body = request.jwt;
      return next();
    } else {
      response
        .status(400)
        .send({ status: "error", message: "Invalid refresh token" });
    }
  }

  return { validJWTNeeded, validRefreshNeeded, verifyRefreshBodyField };
}

module.exports = createAuthValidation;
