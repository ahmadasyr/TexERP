import {
  createMaterialCategoryController,
  getMaterialCategoryByIdController,
  getAllMaterialCategoriesController,
  updateMaterialCategoryController,
  deleteMaterialCategoryController,
} from "../controllers/materialCategoryController";
import { Router } from "express";

const router = Router();

router.post("/", createMaterialCategoryController);
router.get("/:id", getMaterialCategoryByIdController);
router.get("/", getAllMaterialCategoriesController);
router.put("/:id", updateMaterialCategoryController);
router.delete("/:id", deleteMaterialCategoryController);

export default router;
