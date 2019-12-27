const createUserService = require("./user");
const createAdminService = require("./admin");
const createAuthenticationService = require("./auth");
const createHotelService = require("./hotel");
const crypto = require("crypto");
const config = require("../config");
const jwt = require("jsonwebtoken");
const { sanitizeUserData } = require("../utils");

const { userDb, adminDb, HotelDb } = require("../data-access");

const UserService = createUserService({
  userDb,
  crypto,
  config,
  jwt,
  sanitizeUserData
});

const HotelService = createHotelService({
  HotelDb
});

const AdminService = createAdminService({
  userDb,
  adminDb,
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

module.exports = {
  UserService,
  HotelService,
  AuthService: AuthenticationService,
  AdminService
};
