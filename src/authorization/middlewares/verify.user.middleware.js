function createVerifyUserMiddleware({ userDb, crypto }) {
  async function isPasswordAndUserMatch(request, response, next) {
    try {
      const user = await userDb.findByEmail(request.body.email);
      const passwordFields = user.password.split("$");

      const salt = passwordFields[0];
      const hash = crypto
        .createHmac("sha512", salt)
        .update(request.body.password)
        .digest("base64");

      if (hash === passwordFields[1]) {
        request.body = {
          userId: user.id,
          email: user.email,
          role: user.role,
          provider: "email",
          name: user.firstname + " " + user.lastname
        };
        return next();
      } else {
        // passwords do not match
        return response
          .status(400)
          .send({ status: "error", errors: ["Invalid email or password"] });
      }
    } catch (error) {
      return response
        .status(400)
        .send({ status: "error", message: error.message });
    }
  }

  return { isPasswordAndUserMatch };
}

module.exports = createVerifyUserMiddleware;
