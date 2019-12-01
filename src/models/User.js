const mongoose = require("mongoose");

const User = mongoose.Schema({
  lastname: String,
  firstname: String,
  street: String,
  city: String,
  zip: Number,
  phone: Number,
  username: String,
  email: String,
  password: String,
  permissionLevel: Number
});

User.methods.toJSON = function() {
  let obj = this.toObject();
  // delete obj.password;
  delete obj.__v;
  obj.id = obj._id;
  delete obj._id;
  return obj;
};

module.exports = mongoose.model("User", User);
