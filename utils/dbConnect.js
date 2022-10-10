const mongoose = require("mongoose");

const DBConnect = async () => {
  const connect = await mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log(`==== DB Connection is succesfully ====`.green.bold.italic);
    })
    .catch(() => {
      console.log(`==== Database Connection Error ====`.red.bold.italic);
    });
  return connect;
};

module.exports = DBConnect;
