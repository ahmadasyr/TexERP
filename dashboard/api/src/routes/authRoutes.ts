import { login, register } from "../controllers/authController";
import { Router } from "express";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
