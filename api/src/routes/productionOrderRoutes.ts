import {
  createProductionOrderController,
  updateProductionOrderController,
  deleteProductionOrderController,
  getAllProductionOrdersController,
  getProductionOrderByIdController,
} from "../controllers/productionOrderController";
import { Router } from "express";

const router = Router();

router.post("/", createProductionOrderController);
router.put("/:id", updateProductionOrderController);
router.delete("/:id", deleteProductionOrderController);
router.get("/", getAllProductionOrdersController);
router.get("/:id", getProductionOrderByIdController);

export default router;
