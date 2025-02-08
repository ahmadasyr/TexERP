import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createOrderShipment = async (data: {
  orderId: number;
  personnelId: number;
}) => {
  return await prisma.dyeShipment.create({
    data: {
      dyeOrder: { connect: { id: data.orderId } },
      personnel: { connect: { id: data.personnelId } },
    },
  });
};

export const updateOrderShipment = async (data: {
  id: number;
  closed?: boolean;
  sentDate: Date;
  shippingCompanyId: number;
  shippingCarrierId: number;
  shippingCarId: number;
}) => {
  return await prisma.dyeShipment.update({
    where: { id: data.id },
    data: {
      ...(data.closed && { closed: data.closed }),
      sentDate: data.sentDate ? new Date(data.sentDate) : undefined,
      shippingCompany: { connect: { id: data.shippingCompanyId } },
      shippingCarrier: { connect: { id: data.shippingCarrierId } },
      shippingCar: { connect: { id: data.shippingCarId } },
    },
  });
};

export const getShipmentsByOrder = async (orderId: number) => {
  return await prisma.dyeShipment.findMany({
    where: { dyeOrderId: orderId },
    include: {
      dyeOrder: true,
      shippingCompany: true,
      shippingCarrier: true,
      shippingCar: true,
      personnel: true,
      dyeShipmentItem: true,
    },
  });
};

export const getShipmentById = async (id: number) => {
  const shipment = await prisma.dyeShipment.findUnique({
    where: { id },
    include: {
      dyeOrder: {
        select: {
          stockStatus: true,
          createdAt: true,
          id: true,
          product: {
            select: {
              name: true,
            },
          },
          supplier: {
            select: {
              name: true,
            },
          },
          dyeOrderItem: {
            select: {
              kazanNo: true,
              dyeColor: {
                select: {
                  name: true,
                },
              },
              yon: true,
              lot: true,
              dyeShipmentItem: {
                include: {
                  stock: {
                    select: {
                      meter: true,
                      kg: true,
                      barcode: true,
                    },
                  },
                  personnel: true,
                },
              },
            },
          },
        },
      },
      shippingCompany: true,
      shippingCarrier: true,
      shippingCar: true,
      personnel: true,
    },
  });
  return {
    ...shipment,
    dyeOrderItems: shipment?.dyeOrder.dyeOrderItem.map((item) => ({
      ...item,
      dyeColorName: item.dyeColor.name,
      scannedItems: item.dyeShipmentItem.map((scannedItem) => ({
        ...scannedItem,
        barcode: scannedItem.stock.barcode,
        id: scannedItem.stockId,
        personnel: `${scannedItem.personnel.firstName} ${scannedItem.personnel.lastName}`,
      })),
    })),
  };
};

export const getShipments = async () => {
  return await prisma.dyeShipment.findMany({
    include: {
      dyeOrder: true,
      shippingCompany: true,
      shippingCarrier: true,
      shippingCar: true,
      personnel: true,
    },
  });
};

export const updateShipmentStatus = async (id: number, closed: boolean) => {
  return await prisma.dyeShipment.update({
    where: { id },
    data: { closed },
  });
};

export const deleteOrderShipment = async (id: number) => {
  return await prisma.dyeShipment.delete({ where: { id } });
};

export const findStockMatchingOrderItem = async (id: number) => {
  const getId = await prisma.dyeOrderItem.findUnique({
    where: { id },
    select: {
      yon: true,
      lot: true,

      dyeOrder: {
        select: { stockStatus: true, productId: true },
      },
    },
  });

  if (getId) {
    const stock = await prisma.stock.findMany({
      where: {
        lot: getId.lot,
        yon: getId.yon,
        status: getId.dyeOrder.stockStatus,
        productId: getId.dyeOrder.productId,
        sold: false,
      },
      select: {
        id: true,
        barcode: true,
        meter: true,
        kg: true,
        shelf: true,
        lot: true,
        yon: true,
        count: true,
      },
    });
    return stock;
  } else {
    return null;
  }
};

