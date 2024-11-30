import {
  createCutStockController,
  getCutStockController,
  getCutStocksController,
  updateCutStockController,
  deleteCutStockController,
} from "../controllers/cutStockController";
import { Router } from "express";

const router = Router();

router.post("/", createCutStockController);
router.get("/", getCutStocksController);
router.get("/:id", getCutStockController);
router.put("/:id", updateCutStockController);
router.delete("/:id", deleteCutStockController);

export default router;
