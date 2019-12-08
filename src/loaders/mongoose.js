const mongoose = require("mongoose");
const config = require("../config");

async function mongooseLoader() {
  // load db
  // console.log(process.env.NODE_ENV, config.MONGODB_URI);
  const database = config.MONGODB_URI;

  await mongoose.connect(database, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  mongoose.connection.on("connected", () => {
    console.log(`connected to the database ${database}`);
  });

  mongoose.connection.on("error", () => {
    console.log(`Database error '  ${database}`);
  });
}

module.exports = { mongooseLoader };
