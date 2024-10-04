const winston = require("winston");

const requestLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "./logs/requests.log" }),
  ],
});

const errorLogger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "./logs/errors.log" }),
    new winston.transports.Console(),
  ],
});

module.exports = { requestLogger, errorLogger };
