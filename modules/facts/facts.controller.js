import status from "http-status";
import { checkIfBodyHaveAnyDataOrNot } from "../../constants/checkIfBodyHaveAnyDataOrNot.js";
import { checkIfDataExistOrNot } from "../../constants/checkIfDataExistOrNot.js";
import { checkIfIdIsValidOrNot } from "../../constants/checkIfIdIsValidOrNot.js";
import prisma from "../../constants/prismaClient.js";
import responseSender from "../../constants/responseSender.js";
import tryCatch from "../../constants/tryCatch.js";
import { factsSchema } from "./facts.validation.js";

const getAllFacts = tryCatch(async (req, res) => {
  // QUERY
  const total = await prisma.facts.count();
  const result = await prisma.facts.findMany();

  // SUCCESS RESPONSE
  responseSender(res, {
    statusCode: status.OK,
    success: true,
    message: "All Facts",
    meta: {
      total,
    },
    data: result,
  });
});

const createFacts = tryCatch(async (req, res) => {
  // IF NO DATA IN BODY
  checkIfBodyHaveAnyDataOrNot(
    req,
    res,
    "Invalid request body. Pass { Icon, name, value}"
  );

  const { Icon, name, value } = req.body;

  // VALIDATION
  const facts = await prisma.facts.findMany();

  await factsSchema.validate(req.body, {
    context: { existingNames: facts.map((fact) => fact.name), isUpdate: false },
    abortEarly: false,
  });

  // QUERY
  const result = await prisma.facts.create({
    data: {
      Icon,
      name,
      value,
    },
  });

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

  const { id, Icon, name, value } = req.body;

  // VALIDATION
  const facts = await prisma.facts.findMany();
  await factsSchema.validate(req.body, {
    abortEarly: false,
    context: {
      existingNames: facts
        .filter((fact) => fact.id !== id)
        .map((fact) => fact.name),
      isUpdate: true,
    },
  });

  // QUERY
  const result = await prisma.facts.update({
    where: {
      id,
    },
    data: {
      Icon,
      name,
      value,
    },
  });

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
  checkIfDataExistOrNot(res, "facts", id, "Fact");

  // RUN QUERY
  const result = await prisma.facts.delete({
    where: {
      id: Number(id),
    },
  });

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
