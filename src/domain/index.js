const buildMakeHotel = require("./Hotel");
const buildMakeUser = require("./User");
const buildMakeAdmin = require("./Admin");
const buildMakeRoom = require("./Room");

module.exports.Admin = buildMakeAdmin();
module.exports.User = buildMakeUser();
module.exports.Hotel = buildMakeHotel();
module.exports.Room = buildMakeRoom();
