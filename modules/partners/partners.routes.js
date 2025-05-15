import { Router } from "express";
import dynamicFileUpload from "../../middlewares/uploadFiles.js";
import { partnersController } from "./partners.controller.js";

const partnersRouter = Router();

partnersRouter.get("/", partnersController.getAllPartners);

partnersRouter.post(
  "/upload",
  dynamicFileUpload("Images/partner"),
  partnersController.uploadPartnerImages
);

partnersRouter.post("/", partnersController.createPartners);

partnersRouter.put("/", partnersController.updatePartners);

partnersRouter.delete("/:id", partnersController.deletePartners);

export default partnersRouter;
