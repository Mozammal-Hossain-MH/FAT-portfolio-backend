import { Router } from "express";
import { menusController } from "./menus.controller.js";

const menusRouter = Router();

menusRouter.get("/", menusController.getAllMenus);

menusRouter.post("/", menusController.createMenus);

menusRouter.put("/", menusController.updateMenus);

menusRouter.delete("/:id", menusController.deleteMenus);

export default menusRouter;
