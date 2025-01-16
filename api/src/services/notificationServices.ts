import { NotificationCategory, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createNotification(data: {
  category: NotificationCategory;
  personnelId: number;
  title: string;
  description: string;
  link?: string;
}) {
  return await prisma.notification.create({
    data: {
      category: data.category,
      personnel: {
        connect: { id: data.personnelId },
      },
      title: data.title,
      description: data.description,
      link: data.link,
    },
  });
}

export async function getNotificationById(id: number) {
  return await prisma.notification.findUnique({
    where: { id },
  });
}

export async function getAllNotifications() {
  return await prisma.notification.findMany();
}

export async function updateNotification(
  id: number,
  data: Partial<{
    category: NotificationCategory;
    personnelId: number;
    title: string;
    description: string;
    link?: string;
    read?: boolean;
  }>
) {
  return await prisma.notification.update({
    where: { id },
    data,
  });
}

export async function getNotificationsByPersonnelId(personnelId: number) {
  return await prisma.notification.findMany({
    where: { personnelId },
    // sort by created date
    orderBy: { createdAt: "desc" },
  });
}

export async function readNotification(id: number) {
  return await prisma.notification.update({
    where: { id },
    data: { read: true },
  });
}

export async function deleteNotification(id: number) {
  return await prisma.notification.delete({
    where: { id },
  });
}

export async function markAllNotificationsAsRead(personnelId: number) {
  return await prisma.notification.updateMany({
    where: { personnelId },
    data: { read: true },
  });
}
