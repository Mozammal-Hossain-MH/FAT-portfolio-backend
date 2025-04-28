import status from "http-status";
import { checkIfBodyHaveAnyDataOrNot } from "../../constants/checkIfBodyHaveAnyDataOrNot.js";
import { checkIfDataExistOrNot } from "../../constants/checkIfDataExistOrNot.js";
import { checkIfIdIsValidOrNot } from "../../constants/checkIfIdIsValidOrNot.js";
import prisma from "../../constants/prismaClient.js";
import responseSender from "../../constants/responseSender.js";
import tryCatch from "../../constants/tryCatch.js";
import { MenusServices } from "./menus.services.js";
import { menusSchema } from "./menus.validation.js";

const getAllMenus = tryCatch(async (req, res) => {
  // QUERY
  const data = await MenusServices.getAllMenus();

  // SUCCESS RESPONSE
  responseSender(res, {
    statusCode: status.OK,
    success: true,
    message: "All Menus",
    meta: {
      total: data?.total,
    },
    data: data?.result,
  });
});

const createMenus = tryCatch(async (req, res) => {
  // IF NO DATA IN BODY
  if (
    !checkIfBodyHaveAnyDataOrNot(
      req,
      res,
      "Invalid request body. Pass { title, images, url }"
    )
  )
    return;

  // VALIDATION
  const menus = await prisma.menus.findMany();
  await menusSchema.validate(req.body, {
    context: {
      existingTitles: menus.map((menu) => menu.title),
      isUpdate: false,
    },
    abortEarly: false,
  });

  // QUERY
  const result = await MenusServices.createMenus(req.body);

  // SUCCESS RESPONSE
  responseSender(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Menu created successfully",
    data: result,
  });
});

const updateMenus = tryCatch(async (req, res) => {
  // IF NO DATA IN BODY
  if (
    !checkIfBodyHaveAnyDataOrNot(
      req,
      res,
      "Invalid request body. Pass { id, title, images, url }"
    )
  )
    return;

  const { id } = req.body;

  // CHECK IF ID IS VALID OR NOT
  if (!checkIfIdIsValidOrNot(res, id)) return;

  // NOW CHECK IF THE DATA EXISTS
  const dataExist = await checkIfDataExistOrNot({
    res,
    collection: "menus",
    id,
    message: "Menu",
  });
  if (!dataExist) return;

  // VALIDATION
  const menus = await prisma.menus.findMany();
  await menusSchema.validate(req.body, {
    abortEarly: false,
    context: {
      existingTitles: menus
        .filter((menu) => menu.id !== Number(id))
        .map((menu) => menu.title),
      isUpdate: true,
    },
  });

  // QUERY
  const result = await MenusServices.updateMenus(req.body);

  // SUCCESS RESPONSE
  responseSender(res, {
    statusCode: status.OK,
    success: true,
    message: "Menu updated successfully",
    data: result,
  });
});

const deleteMenus = tryCatch(async (req, res) => {
  const { id } = req.params;

  // CHECK IF ID IS VALID OR NOT
  if (!checkIfIdIsValidOrNot(res, id)) return;

  // NOW CHECK IF THE FACT EXISTS
  const dataExist = await checkIfDataExistOrNot({
    res,
    collection: "menus",
    id,
    message: "Menu",
  });
  if (!dataExist) return;

  // RUN QUERY
  const result = await MenusServices.deleteMenus(Number(id));

  // SUCCESS RESPONSE
  responseSender(res, {
    statusCode: status.OK,
    success: true,
    message: "Menu deleted successfully",
    data: result,
  });
});

export const menusController = {
  getAllMenus,
  createMenus,
  updateMenus,
  deleteMenus,
};
