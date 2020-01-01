const makeUserDb = require("./userDb");
const makeAdminDb = require("./adminDb");
const UserModel = require("../models/user");
const AdminDB = require("../models/admin");
const HotelDb = require("../models/hotel");
const RoomDb = require("../models/room");

const userDb = makeUserDb(UserModel);
const adminDb = makeAdminDb(AdminDB);

module.exports = { userDb, adminDb, HotelDb, RoomDb };
