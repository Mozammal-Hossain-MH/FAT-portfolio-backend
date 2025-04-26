import status from "http-status";
import { checkIfBodyHaveAnyDataOrNot } from "../../constants/checkIfBodyHaveAnyDataOrNot.js";
import { checkIfDataExistOrNot } from "../../constants/checkIfDataExistOrNot.js";
import { checkIfIdIsValidOrNot } from "../../constants/checkIfIdIsValidOrNot.js";
import prisma from "../../constants/prismaClient.js";
import responseSender from "../../constants/responseSender.js";
import tryCatch from "../../constants/tryCatch.js";
import { factsServices } from "./facts.services.js";
import { factsSchema } from "./facts.validation.js";

const getAllFacts = tryCatch(async (req, res) => {
  // QUERY
  const data = await factsServices.getAllFacts();

  // SUCCESS RESPONSE
  responseSender(res, {
    statusCode: status.OK,
    success: true,
    message: "All Facts",
    meta: {
      total: data?.total,
    },
    data: data?.result,
  });
});

const createFacts = tryCatch(async (req, res) => {
  // IF NO DATA IN BODY
  checkIfBodyHaveAnyDataOrNot(
    req,
    res,
    "Invalid request body. Pass { Icon, name, value}"
  );

  // VALIDATION
  const facts = await prisma.facts.findMany();
  await factsSchema.validate(req.body, {
    context: { existingNames: facts.map((fact) => fact.name), isUpdate: false },
    abortEarly: false,
  });

  // QUERY
  const result = await factsServices.createFacts(req.body);

  // SUCCESS RESPONSE
  responseSender(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Fact created successfully",
    data: result,
  });
});

const updateFacts = tryCatch(async (req, res) => {
  // IF NO DATA IN BODY
  checkIfBodyHaveAnyDataOrNot(
    req,
    res,
    "Invalid request body. Pass { id, Icon, name, value}"
  );

  const { id } = req.body;

  // CHECK IF ID IS VALID OR NOT
  checkIfIdIsValidOrNot(res, id);

  // NOW CHECK IF THE FACT EXISTS
  checkIfDataExistOrNot({ res, collection: "facts", id, message: "Fact" });

  // VALIDATION
  const facts = await prisma.facts.findMany();
  await factsSchema.validate(req.body, {
    abortEarly: false,
    context: {
      existingNames: facts
        .filter((fact) => fact.id !== Number(id))
        .map((fact) => fact.name),
      isUpdate: true,
    },
  });

  // QUERY
  const result = await factsServices.updateFacts(req.body);

  // SUCCESS RESPONSE
  responseSender(res, {
    statusCode: status.OK,
    success: true,
    message: "Fact updated successfully",
    data: result,
  });
});

const deleteFacts = tryCatch(async (req, res) => {
  const { id } = req.params;

  // CHECK IF ID IS VALID OR NOT
  checkIfIdIsValidOrNot(res, id);

  // NOW CHECK IF THE FACT EXISTS
  checkIfDataExistOrNot({ res, collection: "facts", id, message: "Fact" });

  // RUN QUERY
  const result = await factsServices.deleteFacts(Number(id));

  // SUCCESS RESPONSE
  responseSender(res, {
    statusCode: status.OK,
    success: true,
    message: "Fact deleted successfully",
    data: result,
  });
});

export const factsController = {
  getAllFacts,
  createFacts,
  updateFacts,
  deleteFacts,
};
