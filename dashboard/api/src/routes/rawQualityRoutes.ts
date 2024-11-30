import {
  createRawQualityControlStockController,
  deleteRawQualityControlStockController,
  getAllRawQualityControlStocksController,
  getRawQualityControlStockByIdController,
  updateRawQualityControlStockController,
} from "../controllers/rawQualityController";
import { Router } from "express";

const router = Router();

router.get("/", getAllRawQualityControlStocksController);
router.get("/:id", getRawQualityControlStockByIdController);
router.post("/", createRawQualityControlStockController);
router.put("/:id", updateRawQualityControlStockController);
router.delete("/:id", deleteRawQualityControlStockController);

export default router;
