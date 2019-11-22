const mongoose = require("mongoose");
const config = require("./config");

function setupDB() {
  // load db
  console.log(process.env.NODE_ENV, config.MONGODB_URI);
  const database = config.MONGODB_URI;

  mongoose.connect(database, {
    useCreateIndex: true,
    useNewUrlParser: true
  });

  mongoose.connection.on("connected", () => {
    console.log(`connected to the database ${database}`);
  });

  mongoose.connection.on("error", () => {
    console.log(`Database error '  ${database}`);
  });
}

setupDB();

module.exports = mongoose.connection;
