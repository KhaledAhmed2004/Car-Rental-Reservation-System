import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/signup", UserControllers.createUser);
router.post("/signin", UserControllers.singIn);

export const AuthRoutes = router;
