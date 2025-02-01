import {
  createStockController,
  deleteStockController,
  getStockController,
  getStocksByStatusController,
  getStocksController,
  updateStockController,
  getStocksByIdsController,
} from "../controllers/stockController";

import { Router } from "express";

const router = Router();

router.get("/", getStocksController);
router.get("/:id", getStockController);
router.get("/status/:status", getStocksByStatusController);
router.post("/", createStockController);
router.delete("/:id", deleteStockController);
router.put("/:id", updateStockController);
router.post("/ids", getStocksByIdsController);
export default router;
