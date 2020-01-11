const {
  UserService,
  AuthService,
  AdminService,
  HotelService,
  RoomService,
  ReservationService
} = require("../services");
const UserController = require("./usersController");
const AuthController = require("./authController");
const AdminController = require("./adminController");
const HotelController = require("./hotelController");
const RoomController = require("./roomController");
const ReservationController = require("./reservationController");

const userController = UserController({ UserService });
const adminController = AdminController({ AdminService });
const authController = AuthController({ AuthService, AdminService });
const hotelController = HotelController({ HotelService });
const roomController = RoomController({ RoomService });
const reservationController = ReservationController({ ReservationService });

module.exports = {
  userController,
  authController,
  adminController,
  hotelController,
  roomController,
  reservationController
};
