import { logger } from "../constants/logger.js";

const errorHandler = (err, req, res, _next) => {
  const { statusCode = 500, message = "Something went wrong", errorId } = err;
  logger.error(`[Error ID: ${errorId || "N/A"}] ${message}`, err.stack);

  res.status(statusCode).json({
    success: false,
    message:
      JSON.parse(err.message) ||
      "Something went wrong. Please contact support with errorId",
    errorId,
  });
};

export default errorHandler;
