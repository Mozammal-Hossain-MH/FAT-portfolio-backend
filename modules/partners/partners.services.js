import prisma from "../../constants/prismaClient.js";

const getAllPartners = async () => {
  // QUERY
  const total = await prisma.partners.count();
  const result = await prisma.partners.findMany();

  return {
    total,
    result,
  };
};

const createPartners = async (payload) => {
  const { title, images, url } = payload;

  const result = await prisma.partners.create({
    data: {
      title,
      images,
      url,
    },
  });

  return result;
};

const updatePartners = async (payload) => {
  const { id, title, images, url } = payload;

  const result = await prisma.partners.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      images,
      url,
    },
  });

  return result;
};

const deletePartners = async (id) => {
  const result = await prisma.partners.delete({
    where: {
      id,
    },
  });

  return result;
};

export const PartnersServices = {
  getAllPartners,
  createPartners,
  updatePartners,
  deletePartners,
};
