import {
  createReportIssueController,
  deleteReportIssueController,
  getReportIssueByIdController,
  getReportIssuesController,
  closeReportIssueController,
  getReportIssueByPersonnelIdController,
  updateReportIssueController,
} from "../controllers/reportIssueController";

import { Router } from "express";

const router = Router();

router.get("/", getReportIssuesController);
router.get("/:id", getReportIssueByIdController);
router.get("/personnel/:personnelId", getReportIssueByPersonnelIdController);
router.put("/close/:id", closeReportIssueController);
router.post("/", createReportIssueController);
router.put("/:id", updateReportIssueController);
router.delete("/:id", deleteReportIssueController);

export default router;
