const colors = require("colors");
const mongoose = require("mongoose");
const { errorLogger, logger } = require("./logger");
const config = require("../config");
mongoose.set("strictQuery", false);
const app = require("../app");
let server;

const DBConnect = async () => {
  try {
    await mongoose.connect(config.db_uri);
    server = app.listen(config.port, () => {
      logger.info(
        `==== ✌️  Your server is running on http://localhost:${config.port} ====`
          .yellow.bold.italic
      );
    });
    logger.info(`==== ✌️  DB Connection is succesfully ====`.green.bold.italic);
  } catch (error) {
    errorLogger.error(
      `==== 🤞  Database Connection Error ====`.red.bold.italic,
      error
    );
  }

  process.on("unhandledRejection", (error) => {
    console.log(error);
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};

module.exports = DBConnect;
