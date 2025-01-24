// model purchaseOrder {
//   id                Int      @id @default(autoincrement())
//   createdAt         DateTime @default(now())
//   personnelId       Int
//   supplierId        Int
//   purchaseRequestId Int
//   purchaseType      String
//   vade              Int?
//   shippingType      String?
//   deadline          DateTime

//   // will include purchase request id, account from where we make the order, date, personnel who created the order, status, description, due date
//   purchaseDelivery  purchaseDelivery[]
//   // relations
//   personnel         personnel           @relation(fields: [personnelId], references: [id])
//   purchaseRequest   purchaseRequest     @relation(fields: [purchaseRequestId], references: [id])
//   purchaseOrderItem purchaseOrderItem[]
//   supplier          supplier            @relation(fields: [supplierId], references: [id])
// }

// model packagingType {
//   id                Int                 @id @default(autoincrement())
//   name              String
//   purchaseOrderItem purchaseOrderItem[]
// }

// model purchaseOrderItem {
//   id              Int          @id @default(autoincrement())
//   purchaseOrderId Int
//   materialId      Int
//   quantity        Float
//   personnelId     Int
//   unit            materialUnit
//   pricePerUnit    Float
//   currencyId      Int
//   vat             Float
//   packagingTypeId Int?
//   specification   String?
//   description     String?

//   // will include material id, purchase order id, quantity, personnel who added the item
//   // relations
//   purchaseOrder        purchaseOrder          @relation(fields: [purchaseOrderId], references: [id])
//   material             material               @relation(fields: [materialId], references: [id])
//   personnel            personnel              @relation(fields: [personnelId], references: [id])
//   currency             currency               @relation(fields: [currencyId], references: [id])
//   packagingType        packagingType?         @relation(fields: [packagingTypeId], references: [id])
//   purchaseDeliveryItem purchaseDeliveryItem[]
//   materialStock        materialStock[]
// }
import {
  department,
  materialUnit,
  PrismaClient,
  purchaseOrderStatus,
} from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient();

export const createPurchaseOrder = async (data: {
  personnelId: number;
  supplierId: number;
  purchaseRequestId: number;
  purchaseType: string;
  vade?: number;
  shippingType?: string;
  deadline: Date;
  requiresApproval?: boolean;
  approved?: boolean;
  approvedDate?: Date;
  status?: purchaseOrderStatus;
  purchaseOrderItem: {
    materialId: number;
    quantity: number;
    personnelId: number;
    unit: materialUnit;
    pricePerUnit?: number;
    currencyId?: number;
    vat?: number;
    packagingTypeId?: number;
    specification?: string;
    description?: string;
  }[];
}) => {
  const order = await prisma.purchaseOrder.create({
    data: {
      personnel: { connect: { id: Number(data.personnelId) } },
      supplier: { connect: { id: Number(data.supplierId) } },
      purchaseRequest: { connect: { id: Number(data.purchaseRequestId) } },
      purchaseType: data.purchaseType,
      vade: data.vade,
      shippingType: data.shippingType,
      deadline: new Date(data.deadline),
      requiresApproval: data.requiresApproval,
      approved: data.requiresApproval ? false : true,
      approvedDate: !data.requiresApproval ? new Date() : null,
      status: data.requiresApproval ? "Pending" : "Approved",
      purchaseOrderItem: {
        createMany: {
          data: data.purchaseOrderItem.map((item) => ({
            materialId: item.materialId,
            quantity: item.quantity,
            personnelId: item.personnelId,
            unit: item.unit,
            pricePerUnit: item.pricePerUnit,
            currencyId: item.currencyId,
            vat: item.vat,
            packagingTypeId: item.packagingTypeId,
            specification: item.specification,
            description: item.description,
          })),
        },
      },
    },
  });
  if (data.requiresApproval) {
    await sendManagementNotification(order.id);
    await sendPersonnelNotification(order.id);
  } else {
    await sendPersonnelNotification(order.id);
  }
};

export const updatePurchaseOrder = async (
  id: number,
  data: {
    personnelId: number;
    supplierId: number;
    purchaseRequestId: number;
    purchaseType: string;
    vade?: number;
    shippingType?: string;
    deadline: Date;
    requiresApproval?: boolean;
    approved?: boolean;
    approvedDate?: Date;
    status?: purchaseOrderStatus;
    purchaseOrderItem: {
      materialId: number;
      quantity: number;
      personnelId: number;
      unit: materialUnit;
      pricePerUnit?: number;
      currencyId?: number;
      vat?: number;
      packagingTypeId?: number;
      specification?: string;
      description?: string;
    }[];
  }
) => {
  const oldOrder = await prisma.purchaseOrder.findUnique({ where: { id: id } });
  const updatedOrder = await prisma.purchaseOrder.update({
    where: { id },
    data: {
      personnel: { connect: { id: data.personnelId } },
      supplier: { connect: { id: data.supplierId } },
      purchaseRequest: { connect: { id: data.purchaseRequestId } },
      purchaseType: data.purchaseType,
      vade: data.vade,
      shippingType: data.shippingType,
      deadline: data.deadline,
      requiresApproval: data.requiresApproval,
      approved: data.requiresApproval ? false : true,
      approvedDate: !data.requiresApproval ? new Date() : null,
      status: data.requiresApproval ? "Pending" : "Approved",
      purchaseOrderItem: {
        deleteMany: {},
        createMany: {
          data: data.purchaseOrderItem.map((item) => ({
            materialId: item.materialId,
            quantity: item.quantity,
            personnelId: item.personnelId,
            unit: item.unit,
            pricePerUnit: item.pricePerUnit,
            currencyId: item.currencyId,
            vat: item.vat,
            packagingTypeId: item.packagingTypeId,
            specification: item.specification,
            description: item.description,
          })),
        },
      },
    },
  });
  if (!oldOrder?.requiresApproval && data.requiresApproval) {
    await sendManagementNotification(updatedOrder.id);
  }
};

