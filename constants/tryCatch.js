import appError from "./appError.js";

const tryCatch = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    let status = 500;
    let message = error.message || "Something went wrong";
    console.log({ error, errors: error.errors });
    if (error.name === "ValidationError") {
      status = 400;
      message = error.errors;
    } else if (error.name === "CastError") {
      status = 400;
      message = `Invalid ${error.path}: ${error.value}`;
    } else if (error.code === 11000) {
      status = 409;
      message = `Duplicate field value entered: ${JSON.stringify(
        error.keyValue
      )}`;
    }

    next(appError(JSON.stringify(message), status));
  }
};

export default tryCatch;
