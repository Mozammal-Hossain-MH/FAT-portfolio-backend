import status from "http-status";
import responseSender from "./responseSender.js";

export const checkIfBodyHaveAnyDataOrNot = (req, res, message) => {
  if (typeof req.body !== "object") {
    responseSender(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message,
    });
    return false;
  } else {
    return true;
  }
};
