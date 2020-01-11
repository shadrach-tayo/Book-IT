const createUserService = require("./user");
const createAdminService = require("./admin");
const createAuthenticationService = require("./auth");
const createHotelService = require("./hotel");
const createRoomService = require("./room");
const createReservationService = require("./reservation");
const crypto = require("crypto");
const config = require("../config");
const jwt = require("jsonwebtoken");
const { sanitizeUserData } = require("../utils");

const {
  userDb,
  adminDb,
  HotelDb,
  RoomDb,
  ReservationDb
} = require("../data-access");

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

const RoomService = createRoomService({
  RoomDb,
  HotelDb
});

const ReservationService = createReservationService({
  ReservationDb,
  RoomDb,
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
  RoomService,
  HotelService,
  AdminService,
  ReservationService,
  AuthService: AuthenticationService
};
