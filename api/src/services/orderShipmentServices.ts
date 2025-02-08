// // model orderShipment {
//   id                Int       @id @default(autoincrement())
//   orderId           Int
//   createdAt         DateTime  @default(now())
//   sentDate          DateTime?
//   shippingCompanyId Int?
//   shippingCarrierId Int?
//   shippingCarId     Int?
//   closed            Boolean   @default(false)
//   personnelId       Int

//   // Relations
//   order             order               @relation(fields: [orderId], references: [id])
//   shippingCompany   shippingCompany?    @relation(fields: [shippingCompanyId], references: [id])
//   shippingCarrier   shippingCarrier?    @relation(fields: [shippingCarrierId], references: [id])
//   shippingCar       shippingCar?        @relation(fields: [shippingCarId], references: [id])
//   orderShipmentItem orderShipmentItem[]
//   personnel         personnel           @relation(fields: [personnelId], references: [id])
// }

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createOrderShipment = async (data: {
  orderId: number;
  personnelId: number;
}) => {
  return await prisma.orderShipment.create({
    data: {
      order: { connect: { id: data.orderId } },
      personnel: { connect: { id: data.personnelId } },
    },
  });
};

export const updateOrderShipment = async (data: {
  id: number;
  sentDate: Date;
  shippingCompanyId: number;
  shippingCarrierId: number;
  shippingCarId: number;
  orderShipmentItem: {
    id: number;
    meter: number;
    kg: number;
    lot: string;
  }[];
}) => {
  return await prisma.orderShipment.update({
    where: { id: data.id },
    data: {
      sentDate: data.sentDate,
      shippingCompany: { connect: { id: data.shippingCompanyId } },
      shippingCarrier: { connect: { id: data.shippingCarrierId } },
      shippingCar: { connect: { id: data.shippingCarId } },
      orderShipmentItem: {
        deleteMany: {
          id: { notIn: data.orderShipmentItem.map((item) => item.id) },
        },
        updateMany: data.orderShipmentItem.map((item) => ({
          where: { id: item.id },
          data: { meter: item.meter, kg: item.kg, lot: item.lot },
        })),
      },
    },
  });
};

export const closeOpenOrderShipment = async (id: number, status: boolean) => {
  return await prisma.orderShipment.update({
    where: { id },
    data: { closed: status, sentDate: status ? new Date() : null },
  });
};

export const getShipmentsByOrder = async (orderId: number) => {
  return await prisma.orderShipment.findMany({
    where: { orderId },
    include: {
      order: true,
      shippingCompany: true,
      shippingCarrier: true,
      shippingCar: true,
      personnel: true,
      orderShipmentItem: true,
    },
  });
};

export const getShipmentById = async (id: number) => {
  return await prisma.orderShipment.findUnique({
    where: { id },
    include: {
      order: {
        include: {
          customer: { select: { name: true } },
          orderItem: {
            include: {
              product: { select: { id: true, name: true } },
              dyeColor: { select: { name: true } },
              laminationColor: { select: { name: true } },
              orderItemSpecification: {
                select: { outsourceType: { select: { name: true } } },
              },
            },
          },
        },
      },
      shippingCompany: true,
      shippingCarrier: true,
      shippingCar: true,
      personnel: true,
      orderShipmentItem: {
        include: {
          orderItem: {
            include: {
              product: {
                select: { name: true },
              },
              dyeColor: {
                select: { name: true },
              },
              laminationColor: {
                select: { name: true },
              },
              orderItemSpecification: {
                select: { outsourceType: { select: { name: true } } },
              },
            },
          },
        },
      },
      orderShipmentConfirmation: true,
    },
  });
};

export const getShipments = async () => {
  return await prisma.orderShipment.findMany({
    include: {
      order: true,
      shippingCompany: true,
      shippingCarrier: true,
      shippingCar: true,
      personnel: true,
    },
  });
};

export const deleteOrderShipment = async (id: number) => {
  return await prisma.orderShipment.delete({ where: { id } });
};

