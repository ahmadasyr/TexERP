import express from "express";
import * as customerMeetReportController from "../controllers/customerMeetReportController";

const router = express.Router();

router.post("/", customerMeetReportController.createCustomerMeetReport);
router.get("/", customerMeetReportController.getAllCustomerMeetReports);
router.get("/:id", customerMeetReportController.getCustomerMeetReportById);
router.get(
  "/customer/:id",
  customerMeetReportController.getCustomerMeetReportByCustomer
);
router.put("/:id", customerMeetReportController.updateCustomerMeetReport);
router.delete("/:id", customerMeetReportController.deleteCustomerMeetReport);

export default router;
