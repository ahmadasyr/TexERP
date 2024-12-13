import express from "express";
import * as competitorReportController from "../controllers/competitorReportController";

const router = express.Router();

router.post("/", competitorReportController.createCompetitorReport);
router.get("/", competitorReportController.getAllCompetitorReports);
router.get("/:id", competitorReportController.getCompetitorReportById);
router.get(
  "/competitor/:id",
  competitorReportController.getCompetitorReportByCompetitor
);
router.put("/:id", competitorReportController.updateCompetitorReport);
router.delete("/:id", competitorReportController.deleteCompetitorReport);

export default router;
