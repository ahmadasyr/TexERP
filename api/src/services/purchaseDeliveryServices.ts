// model purchaseDelivery {
//   id                Int      @id @default(autoincrement())
//   createdAt         DateTime @default(now())
//   purchaseOrderId   Int
//   date              DateTime
//   personnelId       Int
//   deliveryNo        String?
//   freightType       String?
//   deliveryType      String?
//   CarId             Int?
//   shippingCarrierId Int?
//   shippingCompanyId Int?
//   km                Int?
//   kmPrice           Float?
//   cost              Float?
//   description       String?
//   // will include purchase order id, date, personnel who accepted the delivery

//   // relations
//   purchaseOrder        purchaseOrder          @relation(fields: [purchaseOrderId], references: [id])
//   personnel            personnel              @relation(fields: [personnelId], references: [id])
//   shippingCarrier      shippingCarrier?       @relation(fields: [shippingCarrierId], references: [id])
//   shippingCar          shippingCar?           @relation(fields: [CarId], references: [id])
//   shippingCompany      shippingCompany?       @relation(fields: [shippingCompanyId], references: [id])
//   purchaseDeliveryItem purchaseDeliveryItem[]
// }

// model purchaseDeliveryItem {
//   id                  Int               @id @default(autoincrement())
//   purchaseDeliveryId  Int
//   purchaseOrderItemId Int
//   quantity            Float
//   personnelId         Int
//   description         String?
//   // will include delivery accept id, order item id, quantity, personnel who accepted the item
//   purchaseDelivery    purchaseDelivery  @relation(fields: [purchaseDeliveryId], references: [id])
//   purchaseOrderItem   purchaseOrderItem @relation(fields: [purchaseOrderItemId], references: [id])
//   personnel           personnel         @relation(fields: [personnelId], references: [id])
// }
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPurchaseDelivery = async (data: {
  purchaseOrderId: number;
  date: Date;
  personnelId: number;
  deliveryNo?: string;
  freightType?: string;
  deliveryType?: string;
  shippingCarId?: number;
  shippingCarrierId?: number;
  shippingCompanyId?: number;
  km?: number;
  kmPrice?: number;
  cost?: number;
  description?: string;
  purchaseDeliveryItem: {
    purchaseOrderItemId: number;
    quantity: number;
    personnelId: number;
    description?: string;
  }[];
}) => {
  return prisma.purchaseDelivery.create({
    data: {
      purchaseOrder: { connect: { id: data.purchaseOrderId } },
      date: new Date(data.date),
      personnel: { connect: { id: data.personnelId } },
      deliveryNo: data.deliveryNo,
      freightType: data.freightType,
      deliveryType: data.deliveryType,
      shippingCar: {
        connect: {
          id: data.shippingCarId,
        },
      },
      shippingCarrier: {
        connect: {
          id: data.shippingCarrierId,
        },
      },
      shippingCompany: {
        connect: {
          id: data.shippingCompanyId,
        },
      },
      km: data.km,
      kmPrice: data.kmPrice,
      cost: data.cost,
      description: data.description,
      purchaseDeliveryItem: {
        createMany: {
          data: data.purchaseDeliveryItem.map((item) => {
            return {
              purchaseOrderItemId: item.purchaseOrderItemId,
              quantity: item.quantity,
              personnelId: item.personnelId,
              description: item.description,
            };
          }),
        },
      },
    },
  });
};

export const getPurchaseDeliveries = async () => {
  return prisma.purchaseDelivery.findMany({
    include: {
      purchaseOrder: true,
      personnel: true,
      shippingCar: true,
      shippingCarrier: true,
      shippingCompany: true,
      purchaseDeliveryItem: {
        include: {
          purchaseOrderItem: true,
          personnel: true,
        },
      },
    },
  });
};

export const getPurchaseDeliveryById = async (id: number) => {
  return prisma.purchaseDelivery.findUnique({
    where: { id },
    include: {
      purchaseOrder: {
        include: {
          purchaseOrderItem: {
            include: {
              material: true,
              currency: true,
              packagingType: true,
            },
          },
        },
      },
      personnel: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      shippingCar: true,
      shippingCarrier: true,
      shippingCompany: true,
      purchaseDeliveryItem: {
        include: {
          purchaseOrderItem: true,
          personnel: true,
        },
      },
    },
  });
};

export const updatePurchaseDelivery = async (
  id: number,
  data: {
    purchaseOrderId: number;
    date: Date;
    personnelId: number;
    deliveryNo?: string;
    freightType?: string;
    deliveryType?: string;
    carId?: number;
    shippingCarrierId?: number;
    shippingCompanyId?: number;
    km?: number;
    kmPrice?: number;
    cost?: number;
    description?: string;
    purchaseDeliveryItem: {
      id: number;
      purchaseOrderItemId: number;
      quantity: number;
      personnelId: number;
      description?: string;
    }[];
  }
) => {
  return prisma.purchaseDelivery.update({
    where: { id },
    data: {
      purchaseOrder: { connect: { id: data.purchaseOrderId } },
      date: data.date,
      personnel: { connect: { id: data.personnelId } },
      deliveryNo: data.deliveryNo,
      freightType: data.freightType,
      deliveryType: data.deliveryType,
      shippingCar: {
        connect: {
          id: data.carId,
        },
      },
      shippingCarrier: {
        connect: {
          id: data.shippingCarrierId,
        },
      },
      shippingCompany: {
        connect: {
          id: data.shippingCompanyId,
        },
      },
      km: data.km,
      kmPrice: data.kmPrice,
      cost: data.cost,
      description: data.description,
      purchaseDeliveryItem: {
        deleteMany: {
          id: {
            notIn: data.purchaseDeliveryItem.map((item) => item.id),
          },
          purchaseDeliveryId: id,
        },
        upsert: data.purchaseDeliveryItem.map((item) => {
          return {
            where: { id: item.id },
            update: {
              purchaseOrderItemId: item.purchaseOrderItemId,
              quantity: item.quantity,
              personnelId: item.personnelId,
              description: item.description,
            },
            create: {
              purchaseOrderItemId: item.purchaseOrderItemId,
              quantity: item.quantity,
              personnelId: item.personnelId,
              description: item.description,
            },
          };
        }),
      },
    },
  });
};

export const deletePurchaseDelivery = async (id: number) => {
  return prisma.purchaseDelivery.delete({
    where: { id },
  });
};
