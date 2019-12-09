const buildMakeHotel = require("./Hotel");
const buildMakeUser = require("./User");
const buildMakeAdmin = require("./Admin");

module.exports.Admin = buildMakeAdmin();
module.exports.User = buildMakeUser();
module.exports.Hotel = buildMakeHotel();
