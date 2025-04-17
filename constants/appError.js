import { randomBytes } from "crypto";

const appError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = true; // To differentiate operational errors
  error.errorId = randomBytes(6).toString("hex"); // Generate a unique error ID
  return error;
};

export default appError;
