const { createLogger, format, transports } = require("winston"); //const path = require("path");
const { combine, timestamp, label, printf } = format;
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);

  return `${date} - [${label}] ${level}: ${message}`;
});

exports.logger = createLogger({
  level: "info",
  format: combine(label({ label: "Shama" }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "winston",
        "successes",
        "njme-%DATE%-success.log"
      ),
      datePattern: "HH - DD.MM.YYYY",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

exports.errorLogger = createLogger({
  level: "error",
  format: combine(label({ label: "DCH" }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "winston",
        "errors",
        "njme-%DATE%-error.log"
      ),
      datePattern: "HH - DD.MM.YYYY",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});
