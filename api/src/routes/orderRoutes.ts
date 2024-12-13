import express from "express";
import * as orderController from "../controllers/orderController";

const router = express.Router();

router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.get("/customer/:id", orderController.getOrderByCustomerId);
router.get("/product/:id", orderController.getOrderByProductId);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

export default router;
