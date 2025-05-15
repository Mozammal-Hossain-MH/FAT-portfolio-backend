import { Router } from "express";
import factsRouter from "../modules/facts/facts.routes.js";
import menusRouter from "../modules/menus/menus.routes.js";
import partnersRouter from "../modules/partners/partners.routes.js";
import servicesRouter from "../modules/services/services.routes.js";
const router = Router();

const moduleRoutes = [
  {
    path: "/v1.0/menus",
    route: menusRouter,
  },
  {
    path: "/v1.0/services",
    route: servicesRouter,
  },
  {
    path: "/v1.0/partners",
    route: partnersRouter,
  },
  {
    path: "/v1.0/facts",
    route: factsRouter,
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
