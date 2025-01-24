import {
  createMaterialStockController,
  getAllMaterialStockController,
  getMaterialStockByIdController,
  updateMaterialStockController,
  deleteMaterialStockController,
  getMaterialStockByMaterialIdController,
  getMaterialStockByPurchaseOrderIdController,
  getMaterialStockByWarehouseIdController,
} from "../controllers/materialStockController";

import { Router } from "express";

const router = Router();

router.post("/", createMaterialStockController);
router.get("/", getAllMaterialStockController);
router.get("/:id", getMaterialStockByIdController);
router.get("/material/:id", getMaterialStockByMaterialIdController);
router.get("/warehouse/:id", getMaterialStockByWarehouseIdController);
router.get("/purchase-order/:id", getMaterialStockByPurchaseOrderIdController);
router.put("/:id", updateMaterialStockController);
router.delete("/:id", deleteMaterialStockController);

export default router;
