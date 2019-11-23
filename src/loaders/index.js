const { mongooseLoader } = require("./mongoose");
const expressLoader = require("./express");

module.exports = async app => {
  // initialize mongodb database
  await mongooseLoader();

  await expressLoader(app);
};
