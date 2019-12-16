module.exports = function buildMakeAdmin() {
  return function({ email, password, role = "admin" }) {
    if (!email) throw new Error("email cannot be empty"); // validate email correctly
    if (!role) throw new Error("role cannot be empty"); // validate email correctly
    if (!password) throw new Error("password cannot be empty");

    if (role != "admin") throw new Error("Role must be admin");

    if (password.length < 6)
      throw new Error("password must be at least 6 characters");

    return {
      email,
      password,
      role
    };
  };
};
