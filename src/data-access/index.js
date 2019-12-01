const makeUserDb = require("./userDb");
const UserModel = require("../models/user");

const userDb = makeUserDb(UserModel);

module.exports = { userDb };
