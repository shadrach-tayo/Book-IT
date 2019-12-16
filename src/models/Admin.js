const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  email: String,
  password: String,
  role: String
});

const AdminModel = mongoose.model("Admin", AdminSchema);
