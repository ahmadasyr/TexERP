import express from "express";
import * as taxOfficeController from "../controllers/taxOfficeController";

const router = express.Router();

router.post("/", taxOfficeController.createTaxOffice);
router.get("/", taxOfficeController.getAllTaxOffices);
router.get("/:id", taxOfficeController.getTaxOfficeById);
router.put("/:id", taxOfficeController.updateTaxOffice);
router.delete("/:id", taxOfficeController.deleteTaxOffice);

export default router;
