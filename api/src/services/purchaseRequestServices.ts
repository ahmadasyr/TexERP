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
      personnel: true,
      purchaseRequestItem: true,
    },
  });
};

export const getAllPurchaseRequests = async () => {
  return await prisma.purchaseRequest.findMany({
    include: {
      personnel: true,
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
          },

          update: {
            material: item.material,
            quantity: item.quantity,
            unit: item.unit,
            requestedDate: new Date(item.requestedDate),
            description: item.description,
          },
          create: {
            material: item.material,
            quantity: item.quantity,
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
  return await prisma.purchaseRequest.delete({
    where: {
      id,
    },
    include: {
      purchaseRequestItem: true,
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
      approvalFromPurchasing: null,
    },
    include: {
      personnel: true,
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
      approvalFromManagement: null,
    },
    include: {
      personnel: true,
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
  const management = await prisma.personnel.findMany({
    where: {
      department: "yon",
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

  if (management && approval) {
    const buyingNot = await prisma.notification.createMany({
      data: management.map((man) => ({
        personnelId: man.id,
        title: `Yeni bir satın alma talebi satın alma departmanı tarafından onaylandı.`,
        description: `Satın alma departmanı bir satın alma talebi ${
          approval ? "onayladı, onayınızı bekliyor" : "reddetti"
        }.`,
        category: "Personnel",
        link: "/purchase-request/management/view/?id=" + id,
      })),
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
    purchasingApprovalNotification(id, approval);
  }
  return req;
};

// Stage three (management approval)
export const getPurchaseRequestsForManagement = async () => {
  return await prisma.purchaseRequest.findMany({
    where: {
      approvalFromSupervisor: true,
      approvalFromPurchasing: true,
    },
    include: {
      personnel: true,
    },
  });
};

export const managementApproval = async (
  id: number,
  data: {
    approvalFromManagement: boolean;
  }
) => {
  const req = await prisma.purchaseRequest.update({
    where: {
      id,
      approvalFromSupervisor: true,
      approvalFromPurchasing: true,
    },
    data: {
      approvalFromManagement: data.approvalFromManagement,
      approvalFromManagementDate: new Date(),
    },
  });
  if (req) {
    managementApprovalNotification(id, data.approvalFromManagement);
  }
  return req;
};

const managementApprovalNotification = async (
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
  const buying = await prisma.personnel.findMany({
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
        title: `Üst yönetim satın alma talebinizi ${
          approval ? "onayladı" : "reddetti"
        }.`,
        description: `Satın alma talebiniz üst yönetim tarafından ${
          approval
            ? "onaylandı ve satın alma departmanı tarafından satın alınacak"
            : "reddedildi"
        }.`,
        category: "Personnel",
        link: `/purchase-request/my-requests/view/?id=${id}`,
      },
    });
  }

  if (buying && approval) {
    const buyingNot = await prisma.notification.createMany({
      data: buying.map((buy) => ({
        personnelId: buy.id,
        title: `Yeni bir satın alma talebi Üst Yönetim tarafından onaylandı.`,
        description: `Üst Yönetim bir satın alma talebi ${
          approval ? "onayladı, sipariş oluşturmanızı bekliyor" : "reddetti"
        }.`,
        category: "Personnel",
        link: "/purchase-request/view/?id=" + id,
      })),
    });
  }
};

// private views
export const getPurchaseRequestsByPersonnel = async (personnelId: number) => {
  return await prisma.purchaseRequest.findMany({
    where: {
      personnelId,
    },
    include: {
      personnel: true,
    },
  });
};
