import {
  createProductPriceController,
  deleteProductPriceController,
  getAllProductPricesController,
  getProductPriceByIdController,
  updateProductPriceController,
} from "../controllers/productPriceController";

import { Router } from "express";

const router = Router();

router.get("/", getAllProductPricesController);
router.get("/:id", getProductPriceByIdController);
router.post("/", createProductPriceController);
router.put("/:id", updateProductPriceController);
router.delete("/:id", deleteProductPriceController);

export default router;
