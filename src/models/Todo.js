const mongoose = require("mongoose");

const Todo = mongoose.Schema({
  text: String
});

module.exports = mongoose.model("Todo", Todo);
