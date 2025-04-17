import { Router } from "express";
import { factsController } from "./facts.controller.js";

const factsRouter = Router();

factsRouter.get("/", factsController.getAllFacts);

factsRouter.post("/", factsController.createFacts);

export default factsRouter;