export const createByItem = async (data: {
  orderItemId: number;
  meter: number;
  kg: number;
  personnelId: number;
  lot: string;
}) => {
  const findOrderItem = await prisma.orderItem.findUnique({
    where: { id: data.orderItemId },
  });
  const findOpenShipment = await prisma.orderShipment.findFirst({
    where: { orderId: findOrderItem?.orderId, closed: false },
  });
  if (findOpenShipment) {
    return await prisma.orderShipmentItem.create({
      data: {
        orderShipment: { connect: { id: findOpenShipment.id } },
        orderItem: { connect: { id: data.orderItemId } },
        meter: data.meter,
        kg: data.kg,
        lot: data.lot,
        personnel: { connect: { id: data.personnelId } },
      },
    });
  } else {
    return await prisma.orderShipment.create({
      data: {
        order: { connect: { id: findOrderItem?.orderId } },
        personnel: { connect: { id: data.personnelId } },
        orderShipmentItem: {
          create: {
            orderItem: { connect: { id: data.orderItemId } },
            meter: data.meter,
            kg: data.kg,
            lot: data.lot,
            personnel: { connect: { id: data.personnelId } },
          },
        },
      },
    });
  }
};

export const getConfirmedShipments = async (orderId: number) => {
  return await prisma.orderShipmentConfirmation.findMany({
    where: {
      orderShipment: {
        orderId: orderId,
      },
    },
    select: {
      sentKg: true,
      sentMeter: true,
      orderItemId: true,
    },
  });
};

