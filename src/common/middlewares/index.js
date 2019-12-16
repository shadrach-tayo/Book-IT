const createAuthValidation = require("./auth.validation.middleware");
const permissionsMiddleware = require("./auth.permission.middleware");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const crypto = require("crypto");

// initialize middlewares
const authValidationMiddleware = createAuthValidation({
  jwt,
  config,
  crypto
});

module.exports = { authValidationMiddleware, permissionsMiddleware };
