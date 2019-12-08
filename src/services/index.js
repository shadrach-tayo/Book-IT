const createUserService = require("./user");
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

module.exports = { UserService };
