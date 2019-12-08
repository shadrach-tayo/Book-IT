const createAuthValidation = require("./auth.validation.middleware");
const permissionsMiddleware = require("./auth.permission.middleware");
const jwt = require("jsonwebtoken");
const config = require("../../config");

// initialize middlewares
const authValidationMiddleware = createAuthValidation({
  jwt,
  config
});

module.exports = { authValidationMiddleware, permissionsMiddleware };
