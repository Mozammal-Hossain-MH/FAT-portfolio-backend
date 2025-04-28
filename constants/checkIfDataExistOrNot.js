import status from "http-status";
import prisma from "./prismaClient.js";
import responseSender from "./responseSender.js";

export const checkIfDataExistOrNot = async ({
  res,
  collection,
  id,
  message,
}) => {
  const existing = await prisma[collection].findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!existing) {
    responseSender(res, {
      statusCode: status.NOT_FOUND,
      success: false,
      message: `${message} not found`,
    });
    return false;
  }
  return true;
};
