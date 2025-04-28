import status from "http-status";
import responseSender from "./responseSender.js";

export const checkIfIdIsValidOrNot = (res, id) => {
  if (isNaN(Number(id))) {
    responseSender(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message: "Invalid ID. Must be a number.",
    });
    return false;
  } else {
    return true;
  }
};
