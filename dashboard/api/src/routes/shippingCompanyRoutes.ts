import {
  createShippingCompanyController,
  deleteShippingCompanyController,
  getAllShippingCompaniesController,
  getShippingCompanyByIdController,
  updateShippingCompanyController,
} from "../controllers/shippingCompanyController";
import { Router } from "express";

const router = Router();

router.get("/", getAllShippingCompaniesController);
router.post("/", createShippingCompanyController);
router.get("/:id", getShippingCompanyByIdController);
router.put("/:id", updateShippingCompanyController);
router.delete("/:id", deleteShippingCompanyController);

export default router;
