import {
  createNotification,
  getNotificationById,
  getAllNotifications,
  updateNotification,
  getNotificationsByPersonnelId,
  readNotification,
  deleteNotification,
  markAllNotificationsAsRead,
} from "../services/notificationServices";
import { Request, Response } from "express";

export async function createNotificationController(
  req: Request,
  res: Response
) {
  try {
    const notification = await createNotification(req.body);
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export async function getNotificationByIdController(
  req: Request,
  res: Response
) {
  try {
    const notification = await getNotificationById(Number(req.params.id));
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export async function getAllNotificationsController(
  req: Request,
  res: Response
) {
  try {
    const notifications = await getAllNotifications();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export async function updateNotificationController(
  req: Request,
  res: Response
) {
  try {
    const notification = await updateNotification(
      Number(req.params.id),
      req.body
    );
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export async function getNotificationsByPersonnelIdController(
  req: Request,
  res: Response
) {
  try {
    const notifications = await getNotificationsByPersonnelId(
      Number(req.params.personnelId)
    );
    res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}

export async function readNotificationController(req: Request, res: Response) {
  try {
    const notification = await readNotification(Number(req.params.id));
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export async function deleteNotificationController(
  req: Request,
  res: Response
) {
  try {
    const notification = await deleteNotification(Number(req.params.id));
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export async function markAllNotificationsAsReadController(
  req: Request,
  res: Response
) {
  try {
    const notifications = await markAllNotificationsAsRead(
      req.body.personnelId
    );
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
