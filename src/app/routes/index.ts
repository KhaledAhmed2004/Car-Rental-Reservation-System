import { Router } from "express";
import { AuthRoutes } from "../modules/user/user.routes";

const router = Router();

const moduleRoutes = [{ path: "/auth", route: AuthRoutes }];

router.use("/auth", AuthRoutes);
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
