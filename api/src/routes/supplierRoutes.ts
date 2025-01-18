import {
  createSupplierController,
  getSupplierByIdController,
  getAllSuppliersController,
  updateSupplierController,
  deleteSupplierController,
} from "../controllers/supplierController";

import { Router } from "express";

const router = Router();

router.post("/", createSupplierController);
router.get("/:id", getSupplierByIdController);
router.get("/", getAllSuppliersController);
router.put("/:id", updateSupplierController);
router.delete("/:id", deleteSupplierController);

export default router;
