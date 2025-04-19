import status from "http-status";
import prisma from "../../constants/prismaClient.js";
import responseSender from "../../constants/responseSender.js";
import tryCatch from "../../constants/tryCatch.js";
import factsSchema from "./facts.validation.js";

const getAllFacts = tryCatch(async (req, res) => {
  const result = await prisma.facts.findMany();

  responseSender(res, {
    statusCode: status.OK,
    success: true,
    message: "All Facts",
    data: result,
  });
});

const createFacts = tryCatch(async (req, res) => {
  const { Icon, name, value } = req.body;
  console.log({ body: req?.body });

  await factsSchema.validate(req.body, { abortEarly: false });

  const result = await prisma.facts.create({
    data: {
      Icon,
      name,
      value,
    },
  });

  responseSender(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Fact created successfully",
    data: result,
  });
});

export const factsController = {
  getAllFacts,
  createFacts,
};
