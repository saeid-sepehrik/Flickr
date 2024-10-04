const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./src/middlewares/errorMiddleware");
const rateLimiter = require("./src/middlewares/rateLimiter");
const loggerMiddleware = require("./src/middlewares/loggerMiddleware");
const { requestLogger, errorLogger } = require("./src/middlewares/logger");
const router = require("./src/routes");

const app = express();
app.use(loggerMiddleware);
app.use(cors());
app.use(rateLimiter);

app.use("/api", router);

app.use(errorMiddleware);

const port = process.env.PORT || 3000;
try {
  app.listen(port, () => {
    requestLogger.info(`Server is running on http://localhost:${port}`);
    console.log(`Server is running on http://localhost:${port}`);
  });
} catch (error) {
  errorLogger.error(`Error for startting server : ${error.message}`);
}
