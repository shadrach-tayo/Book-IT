const { Admin } = require("../domain");

function createAdminService({ userDb, crypto, sanitizeUserData }) {
  async function Signup(userData) {
    const user = Admin(userData);

    const exists = await userDb.findByEmail(user.email);

    if (exists) {
      throw new Error("User already exists!!!");
    }

    const salt = crypto.randomBytes(16).toString("base64");
    const hash = crypto
      .createHmac("sha512", salt)
      .update(user.password)
      .digest("base64");

    user.password = `${salt}$${hash}`;

    const savedUser = await userDb.insert(user);

    return sanitizeUserData(savedUser);
  }
  // can add hotels,
  // can edit hotels,
  // can delete hotels,
  // can suspend hotels,

  // add user
  // edit user info
  // delete user acct

  return { Signup };
}

module.exports = createAdminService;
