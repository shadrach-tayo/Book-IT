const { UserService } = require("../../services");
const crypto = require("crypto");
const createVerifyUserMiddleware = require("./verify.user.middleware");

// initialize middlewares
const verifyUserMiddleware = createVerifyUserMiddleware({
  UserService,
  crypto
});

module.exports = { verifyUserMiddleware };
