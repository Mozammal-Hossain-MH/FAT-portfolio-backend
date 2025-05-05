import { Router } from "express";
import { ServicesController } from "./services.controller.js";

const servicesRouter = Router();

servicesRouter.get("/", ServicesController.getAllServices);

servicesRouter.post("/", ServicesController.createServices);

servicesRouter.put("/", ServicesController.updateServices);

servicesRouter.delete("/:id", ServicesController.deleteServices);

export default servicesRouter;
