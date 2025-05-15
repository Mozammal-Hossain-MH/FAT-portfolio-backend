import status from "http-status";
import { checkIfBodyHaveAnyDataOrNot } from "../../constants/checkIfBodyHaveAnyDataOrNot.js";
import { checkIfDataExistOrNot } from "../../constants/checkIfDataExistOrNot.js";
import { checkIfIdIsValidOrNot } from "../../constants/checkIfIdIsValidOrNot.js";
import prisma from "../../constants/prismaClient.js";
import responseSender from "../../constants/responseSender.js";
import tryCatch from "../../constants/tryCatch.js";
import { PartnersServices } from "./partners.services.js";
import { partnersSchema } from "./partners.validation.js";

const getAllPartners = tryCatch(async (req, res) => {
  // QUERY
  const data = await PartnersServices.getAllPartners();

  // SUCCESS RESPONSE
  responseSender(res, {
    statusCode: status.OK,
    success: true,
    message: "All Partners",
    meta: {
      total: data?.total,
    },
    data: data?.result,
  });
});

const uploadPartnerImages = tryCatch(async (req, res) => {
  const docs = req?.files?.map((file) => file?.file);

  responseSender(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Image uploaded successfully",
    data: docs,
  });
});

const createPartners = tryCatch(async (req, res) => {
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
  const partners = await prisma.partners.findMany();
  await partnersSchema.validate(req.body, {
    context: {
      existingTitles: partners.map((partner) => partner.title),
      isUpdate: false,
    },
    abortEarly: false,
  });

  // QUERY
  const result = await PartnersServices.createPartners(req.body);

  // SUCCESS RESPONSE
  responseSender(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Partner created successfully",
    data: result,
  });
});

const updatePartners = tryCatch(async (req, res) => {
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
    collection: "partners",
    id,
    message: "Partner",
  });
  if (!dataExist) return;

  // VALIDATION
  const partners = await prisma.partners.findMany();
  await partnersSchema.validate(req.body, {
    abortEarly: false,
    context: {
      existingTitles: partners
        .filter((partner) => partner.id !== Number(id))
        .map((partner) => partner.title),
      isUpdate: true,
    },
  });

  // QUERY
  const result = await PartnersServices.updatePartners(req.body);

  // SUCCESS RESPONSE
  responseSender(res, {
    statusCode: status.OK,
    success: true,
    message: "Partner updated successfully",
    data: result,
  });
});

const deletePartners = tryCatch(async (req, res) => {
  const { id } = req.params;

  // CHECK IF ID IS VALID OR NOT
  if (!checkIfIdIsValidOrNot(res, id)) return;

  // NOW CHECK IF THE FACT EXISTS
  const dataExist = await checkIfDataExistOrNot({
    res,
    collection: "partners",
    id,
    message: "Partner",
  });
  if (!dataExist) return;

  // RUN QUERY
  const result = await PartnersServices.deletePartners(Number(id));

  // SUCCESS RESPONSE
  responseSender(res, {
    statusCode: status.OK,
    success: true,
    message: "Partner deleted successfully",
    data: result,
  });
});

export const partnersController = {
  getAllPartners,
  uploadPartnerImages,
  createPartners,
  updatePartners,
  deletePartners,
};
