import {
  registerUser,
  loginUser,
  logOutUser,
} from "../controllers/user.controller.js";
import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

//secured route
router.route("/logout").get(authenticateUser, logOutUser);

export default router;
