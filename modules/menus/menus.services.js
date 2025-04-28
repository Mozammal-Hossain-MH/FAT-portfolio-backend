import prisma from "../../constants/prismaClient.js";

const getAllMenus = async () => {
  // QUERY
  const total = await prisma.menus.count();
  const result = await prisma.menus.findMany();

  return {
    total,
    result,
  };
};

const createMenus = async (payload) => {
  const { title, images, url } = payload;

  const result = await prisma.menus.create({
    data: {
      title,
      images,
      url,
    },
  });

  return result;
};

const updateMenus = async (payload) => {
  const { id, title, images, url } = payload;

  const result = await prisma.menus.update({
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

const deleteMenus = async (id) => {
  const result = await prisma.menus.delete({
    where: {
      id,
    },
  });

  return result;
};

export const MenusServices = {
  getAllMenus,
  createMenus,
  updateMenus,
  deleteMenus,
};
