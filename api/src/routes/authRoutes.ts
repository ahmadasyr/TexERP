import { login, register, resetPassword } from "../controllers/authController";
import { Router } from "express";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.put("/reset", resetPassword);

export default router;
