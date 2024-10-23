import express from "express";
import * as customerMeetPlanController from "../controllers/customerMeetPlanController";

const router = express.Router();

router.post("/", customerMeetPlanController.createCustomerMeetPlan);
router.get("/", customerMeetPlanController.getAllCustomerMeetPlans);
router.get("/:id", customerMeetPlanController.getCustomerMeetPlanById);
router.put("/:id", customerMeetPlanController.updateCustomerMeetPlan);
router.delete("/:id", customerMeetPlanController.deleteCustomerMeetPlan);

export default router;
