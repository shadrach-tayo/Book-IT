const createUserService = require("./user");
const createAdminService = require("./admin");
const createAuthenticationService = require("./auth");
const crypto = require("crypto");
const config = require("../config");
const jwt = require("jsonwebtoken");
const { sanitizeUserData } = require("../utils");

const { userDb } = require("../data-access");

const UserService = createUserService({
  userDb,
  crypto,
  config,
  jwt,
  sanitizeUserData
});

const AdminService = createAdminService({
  userDb,
  crypto,
  config,
  jwt,
  sanitizeUserData
});

const AuthenticationService = createAuthenticationService({
  userDb,
  crypto,
  config,
  jwt,
  sanitizeUserData
});

module.exports = { UserService, AuthService: AuthenticationService };
