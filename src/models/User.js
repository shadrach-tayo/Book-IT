const mongoose = require("mongoose");

const User = mongoose.Schema({
  lastname: String,
  firstname: String,
  street: String,
  city: String,
  zip: Number,
  phone: Number,
  username: String,
  email: String
});

module.exports = mongoose.model("User", User);
