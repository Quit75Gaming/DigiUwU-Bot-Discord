const { MongoClient } = require("salvage.db");
const db = new MongoClient({
  mongoURI: require("./config.json").Mongo,
  schema: {
    name: "Salvage5",
  },
});
module.exports = db;
