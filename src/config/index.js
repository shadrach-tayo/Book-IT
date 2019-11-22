const devConfig = require("./dev");
const prodConfig = require("./prod");
const testConfig = require("./tests");

let config = null;

if (process.env.NODE_ENV === "development") {
  config = devConfig;
} else if (process.env.NODE_ENV === "production") {
  config = prodConfig;
} else if (process.env.NODE_ENV === "test") {
  config = testConfig;
}
console.log(config);
module.exports = config;
