import { Router } from "express";
import { factsController } from "./facts.controller.js";

const factsRouter = Router();

factsRouter.get("/", factsController.getAllFacts);

factsRouter.post("/", factsController.createFacts);

factsRouter.put("/", factsController.updateFacts);

factsRouter.delete("/:id", factsController.deleteFacts);

export default factsRouter;
