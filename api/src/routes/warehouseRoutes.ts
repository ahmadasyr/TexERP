import {
  createWarehouseController,
  deleteWarehouseController,
  getAllWarehousesController,
  getWarehouseByIdController,
  updateWarehouseController,
} from "../controllers/warehouseController";

import { Router } from "express";

const router = Router();

router.get("/", getAllWarehousesController);
router.get("/:id", getWarehouseByIdController);
router.post("/", createWarehouseController);
router.put("/:id", updateWarehouseController);
router.delete("/:id", deleteWarehouseController);

export default router;
