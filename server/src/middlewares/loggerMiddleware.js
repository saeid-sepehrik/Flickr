const { requestLogger } = require("./logger");

const loggerMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    requestLogger.info({
      req_method: req.method,
      req_url: req.url,
      res_resource: res.resource,
      res_statusCode: res.statusCode,
      duration: duration,
    });
  });
  next();
};

module.exports = loggerMiddleware;
