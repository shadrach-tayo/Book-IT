function createAuthenticationService({ crypto, config, jwt }) {
  async function refreshToken(data) {
    const refresh_token = jwt.sign(data, jwtSecret, { expiresIn: "1d" });
    return refresh_token;
  }

  async function Login(userData) {
    // const refreshId = userData.userId + config.jwtSecret;
    const salt = crypto.randomBytes(16).toString("base64");
    // const hash = crypto
    //   .createHmac("sha512", salt)
    //   .update(refreshId)
    //   .digest("base64");

    // userData.refreshKey = salt;

    const token = jwt.sign(userData, config.jwtSecret);
    // let b = new Buffer(hash);
    // let refresh_token = b.toString("base64");

    return { accessToken: token };
  }

  return { refreshToken, Login };
}

module.exports = createAuthenticationService;
