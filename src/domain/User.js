module.exports = function buildMakeUser() {
  return function({
    lastname,
    firstname,
    street,
    city,
    zip,
    phone,
    username,
    email,
    password
  }) {
    // validate hotle data before creating and saving it to database
    if (!firstname) throw new Error("firstname cannot be empty");
    if (!password) throw new Error("password cannot be empty");
    if (!lastname) throw new Error("lastname cannot be empty");
    if (!username) throw new Error("username cannot be empty");
    if (!email) throw new Error("email cannot be empty"); // validate email correctly
    if (!street) throw new Error("street cannot be empty");
    if (!city) throw new Error("city cannot be empty");
    if (!zip) throw new Error("zip code cannot be empty"); // validate zip code correctly
    if (!phone) throw new Error("phone cannot be empty"); // validate phone correctly

    if (firstname.length < 4)
      throw new Error("firstname must be at least 4 characters");

    if (password.length < 6)
      throw new Error("firstname must be at least 6 characters");

    if (lastname.length < 4)
      throw new Error("lastname must be at least 4 characters");

    if (username.length < 4)
      throw new Error("username must be at least 4 characters");

    if (phone.length < 11)
      throw new Error("phone must be at least 4 characters");

    return {
      lastname,
      firstname,
      street,
      city,
      zip,
      phone,
      username,
      email,
      password
    };
  };
};
