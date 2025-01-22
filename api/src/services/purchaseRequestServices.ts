// model purchaseRequest {
//   id                         Int                   @id @default(autoincrement())
//   createdAt                  DateTime              @default(now())
//   department                 department
//   personnelId                Int
//   approvalFromSupervisor     Boolean               @default(false)
//   approvalFromSupervisorDate DateTime
//   approvalFromManagement     Boolean               @default(false)
//   approvalFromManagementDate DateTime
//   // will include date, personnel who requested, personnel who resulted, management approval, status, description
//   //Relations
//   personnel                  personnel             @relation(fields: [personnelId], references: [id])
//   purchaseRequestItem        purchaseRequestItem[]

//   purchaseOrder purchaseOrder[]
// }

// model purchaseRequestItem {
//   id                Int             @id @default(autoincrement())
//   createdAt         DateTime        @default(now())
//   purchaseRequestId Int
//   material          String
//   quantity          Float
//   requestedDate     DateTime
//   description       String?
//   // will include purchase request id, material id, quantity
//   purchaseRequest   purchaseRequest @relation(fields: [purchaseRequestId], references: [id])
// }

import { department, materialUnit, PrismaClient } from "@prisma/client";
import app from "../server";

const prisma = new PrismaClient();

export const createPurchaseRequest = async (data: {
  personnelId: number;
  department: department;
  approvalFromSupervisor?: boolean;
  purchaseRequestItem: {
    material: string;
    quantity: number;
    unit: materialUnit;
    requestedDate: Date;
    description?: string;
  }[];
}) => {
  const res = await prisma.purchaseRequest.create({
    data: {
      personnel: {
        connect: {
          id: data.personnelId,
        },
      },
      department: data.department,
      approvalFromSupervisor: data.approvalFromSupervisor || null,
      approvalFromSupervisorDate: data.approvalFromSupervisor
        ? new Date()
        : null,
      purchaseRequestItem: {
        createMany: {
          data: data.purchaseRequestItem.map((item) => ({
            material: item.material,
            quantity: item.quantity,
            originalQuantity: item.quantity,
            unit: item.unit,
            requestedDate: new Date(item.requestedDate),
            description: item.description,
          })),
        },
      },
    },
  });
  if (res) {
    const personnel = await prisma.personnel.findUnique({
      where: {
        id: data.personnelId,
      },
    });
    const supervisorId = personnel?.supervisorId;
    if (supervisorId) {
      const notification = await prisma.notification.create({
        data: {
          personnel: { connect: { id: supervisorId } },
          description: `${personnel?.firstName} ${personnel?.lastName} tarafından yeni bir satın alma talebi oluşturuldu.`,
          title: `Yeni bir satın alma talebi onayınızı bekliyor.`,
          category: "Personnel",
          link: "/purchase-request/supervisor/view/?id=" + res.id,
        },
      });
    }
  }
  return res;
};

export const getPurchaseRequest = async (id: number) => {
  return await prisma.purchaseRequest.findUnique({
    where: {
      id,
    },
    include: {
      personnel: {
        select: {
          firstName: true,
          lastName: true,
          department: true,
        },
      },
      purchaseRequestItem: true,
    },
  });
};

export const getAllPurchaseRequests = async () => {
  return await prisma.purchaseRequest.findMany({
    include: {
      personnel: {
        select: {
          firstName: true,
          lastName: true,
          department: true,
        },
      },
    },
  });
};

export const updatePurchaseRequest = async (
  id: number,
  data: {
    personnelId: number;
    department: department;
    purchaseRequestItem: {
      id?: number;
      material: string;
      quantity: number;
      unit: materialUnit;
      requestedDate: Date;
      description?: string;
    }[];
  }
) => {
  return await prisma.purchaseRequest.update({
    where: {
      id,
    },
    data: {
      personnel: {
        connect: {
          id: data.personnelId,
        },
      },
      department: data.department,
      purchaseRequestItem: {
        deleteMany: {
          id: {
            notIn: data.purchaseRequestItem
              .map((item) => item.id)
              .filter((id) => id !== undefined),
          },
        },
        upsert: data.purchaseRequestItem.map((item) => ({
          where: {
            id: item.id,
            purchaseRequestId: id,
          },

          update: {
            material: item.material,
            quantity: item.quantity,
            originalQuantity: item.quantity,
            unit: item.unit,
            requestedDate: new Date(item.requestedDate),
            description: item.description,
          },
          create: {
            material: item.material,
            quantity: item.quantity,
            originalQuantity: item.quantity,
            unit: item.unit,
            requestedDate: new Date(item.requestedDate),
            description: item.description,
          },
        })),
      },
    },
  });
};

export const deletePurchaseRequest = async (id: number) => {
  if (
    await prisma.purchaseOrder.findFirst({
      where: {
        purchaseRequestId: id,
      },
    })
  ) {
    return new Error("Purchase request has purchase orders, cannot delete");
  }
  await prisma.purchaseRequestItem.deleteMany({
    where: {
      purchaseRequestId: id,
    },
  });

  return await prisma.purchaseRequest.delete({
    where: {
      id,
    },
  });
};

// end of crud operations

