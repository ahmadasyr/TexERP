import { Router } from "express";
import {
  createNotificationController,
  getNotificationByIdController,
  getAllNotificationsController,
  updateNotificationController,
  getNotificationsByPersonnelIdController,
  readNotificationController,
  deleteNotificationController,
  markAllNotificationsAsReadController,
} from "../controllers/notificationController";

const router = Router();

router.post("/", createNotificationController);
router.get("/:id", getNotificationByIdController);
router.get("/", getAllNotificationsController);
router.put("/markAllAsRead/", markAllNotificationsAsReadController);
router.put("/:id", updateNotificationController);
router.get("/personnel/:personnelId", getNotificationsByPersonnelIdController);
router.patch("/:id/", readNotificationController);
router.delete("/:id/", deleteNotificationController);
export default router;
