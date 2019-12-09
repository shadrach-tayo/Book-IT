const { UserService, AuthService } = require("../services");
const UserController = require("./usersController");
const AuthController = require("./usersController");

const userController = UserController({ UserService });
const authController = AuthController({ UserService });

module.exports = { userController, authController };
