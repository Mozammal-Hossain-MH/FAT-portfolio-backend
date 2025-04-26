import prisma from "../../constants/prismaClient.js";

const getAllFacts = async () => {
  // QUERY
  const total = await prisma.facts.count();
  const result = await prisma.facts.findMany();

  return {
    total,
    result,
  };
};

const createFacts = async (payload) => {
  const { Icon, name, value } = payload;

  const result = await prisma.facts.create({
    data: {
      Icon,
      name,
      value,
    },
  });

  return result;
};

const updateFacts = async (payload) => {
  const { id, Icon, name, value } = payload;

  const result = await prisma.facts.update({
    where: {
      id: Number(id),
    },
    data: {
      Icon,
      name,
      value,
    },
  });

  return result;
};

const deleteFacts = async (id) => {
  const result = await prisma.facts.delete({
    where: {
      id,
    },
  });

  return result;
};

export const factsServices = {
  getAllFacts,
  createFacts,
  updateFacts,
  deleteFacts,
};
