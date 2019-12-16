const { UserService, AuthService, AdminService } = require("../services");
const UserController = require("./usersController");
const AuthController = require("./authController");

const userController = UserController({ UserService });
const authController = AuthController({ AuthService });

module.exports = { userController, authController };
