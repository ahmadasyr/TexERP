import {
  createProductTypeController,
  deleteProductTypeController,
  getAllProductTypesController,
  getProductTypeByIdController,
  updateProductTypeController,
} from "../controllers/productType";

import express from "express";

const router = express.Router();

router.get("/", getAllProductTypesController);
router.get("/:id", getProductTypeByIdController);
router.post("/", createProductTypeController);
router.put("/:id", updateProductTypeController);
router.delete("/:id", deleteProductTypeController);

export default router;
