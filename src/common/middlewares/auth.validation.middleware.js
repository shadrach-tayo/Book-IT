function createAuthValidation({ config, jwt }) {
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
      return response.status(401).send({ status: "error" });
    }
  }

  return { validJWTNeeded };
}

module.exports = createAuthValidation;