export const deletePurchaseOrder = async (id: number) => {
  return await prisma.purchaseOrder.delete({
    where: { id },
  });
};

export const getPurchaseOrder = async (id: number) => {
  return await prisma.purchaseOrder.findUnique({
    where: { id },
    include: {
      personnel: {
        select: {
          firstName: true,
          lastName: true,
          department: true,
          phone: true,
          email: true,
        },
      },
      supplier: {
        include: {
          taxOffice: true,
        },
      },
      purchaseRequest: {
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
      },
      purchaseOrderItem: {
        include: {
          material: true,
          personnel: {
            select: {
              firstName: true,
              lastName: true,
              department: true,
            },
          },
          currency: true,
          packagingType: true,
        },
      },
    },
  });
};

export const getPurchaseOrders = async () => {
  return await prisma.purchaseOrder.findMany({
    include: {
      personnel: {
        select: {
          firstName: true,
          lastName: true,
          department: true,
        },
      },
      supplier: true,
      purchaseRequest: true,
      purchaseOrderItem: {
        include: {
          material: true,
          personnel: {
            select: {
              firstName: true,
              lastName: true,
              department: true,
            },
          },
          currency: true,
          packagingType: true,
        },
      },
    },
  });
};

export const getPurchaseOrdersByPersonnel = async (personnelId: number) => {
  return await prisma.purchaseOrder.findMany({
    where: {
      purchaseRequest: {
        personnelId: personnelId,
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
      purchaseRequest: true,
      purchaseOrderItem: {
        include: {
          material: {
            select: {
              id: true,
              name: true,
            },
          },
          personnel: {
            select: {
              firstName: true,
              lastName: true,
              department: true,
            },
          },
          currency: true,
          packagingType: true,
        },
      },
    },
  });
};

export const approvePurchaseOrder = async (id: number) => {
  return await prisma.purchaseOrder.update({
    where: { id },
    data: {
      approved: true,
      approvedDate: new Date(),
      status: "Approved",
    },
  });
};

export const rejectPurchaseOrder = async (id: number) => {
  return await prisma.purchaseOrder.update({
    where: { id },
    data: {
      approved: false,
      approvedDate: null,
      status: "Rejected",
    },
  });
};

export const completePurchaseOrder = async (id: number) => {
  return await prisma.purchaseOrder.update({
    where: { id },
    data: {
      status: "Completed",
    },
  });
};

export const cancelPurchaseOrder = async (id: number) => {
  return await prisma.purchaseOrder.update({
    where: { id },
    data: {
      status: "Cancelled",
    },
  });
};

export const returnPurchaseOrder = async (id: number) => {
  return await prisma.purchaseOrder.update({
    where: { id },
    data: {
      status: "Returned",
    },
  });
};

const sendManagementNotification = async (id: number) => {
  const purchaseOrder = await prisma.purchaseOrder.findUnique({
    where: { id },
    include: {
      personnel: {
        select: {
          firstName: true,
          lastName: true,
          department: true,
          email: true,
        },
      },
    },
  });
  const management = await prisma.personnel.findMany({
    where: { department: "yon" },
  });
  const notification = await prisma.notification.createMany({
    data: management.map((person) => ({
      title: "Bir satın alma siparişi onay bekliyor",
      description: `Satın alma siparişi ${purchaseOrder?.personnel.firstName} ${purchaseOrder?.personnel.lastName} tarafından oluşturuldu ve onay bekliyor.`,
      link: "/purchase-order/management/view/?id=" + id,
      personnelId: person.id,
      category: "Order",
    })),
  });
  return notification;
};

const sendPersonnelNotification = async (id: number) => {
  const purchaseOrder = await prisma.purchaseOrder.findUnique({
    where: { id },
    include: {
      personnel: {
        select: {
          firstName: true,
          lastName: true,
          department: true,
          email: true,
        },
      },
      purchaseRequest: {
        include: {
          personnel: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });
  const notification = await prisma.notification.create({
    data: {
      title: "Satın alma talebiniz satın alma siparişine dönüştürüldü",
      description: `Satın alma siparişi ${purchaseOrder?.personnel.firstName} ${purchaseOrder?.personnel.lastName} tarafından oluşturuldu.`,
      link: "/purchase-order/personnel/view/?id=" + id,
      personnel: {
        connect: { id: purchaseOrder?.purchaseRequest.personnel.id },
      },
      category: "Order",
    },
  });
  return notification;
};
export const getItemDetails = async (id: number) => {
  return await prisma.purchaseOrderItem.findUnique({
    where: { id },
    select: {
      id: true,
      unit: true,
      quantity: true,
      materialId: true,
      material: {
        select: {
          id: true,
          name: true,
        },
      },
      personnel: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      packagingType: true,
      purchaseDeliveryItem: true,
    },
  });
};
