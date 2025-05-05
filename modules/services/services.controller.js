import status from "http-status";
import { checkIfBodyHaveAnyDataOrNot } from "../../constants/checkIfBodyHaveAnyDataOrNot.js";
import { checkIfDataExistOrNot } from "../../constants/checkIfDataExistOrNot.js";
import { checkIfIdIsValidOrNot } from "../../constants/checkIfIdIsValidOrNot.js";
import prisma from "../../constants/prismaClient.js";
import responseSender from "../../constants/responseSender.js";
import tryCatch from "../../constants/tryCatch.js";
import { servicesServices } from "./services.services.js";
import { servicesSchema } from "./services.validation.js";

const getAllServices = tryCatch(async (req, res) => {
  // QUERY
  const data = await servicesServices.getAllServices();

  // SUCCESS RESPONSE
  responseSender(res, {
    statusCode: status.OK,
    success: true,
    message: "All Services",
    meta: {
      total: data?.total,
    },
    data: data?.result,
  });
});

const createServices = tryCatch(async (req, res) => {
  // IF NO DATA IN BODY
  if (
    !checkIfBodyHaveAnyDataOrNot(
      req,
      res,
      "Invalid request body. Pass { title, images, details }"
    )
  )
    return;

  // VALIDATION
  const services = await prisma.services.findMany();
  await servicesSchema.validate(req.body, {
    context: {
      existingTitles: services.map((menu) => menu.title),
      isUpdate: false,
    },
    abortEarly: false,
  });

  // QUERY
  const result = await servicesServices.createServices(req.body);

  // SUCCESS RESPONSE
  responseSender(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Service created successfully",
    data: result,
  });
});

const updateServices = tryCatch(async (req, res) => {
  // IF NO DATA IN BODY
  if (
    !checkIfBodyHaveAnyDataOrNot(
      req,
      res,
      "Invalid request body. Pass { id, title, images, details }"
    )
  )
    return;

  const { id } = req.body;

  // CHECK IF ID IS VALID OR NOT
  if (!checkIfIdIsValidOrNot(res, id)) return;

  // NOW CHECK IF THE DATA EXISTS
  const dataExist = await checkIfDataExistOrNot({
    res,
    collection: "services",
    id,
    message: "Service",
  });
  if (!dataExist) return;

  // VALIDATION
  const services = await prisma.services.findMany();
  await servicesSchema.validate(req.body, {
    abortEarly: false,
    context: {
      existingTitles: services
        .filter((menu) => menu.id !== Number(id))
        .map((menu) => menu.title),
      isUpdate: true,
    },
  });

  // QUERY
  const result = await servicesServices.updateServices(req.body);

  // SUCCESS RESPONSE
  responseSender(res, {
    statusCode: status.OK,
    success: true,
    message: "Service updated successfully",
    data: result,
  });
});

const deleteServices = tryCatch(async (req, res) => {
  const { id } = req.params;

  // CHECK IF ID IS VALID OR NOT
  if (!checkIfIdIsValidOrNot(res, id)) return;

  // NOW CHECK IF THE FACT EXISTS
  const dataExist = await checkIfDataExistOrNot({
    res,
    collection: "services",
    id,
    message: "Service",
  });
  if (!dataExist) return;

  // RUN QUERY
  const result = await servicesServices.deleteServices(Number(id));

  // SUCCESS RESPONSE
  responseSender(res, {
    statusCode: status.OK,
    success: true,
    message: "Service deleted successfully",
    data: result,
  });
});

export const ServicesController = {
  getAllServices,
  createServices,
  updateServices,
  deleteServices,
};
