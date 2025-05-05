import prisma from "../../constants/prismaClient.js";

const getAllServices = async () => {
  // QUERY
  const total = await prisma.services.count();
  const result = await prisma.services.findMany();

  return {
    total,
    result,
  };
};

const createServices = async (payload) => {
  const { title, images, details } = payload;

  const result = await prisma.services.create({
    data: {
      title,
      images,
      details,
    },
  });

  return result;
};

const updateServices = async (payload) => {
  const { id, title, images, details } = payload;

  const result = await prisma.services.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      images,
      details,
    },
  });

  return result;
};

const deleteServices = async (id) => {
  const result = await prisma.services.delete({
    where: {
      id,
    },
  });

  return result;
};

export const servicesServices = {
  getAllServices,
  createServices,
  updateServices,
  deleteServices,
};
