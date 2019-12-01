const { UserService } = require("../services");
const UserController = require("./usersController");

const userController = UserController({ UserService });

module.exports = { userController };
