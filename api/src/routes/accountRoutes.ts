import {
  createAccountController,
  getAccountByIdController,
  getAllAccountsController,
  updateAccountController,
  deleteAccountController,
  getAccountByPropertiesController,
} from "../controllers/accountController";

import { Router } from "express";

const router = Router();

router.post("/", createAccountController);
router.get("/:id", getAccountByIdController);
router.get("/", getAllAccountsController);
router.put("/:id", updateAccountController);
router.delete("/:id", deleteAccountController);
router.get("/code/:code", getAccountByPropertiesController);
export default router;
