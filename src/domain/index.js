const buildMakeHotel = require("./Hotel");
const buildMakeUser = require("./User");

module.exports.User = buildMakeUser();
module.exports.Hotel = buildMakeHotel();
