const { UserService, AuthService, AdminService } = require("../services");
const UserController = require("./usersController");
const AuthController = require("./authController");
const AdminController = require("./adminController");

const userController = UserController({ UserService });
const adminController = AdminController({ AdminService });
const authController = AuthController({ AuthService });

module.exports = { userController, authController, adminController };
