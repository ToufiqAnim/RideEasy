import express from "express";
import path from "path";
import { CarRoutes } from "../module/Cars/car.routes";
import { AuthRoutes } from "../module/Auth/auth.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/cars",
    route: CarRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