export const handleBarcodeRead = async (body: {
  barcode: string;
  orderShipmentId: number;
  orderItemId: number;
  personnelId: number;
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
      status: true,
      sold: true,
      count: true,
    },
  });
  if (!stock) {
    throw new Error("Stok bulunamadı.");
  }
  const findOrderItem = await prisma.dyeOrderItem.findUnique({
    where: { id: body.orderItemId },
    include: {
      dyeOrder: true,
    },
  });

  if (stock && findOrderItem) {
    if (
      findOrderItem.dyeOrder.stockStatus !== stock.status ||
      findOrderItem.lot !== stock.lot ||
      stock.sold === true
    ) {
      console.log({
        stockStatus: findOrderItem.dyeOrder.stockStatus,
        stockLot: findOrderItem.lot,
        stockSold: stock.sold,
        lot: stock.lot,
        status: stock.status,
      });
      throw new Error("Ürün ve stok uyumsuz.");
    } else {
      const confirmRead = await prisma.dyeShipmentItem
        .create({
          data: {
            dyeShipment: { connect: { id: body.orderShipmentId } },
            dyeOrderItem: { connect: { id: body.orderItemId } },
            stock: { connect: { id: stock.id } },
            personnel: { connect: { id: body.personnelId } },
            meter: stock.meter,
            kg: stock.kg,
            count: stock.count || 1,
          },
        })
        .catch((error) => {
          throw new Error(error);
        });
      if (confirmRead) {
        await prisma.stock.update({
          where: { barcode: body.barcode },
          data: { status: "DYE_HOUSE" },
        });
        return confirmRead;
      }
    }
  }
};

export const deleteConfirmation = async (id: number) => {
  const updateStock = await prisma.dyeShipmentItem
    .findUnique({
      where: { id },
      select: {
        stockId: true,
        dyeOrderItem: {
          select: { dyeOrder: { select: { stockStatus: true } } },
        },
      },
    })
    .then((data) => {
      return prisma.stock.update({
        where: { id: data?.stockId },
        data: { status: data?.dyeOrderItem.dyeOrder.stockStatus },
      });
    });
  return await prisma.dyeShipmentItem.delete({ where: { id } });
};

export const getScannedItems = async (id: number) => {
  const scannedItems = await prisma.dyeShipmentItem.findMany({
    where: {
      dyeOrderItemId: id,
    },
    select: {
      id: true,
      kg: true,
      meter: true,
      count: true,
      dyeOrderItem: { select: { lot: true, yon: true } },
      stock: { select: { barcode: true } },
    },
  });
  return scannedItems.map((item, index) => ({
    index: index + 1,
    barcode: item.stock.barcode,
    lot: item.dyeOrderItem.lot,
    yon: item.dyeOrderItem.yon,
    ...item,
  }));
};

export const getConfirmedByOrderId = async (id: number) => {
  return await prisma.dyeConfirmation.findMany({
    where: {
      dyeOrderItem: { dyeOrderId: id },
    },
    select: {
      id: true,
      kg: true,
      meter: true,
      count: true,
      stock: { select: { barcode: true } },
    },
  });
};

export const getOpenShipments = async () => {
  const openShipments = await prisma.dyeShipment.findMany({
    where: {
      closed: false,
    },
    include: {
      dyeOrder: {
        select: {
          supplier: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      personnel: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return openShipments.map((shipment) => ({
    ...shipment,
    supplierName: shipment.dyeOrder.supplier.name,
  }));
};

export const getShipmentItems = async (id: number) => {
  const order = await prisma.dyeOrder.findFirst({
    where: {
      dyeShipment: {
        some: {
          id,
        },
      },
    },
    include: {
      dyeOrderItem: {
        select: {
          id: true,
          lot: true,
          yon: true,
          unit: true,
          quantity: true,
          dyeColor: {
            select: {
              name: true,
            },
          },
          kazanNo: true,
        },
      },
    },
  });
  return order?.dyeOrderItem.map((item, index) => ({
    ...item,
    dyeColorName: item.dyeColor.name,
  }));
};

export const getShipmentItemDetails = async (id: number) => {
  const sentItems = await prisma.dyeShipmentItem.findMany({
    where: { dyeOrderItemId: id },
    select: {
      id: true,
      kg: true,
      meter: true,
      count: true,
      stock: { select: { barcode: true } },
    },
  });
  const item = await prisma.dyeOrderItem.findUnique({
    where: { id },
    select: {
      quantity: true,
      unit: true,
      yon: true,
      lot: true,
      dyeColor: { select: { name: true } },
      dyeOrder: {
        select: {
          stockStatus: true,
          product: { select: { name: true } },
        },
      },
    },
  });
  if (item) {
    return {
      ...item,
      remaining:
        item.unit === "m"
          ? item.quantity - sentItems.reduce((acc, curr) => acc + curr.meter, 0)
          : item.quantity - sentItems.reduce((acc, curr) => acc + curr.kg, 0),
    };
  }
};
