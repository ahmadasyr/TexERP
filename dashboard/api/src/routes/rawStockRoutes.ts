import {
  createRawStockController,
  getRawStockByIdController,
  getAllRawStocksController,
  updateRawStockController,
  deleteRawStockController,
} from "../controllers/rawStockController";
import { Router } from "express";

const router = Router();

router.post("/", createRawStockController);
router.get("/:id", getRawStockByIdController);
router.get("/", getAllRawStocksController);
router.put("/:id", updateRawStockController);
router.delete("/:id", deleteRawStockController);

export default router;
