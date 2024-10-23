import express from "express";
import * as productFeasibilityFormController from "../controllers/productFeasibilityFormController";

const router = express.Router();

router.post("/", productFeasibilityFormController.createProductFeasibilityForm);
router.get("/", productFeasibilityFormController.getAllProductFeasibilityForms);
router.get(
  "/:id",
  productFeasibilityFormController.getProductFeasibilityFormById
);
router.put(
  "/:id",
  productFeasibilityFormController.updateProductFeasibilityForm
);
router.delete(
  "/:id",
  productFeasibilityFormController.deleteProductFeasibilityForm
);

export default router;
