const {
  UserService,
  AuthService,
  AdminService,
  HotelService,
  RoomService
} = require("../services");
const UserController = require("./usersController");
const AuthController = require("./authController");
const AdminController = require("./adminController");
const HotelController = require("./hotelController");
const RoomController = require("./roomController");

const userController = UserController({ UserService });
const adminController = AdminController({ AdminService });
const authController = AuthController({ AuthService, AdminService });
const hotelController = HotelController({ HotelService });
const roomController = RoomController({ RoomService });

module.exports = {
  userController,
  authController,
  adminController,
  hotelController,
  roomController
};
