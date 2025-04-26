import status from "http-status";
import responseSender from "./responseSender.js";

export const checkIfBodyHaveAnyDataOrNot = (req, res, message) => {
  if (typeof req.body !== "object") {
    return responseSender(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message,
    });
  }
};
