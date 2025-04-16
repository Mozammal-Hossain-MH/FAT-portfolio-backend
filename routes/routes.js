import { Router } from "express";
const router = Router();

const moduleRoutes = [
  {
    path: "/v1.0/auth",
    route: "",
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
