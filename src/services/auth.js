function createAuthenticationService({
  userDb,
  crypto,
  config,
  jwt,
  sanitizeUserData
}) {
  async function refreshToken() {}

  return { refreshToken };
}

module.exports = createAuthenticationService;