export const getOpenShipments = async () => {
  const shipment = await prisma.orderShipment.findMany({
    where: { closed: false },
    select: {
      personnel: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      id: true,
      createdAt: true,
      orderId: true,
      order: {
        select: {
          customer: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return shipment.map((item) => ({
    id: item.id,
    customerName: item.order.customer.name,
    personnel: item.personnel,
    createdAt: item.createdAt,
    orderId: item.orderId,
  }));
};

export const getShipmentItems = async (id: number) => {
  const items = await prisma.orderShipmentItem.findMany({
    where: { orderShipmentId: id },
    include: {
      orderItem: {
        include: {
          product: { select: { name: true } },
          dyeColor: { select: { name: true } },
          laminationColor: { select: { name: true } },
          orderItemSpecification: {
            select: { outsourceType: { select: { name: true } } },
          },
        },
      },
    },
  });

  return items.map((item) => ({
    id: item.id,
    meter: item.meter,
    kg: item.kg,
    lot: item.lot,
    itemType: item.orderItem.itemType,
    productName: item.orderItem.product.name,
    dyeColorName: item.orderItem.dyeColor?.name,
    laminationColorName: item.orderItem.laminationColor?.name,
    outsourceTypeNames: item.orderItem.orderItemSpecification
      .map((spec) => spec.outsourceType.name)
      .join(", "),
  }));
};

export const findStockMatchingOrderItem = async (id: number) => {
  const getId = await prisma.orderShipmentItem.findUnique({
    where: { id },
    select: { orderItemId: true, lot: true },
  });
  const orderItem = await prisma.orderItem.findUnique({
    where: { id: getId?.orderItemId },
    include: {
      product: true,
      dyeColor: true,
      laminationColor: true,
      orderItemSpecification: {
        select: { outsourceTypeId: true },
      },
    },
  });

  if (!orderItem) {
    throw new Error(`Order item with id ${id} not found.`);
  }

  const outsourceTypeIds = orderItem.orderItemSpecification?.map(
    (spec) => spec.outsourceTypeId
  );

  const stock = await prisma.stock.findMany({
    where: {
      productId: orderItem.productId,
      dyeColorId: orderItem.dyeColorId,
      laminationColorId: orderItem.laminationColorId,
      sold: false,
      status: orderItem.itemType,
      stockSpecifications: {
        every: {
          outsourceId: {
            in: outsourceTypeIds,
          },
        },
      },
      ...(getId?.lot ? { lot: getId.lot } : {}),
    },
    select: {
      id: true,
      barcode: true,
      meter: true,
      kg: true,
      shelf: true,
      lot: true,
    },
  });

  return stock;
};

export const handleBarcodeRead = async (body: {
  barcode: string;
  orderShipmentId: number;
  orderItemId: number;
  personnelId: number;
  lot: string;
}) => {
  const stock = await prisma.stock.findUnique({
    where: { barcode: body.barcode },
    select: {
      id: true,
      meter: true,
      kg: true,
      lot: true,
      barcode: true,
      productId: true,
      dyeColorId: true,
      laminationColorId: true,
      status: true,
      sold: true,
    },
  });
  if (!stock) {
    throw new Error("Stok bulunamadı.");
  }
  const findOrderItem = await prisma.orderItem.findUnique({
    where: { id: body.orderItemId },
    select: {
      productId: true,
      dyeColorId: true,
      laminationColorId: true,
      itemType: true,
      orderItemSpecification: {
        select: {
          outsourceTypeId: true,
        },
      },
    },
  });

  if (stock && findOrderItem) {
    if (
      findOrderItem.productId !== stock.productId ||
      findOrderItem.dyeColorId !== stock.dyeColorId ||
      findOrderItem.laminationColorId !== stock.laminationColorId ||
      findOrderItem.itemType !== stock.status ||
      body.lot
        ? stock.lot !== body.lot
        : false || stock.sold
    ) {
      throw new Error("Ürün ve stok uyumsuz.");
    } else {
      const confirmRead = await prisma.orderShipmentConfirmation
        .create({
          data: {
            orderShipment: { connect: { id: body.orderShipmentId } },
            personnel: { connect: { id: body.personnelId } },
            orderItem: { connect: { id: body.orderItemId } },
            stock: { connect: { id: stock.id } },
            sentMeter: stock.meter,
            sentKg: stock.kg,
            lot: stock.lot,
            barcode: body.barcode,
          },
        })
        .catch((error) => {
          throw new Error(error);
        });
      if (confirmRead) {
        await prisma.stock.update({
          where: { barcode: body.barcode },
          data: { sold: true },
        });
        return confirmRead;
      }
    }
  }
};

export const getShipmentItemDetails = async (id: number) => {
  const item = await prisma.orderShipmentItem.findUnique({
    where: { id },
    select: {
      meter: true,
      kg: true,
      orderItemId: true,
      orderShipmentId: true,
      lot: true,
      orderItem: {
        select: {
          product: { select: { name: true } },
          dyeColor: { select: { name: true } },
          laminationColor: { select: { name: true } },
          itemType: true,
          orderItemSpecification: {
            select: { outsourceType: { select: { name: true } } },
          },
        },
      },
    },
  });
  const sentItems = await prisma.orderShipmentConfirmation.findMany({
    where: {
      orderShipmentId: item?.orderShipmentId,
      orderItemId: item?.orderItemId,
    },
    select: {
      sentKg: true,
      sentMeter: true,
    },
  });
  return {
    ...item,
    productName: item?.orderItem.product.name,
    dyeColorName: item?.orderItem.dyeColor?.name,
    laminationColorName: item?.orderItem.laminationColor?.name,
    outsourceTypeNames: item?.orderItem.orderItemSpecification
      .map((spec) => spec.outsourceType.name)
      .join(", "),
    remainingMeter:
      item?.meter &&
      item?.meter - sentItems.reduce((acc, item) => acc + item.sentMeter, 0),
    remainingKg:
      item?.kg &&
      item?.kg - sentItems.reduce((acc, item) => acc + item.sentKg, 0),
  };
};

export const getScannedItems = async (id: number) => {
  const getId = await prisma.orderShipmentItem.findUnique({
    where: { id },
    select: { orderItemId: true, orderShipmentId: true },
  });
  const orderItem = await prisma.orderItem.findUnique({
    where: { id: getId?.orderItemId },
    select: { id: true },
  });

  if (!orderItem) {
    throw new Error(`Order item with id ${id} not found.`);
  }

  const scannedItems = await prisma.orderShipmentConfirmation.findMany({
    where: {
      orderShipmentId: getId?.orderShipmentId,
      orderItemId: orderItem.id,
    },
    select: {
      id: true,
      sentKg: true,
      sentMeter: true,
      lot: true,
      barcode: true,
    },
  });
  return scannedItems.map((item, index) => ({
    index: index + 1,
    ...item,
  }));
};

export const deleteConfirmation = async (id: number) => {
  const updateStock = await prisma.orderShipmentConfirmation
    .findUnique({
      where: { id },
      select: { stockId: true },
    })
    .then((data) => {
      return prisma.stock.update({
        where: { id: data?.stockId },
        data: { sold: false },
      });
    });
  return await prisma.orderShipmentConfirmation.delete({ where: { id } });
};
