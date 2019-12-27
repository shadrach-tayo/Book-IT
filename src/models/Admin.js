const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  email: String,
  password: String,
  role: String
});

const AdminModel = mongoose.model("Admin", AdminSchema);

const newAdmin = async adminData => {
  const admin = new AdminModel(adminData);
  return admin.save();
};

findByEmail = async email => {
  return AdminModel.find({ email })
    .then(results => {
      const found = results[0];
      // console.log("err ", err);
      // console.log("admin ", found, " email ", email);
      return found;
    })
    .catch(err => {
      console.log("err ", err);
      return null;
    });
};

module.exports = { newAdmin, findByEmail };
