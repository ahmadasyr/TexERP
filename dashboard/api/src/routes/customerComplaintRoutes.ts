import express from "express";
import * as customerComplaintController from "../controllers/customerComplaintController";

const router = express.Router();

router.post("/", customerComplaintController.createCustomerComplaint);
router.get("/", customerComplaintController.getAllCustomerComplaints);
router.get("/:id", customerComplaintController.getCustomerComplaintById);
router.get(
  "/customer/:id",
  customerComplaintController.getCustomerComplaintByCustomer
);
router.put("/:id", customerComplaintController.updateCustomerComplaint);
router.delete("/:id", customerComplaintController.deleteCustomerComplaint);

export default router;
