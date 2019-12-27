const {
  UserService,
  AuthService,
  AdminService,
  HotelService
} = require("../services");
const UserController = require("./usersController");
const AuthController = require("./authController");
const AdminController = require("./adminController");
const HotelController = require("./hotelController");

const userController = UserController({ UserService });
const adminController = AdminController({ AdminService });
const authController = AuthController({ AuthService, AdminService });
const hotelController = HotelController({ HotelService });

module.exports = {
  userController,
  authController,
  adminController,
  hotelController
};
