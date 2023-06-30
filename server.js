const DBConnect = require("./utilities/dbConnect");
const { errorLogger, logger } = require("./utilities/logger");
let server;

process.on("uncaughtException", (error) => {
  errorLogger.error(error);
  process.exit(1);
});

// DB Connection
DBConnect();

process.on("SIGTERM", () => {
  logger.info(`Sigterm is received`);
  if (server) {
    server.close();
  }
});
