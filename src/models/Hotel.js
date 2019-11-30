const mongoose = require("mongoose");

const Hotel = mongoose.Schema({
  street: String,
  city: String,
  zip: Number,
  phone: Number,
  Hotelname: String
});

module.exports = mongoose.model("Hotel", Hotel);
