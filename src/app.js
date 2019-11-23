var createError = require("http-errors");
var express = require("express");
const loader = require("./loaders");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

async function startServer(app) {
  dotenv.config();

  // initialize loaders
  await loader(app);
}

startServer(app);

module.exports = app;
module.exports.db = mongoose.connection;
