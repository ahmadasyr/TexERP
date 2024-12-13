import {
  createAccountTypeController,
  getAccountTypeByIdController,
  getAllAccountTypesController,
  updateAccountTypeController,
  deleteAccountTypeController,
} from "../controllers/accountTypeController";
import { Router } from "express";

const router = Router();

router.post("/", createAccountTypeController);
router.get("/", getAllAccountTypesController);
router.get("/:id", getAccountTypeByIdController);
router.put("/:id", updateAccountTypeController);
router.delete("/:id", deleteAccountTypeController);

export default router;