// Stage one (supervisor approval)
export const getSubordinatesPurchaseRequests = async (personnelId: number) => {
  return await prisma.purchaseRequest.findMany({
    where: {
      personnel: {
        supervisorId: personnelId,
      },
    },
    include: {
      personnel: {
        select: {
          firstName: true,
          lastName: true,
          department: true,
        },
      },
    },
  });
};

export const supervisorApproval = async (id: number, approval: boolean) => {
  const purchaseRequest = await prisma.purchaseRequest.findUnique({
    where: {
      id,
    },
  });

  if (!purchaseRequest) {
    throw new Error(`Purchase request with id ${id} not found`);
  }

  const { approvalFromSupervisor } = purchaseRequest;
  const res = await prisma.purchaseRequest.update({
    where: {
      id,
    },
    data: {
      approvalFromSupervisor: approval,
      approvalFromSupervisorDate: new Date(),
    },
  });
  if (res) {
    const items = await prisma.purchaseRequestItem.findMany({
      where: {
        purchaseRequestId: id,
      },
    });
    const updateItems = items.map((item) => {
      return prisma.purchaseRequestItem.update({
        where: {
          id: item.id,
        },
        data: {
          supervisorQuantity: approval ? item.quantity : 0,
        },
      });
    });
    supervisorApprovalNotification(id, approval);
  }
  return res;
};

const supervisorApprovalNotification = async (
  id: number,
  approval: boolean
) => {
  const purchaseRequest = await prisma.purchaseRequest.findUnique({
    where: {
      id,
    },
    include: {
      personnel: {
        include: {
          supervisor: true,
        },
      },
    },
  });
  const purchasing = await prisma.personnel.findMany({
    where: {
      department: "stn",
    },
  });
  const personnel = purchaseRequest?.personnel;
  const supervisor = personnel?.supervisor;
  if (personnel && supervisor) {
    const personnelNot = await prisma.notification.create({
      data: {
        personnel: { connect: { id: personnel.id } },
        description: `Bölum Müdürünüz ${supervisor?.firstName} ${
          supervisor?.lastName
        } tarafından satın alma talebizi ${
          approval
            ? "onayladı satın alma departmanı onayını bekliyor"
            : "reddetti"
        }.`,
        title: `Satın alma talebiniz ${approval ? "onaylandı" : "reddedildi"}.`,
        category: "Personnel",
        link: "/purchase-request/my-requests/view/?id=" + id,
      },
    });
  }

  if (purchasing && approval) {
    const purchasingNotification = await prisma.notification.createMany({
      data: purchasing.map((purchase) => ({
        personnelId: purchase.id,
        title: `Yeni bir satın alma talebi onayınızı bekliyor.`,
        description: `Bölüm Müdürü ${supervisor?.firstName} ${
          supervisor?.lastName
        } tarafından ${approval ? "onaylandı" : "reddedildi"}.`,
        category: "Personnel",
        link: "/purchase-request/purchasing/view/?id=" + id,
      })),
    });
  }
};
// Stage two (purchasing department approval)

export const getSupervisorApprovedPurchaseRequests = async () => {
  return await prisma.purchaseRequest.findMany({
    where: {
      approvalFromSupervisor: true,
    },
    include: {
      personnel: {
        select: {
          firstName: true,
          lastName: true,
          department: true,
        },
      },
    },
  });
};

const purchasingApprovalNotification = async (
  id: number,
  approval: boolean
) => {
  const purchaseRequest = await prisma.purchaseRequest.findUnique({
    where: {
      id,
    },
    include: {
      personnel: {
        include: {
          supervisor: true,
        },
      },
    },
  });
  const personnel = purchaseRequest?.personnel;
  const supervisor = personnel?.supervisor;
  if (personnel && supervisor) {
    const personnelNot = await prisma.notification.create({
      data: {
        personnel: { connect: { id: personnel.id } },
        description: `Satın alma talebiniz satın alma departmanı tarafından ${
          approval ? "onaylandı üst yönetim onayını bekliyor" : "reddedildi"
        }.`,
        title: `Satın alma talebiniz ${approval ? "onaylandı" : "reddedildi"}.`,
        category: "Personnel",
        link: "/purchase-request/my-requests/view/?id=" + id,
      },
    });
  }
};

export const purchasingApproval = async (id: number, approval: boolean) => {
  const req = await prisma.purchaseRequest.update({
    where: {
      id,
      approvalFromSupervisor: true,
    },
    data: {
      approvalFromPurchasing: approval,
      approvalFromPurchasingDate: new Date(),
    },
  });
  if (req) {
    const items = await prisma.purchaseRequestItem.findMany({
      where: {
        purchaseRequestId: id,
      },
    });
    const updateItems = items.map((item) => {
      return prisma.purchaseRequestItem.update({
        where: {
          id: item.id,
        },
        data: {
          purchasingQuantity: approval ? item.quantity : 0,
        },
      });
    });
    purchasingApprovalNotification(id, approval);
  }
  return req;
};

// private views
export const getPurchaseRequestsByPersonnel = async (personnelId: number) => {
  return await prisma.purchaseRequest.findMany({
    where: {
      personnelId,
    },
    include: {
      personnel: {
        select: {
          firstName: true,
          lastName: true,
          department: true,
        },
      },
    },
  });
};
