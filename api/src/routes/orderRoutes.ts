import express from "express";
import * as orderController from "../controllers/orderController";

const router = express.Router();

router.post("/", orderController.createOrderController);
router.get("/:id", orderController.getOrderController);
router.get("/", orderController.getOrdersController);
router.put("/:id", orderController.updateOrderController);
router.delete("/:id", orderController.deleteOrderController);

export default router;
