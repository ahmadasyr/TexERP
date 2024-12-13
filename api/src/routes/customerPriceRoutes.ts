import express from "express";
import * as customerPriceController from "../controllers/customerPriceController";

const router = express.Router();

router.post("/", customerPriceController.createCustomerPrice);
router.get("/", customerPriceController.getAllCustomerPrices);
router.get("/:id", customerPriceController.getCustomerPriceById);
router.get("/customer/:id", customerPriceController.getCustomerPriceByCustomer);
router.put("/:id", customerPriceController.updateCustomerPrice);
router.delete("/:id", customerPriceController.deleteCustomerPrice);

export default router;
