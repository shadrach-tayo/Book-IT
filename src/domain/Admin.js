module.exports = function buildMakeAdmin() {
  return function({ email, password }) {
    if (!email) throw new Error("email cannot be empty"); // validate email correctly
    if (!password) throw new Error("password cannot be empty");

    if (password.length < 6)
      throw new Error("password must be at least 6 characters");

    return {
      email,
      password
    };
  };
};
