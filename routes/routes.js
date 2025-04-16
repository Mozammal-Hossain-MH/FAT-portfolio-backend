import { Router } from "express";
import factsRouter from "../modules/facts/facts.routes.js";
const router = Router();

const moduleRoutes = [
  {
    path: "/v1.0/facts",
    route: factsRouter,
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
