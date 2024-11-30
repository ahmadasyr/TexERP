import {
  createProductionOrderWrapController,
  getProductionOrderWrapByIdController,
  getAllProductionOrderWrapsController,
  updateProductionOrderWrapController,
  deleteProductionOrderWrapController,
} from "../controllers/productionOrderWrapController";
import { Router } from "express";

const router = Router();

router.post("/", createProductionOrderWrapController);
router.get("/:id", getProductionOrderWrapByIdController);
router.get("/", getAllProductionOrderWrapsController);
router.put("/:id", updateProductionOrderWrapController);
router.delete("/:id", deleteProductionOrderWrapController);

export default router;
