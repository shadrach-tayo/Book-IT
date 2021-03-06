const { userDb, adminDb } = require("../../data-access");
const crypto = require("crypto");
const createVerifyUserMiddleware = require("./verify.user.middleware");

// initialize middlewares
const verifyUserMiddleware = createVerifyUserMiddleware({
  userDb,
  crypto,
  adminDb
});

module.exports = { verifyUserMiddleware };
