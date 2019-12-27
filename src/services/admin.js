const { Admin, Hotel } = require("../domain");

function createAdminService({ adminDb, crypto, sanitizeUserData }) {
  async function Signup(userData) {
    const user = Admin(userData);

    const exists = await adminDb.findByEmail(user.email);

    if (exists) {
      throw new Error("Admin already exists!!!");
    }

    const salt = crypto.randomBytes(16).toString("base64");
    const hash = crypto
      .createHmac("sha512", salt)
      .update(user.password)
      .digest("base64");

    user.password = `${salt}$${hash}`;

    const savedUser = await adminDb.insert(user);

    return sanitizeUserData(savedUser);
  }

  return { Signup };
}

module.exports = createAdminService;
