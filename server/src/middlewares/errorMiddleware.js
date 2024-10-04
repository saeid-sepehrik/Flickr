const { errorLogger } = require("./logger");

const errorMiddleware = (err, req, res, next) => {
  errorLogger.error({
    message: `${err.message}`,
    status: err.status,
    method: req.method,
    url: req.url,
    ip: req.ip,
    params: req.params,
    query: req.query,
    body: req.body,
  });
  res.status(err.status).json({
    success: false,
    message:
      err.status === 500
        ? "Internal Server Error, please try again later!"
        : err.message,
    error: {
      code: err.status,
      details: err.details || "No additional details available.",
    },
  });
};

module.exports = errorMiddleware;
