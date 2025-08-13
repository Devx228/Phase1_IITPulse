import mongoose from "mongoose";

const clientOption = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000,
  poolSize: 50,
  useNewUrlParser: true,
  autoIndex: false,
};
const option = { useNewUrlParser: true };

export const initClientDbConnection = () => {
  const db = mongoose.createConnection(config.MONGO_ATLAS, clientOption);

  db.on("error", console.error.bind(console, "MongoDB Connection Error>> : "));
  db.once("open", function () {
    console.log("client MongoDB Connection ok!");
  });
  require("../models/index.js");
  require("../models/index.js");
  require("../models/index.js");
  require("../models/index.js");
  require("../models/index.js");
  require("../models/index.js");
  require("../models/index.js");
  require("../models/index.js");
  return db;
};
