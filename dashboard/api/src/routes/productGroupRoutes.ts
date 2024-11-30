import {
  createProductGroupController,
  getProductGroupByIdController,
  getAllProductGroupsController,
  updateProductGroupController,
  deleteProductGroupController,
} from "../controllers/productGroupController";
import { Router } from "express";

const router = Router();

router.post("/", createProductGroupController);
router.get("/:id", getProductGroupByIdController);
router.get("/", getAllProductGroupsController);
router.put("/:id", updateProductGroupController);
router.delete("/:id", deleteProductGroupController);

export default router;
