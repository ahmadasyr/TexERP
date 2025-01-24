import {
  createMaterialController,
  getMaterialByIdController,
  getAllMaterialsController,
  updateMaterialController,
  deleteMaterialController,
  getMaterialByCategoryController,
  getMaterialsInOrderController,
} from "../controllers/materialController";

import { Router } from "express";

const router = Router();

router.post("/", createMaterialController);
router.get("/:id", getMaterialByIdController);
router.get("/", getAllMaterialsController);
router.get("/order/:orderId", getMaterialsInOrderController);
router.put("/:id", updateMaterialController);
router.delete("/:id", deleteMaterialController);
router.get("/category/:categoryId", getMaterialByCategoryController);

export default router;
