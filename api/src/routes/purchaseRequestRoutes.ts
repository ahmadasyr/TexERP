import {
  createPurchaseRequestController,
  getPurchaseRequestController,
  getAllPurchaseRequestsController,
  updatePurchaseRequestController,
  deletePurchaseRequestController,
  supervisorApprovalTrueController,
  supervisorApprovalFalseController,
  getPurchaseRequestsByPersonnelController,
  getSubordinatesPurchaseRequestsController,
  getSupervisorApprovedPurchaseRequestsController,
  purchasingApprovalFalseController,
  purchasingApprovalTrueController,
  getPurchaseRequestForPersonnelController,
} from "../controllers/purchaseRequestController";
import { Router } from "express";

const router = Router();

router.post("/", createPurchaseRequestController);
router.get(
  "/supervisor-approved",
  getSupervisorApprovedPurchaseRequestsController
);
router.get("/:id", getPurchaseRequestController);
router.get("/", getAllPurchaseRequestsController);
router.get("/personnel-request/:id", getPurchaseRequestForPersonnelController);
router.get("/personnel/:personnelId", getPurchaseRequestsByPersonnelController);
router.get(
  "/subordinates/:personnelId",
  getSubordinatesPurchaseRequestsController
);
router.put("/:id", updatePurchaseRequestController);
router.delete("/:id", deletePurchaseRequestController);
router.put("/supervisor/false/:id", supervisorApprovalFalseController);
router.put("/supervisor/true/:id", supervisorApprovalTrueController);
router.put("/purchasing/false/:id", purchasingApprovalFalseController);
router.put("/purchasing/true/:id", purchasingApprovalTrueController);

export default router;
