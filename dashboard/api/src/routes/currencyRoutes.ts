import express from "express";
import * as currencyController from "../controllers/currencyController";

const router = express.Router();

router.post("/", currencyController.createCurrency);
router.get("/", currencyController.getAllCurrencies);
router.get("/:id", currencyController.getCurrencyById);
router.put("/:id", currencyController.updateCurrency);
router.delete("/:id", currencyController.deleteCurrency);

export default router;
