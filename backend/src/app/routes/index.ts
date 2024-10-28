import express from "express";
import path from "path";
import { CarRoutes } from "../module/Cars/car.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/cars",
    route: CarRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
