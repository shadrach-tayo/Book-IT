const { User } = require("../domain");

function createUserService({
  userDb,
  crypto,
  config,
  jwt,
  sanitizeUserData,
  permissions
}) {
  async function Signup(userData) {
    const user = User(userData);

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
    user.role = "basic";

    const savedUser = await userDb.insert(user);

    return sanitizeUserData(savedUser);
  }

  /* async function Login(userData) {
    const refreshId = userData.userId + config.jwtSecret;
    const salt = crypto.randomBytes(16).toString("base64");
    const hash = crypto
      .createHmac("sha512", salt)
      .update(refreshId)
      .digest("base64");

    userData.refreshKey = salt;

    const token = jwt.sign(userData, config.jwtSecret);
    let b = new Buffer(hash);
    let refresh_token = b.toString("base64");

    return { refreshToken: refresh_token, accessToken: token };
  }
  */

  async function findById(id) {
    const exists = await userDb.findById(id);

    if (!exists) {
      throw new Error("User not found!!!");
    }
    const sanitized = sanitizeUserData(exists);

    return sanitized;
  }

  async function findByEmail(id) {
    const exists = await userDb.findByEmail(id);

    if (!exists) {
      throw new Error("User not found!!!");
    }
    const sanitized = sanitizeUserData(exists);

    return sanitized;
  }

  async function listAll() {
    const users = await userDb.findAll();

    return users.map(user => sanitizeUserData(user));
  }

  async function updateUser({ id, user }) {
    const exists = await userDb.findById(id);

    if (!exists) {
      throw new Error("User not found!!!");
    }

    if (user.password) {
      const salt = crypto.randomBytes(16).toString("base64");
      const hash = crypto
        .createHmac("sha512", salt)
        .update(user.password)
        .digest("base64");
      user.password = `${salt}${hash}`;
    }

    const updatedUser = await userDb.findByIdAndUpdate(id, user);

    return sanitizeUserData(updatedUser);
  }

  async function removeUser(id) {
    const deletedUser = await userDb.findByIdAndDelete(id);

    return deletedUser;
  }

  return {
    Signup,
    findById,
    findByEmail,
    removeUser,
    updateUser,
    listAll
  };
}

module.exports = createUserService;
