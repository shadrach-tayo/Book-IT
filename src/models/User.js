const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  lastname: String,
  firstname: String,
  street: String,
  city: String,
  zip: Number,
  phone: Number,
  username: String,
  email: String,
  password: String,
  role: String
});

userSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set("toJSON", {
  virtuals: true
});

userSchema.methods.toJSON = function() {
  let obj = this.toObject();
  // delete obj.password;

  delete obj.__v;
  obj.id = obj._id;
  delete obj._id;
  return obj;
};

module.exports = mongoose.model("User", userSchema);
