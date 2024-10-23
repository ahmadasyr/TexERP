import express from "express";
import * as bankController from "../controllers/bankController";

const router = express.Router();

router.post("/", bankController.createBank);
router.get("/", bankController.getAllBanks);
router.get("/:id", bankController.getBankById);
router.put("/:id", bankController.updateBank);
router.delete("/:id", bankController.deleteBank);

export default router;
