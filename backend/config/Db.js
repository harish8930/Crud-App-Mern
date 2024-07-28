const mongoose = require("mongoose");

exports.dbConnect = () => {
  mongoose
    .connect("mongodb://localhost:27017/", { dbName: "Registration" })
    .then((data) => {
      console.log(`Db is Connected ${data.connection.host}`);
    });
};
