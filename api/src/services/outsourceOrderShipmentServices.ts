import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createOrderShipment = async (data: {
  orderId: number;
  personnelId: number;
}) => {
  return await prisma.outsourceShipment.create({
    data: {
      outsourceOrder: { connect: { id: data.orderId } },
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
  return await prisma.outsourceShipment.update({
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
  return await prisma.outsourceShipment.findMany({
    where: { outsourceOrderId: orderId },
    include: {
      outsourceOrder: true,
      shippingCompany: true,
      shippingCarrier: true,
      shippingCar: true,
      personnel: true,
      outsourceShipmentItem: true,
    },
  });
};

export const getShipmentById = async (id: number) => {
  const shipment = await prisma.outsourceShipment.findUnique({
    where: { id },
    include: {
      outsourceOrder: {
        select: {
          stockStatus: true,
          createdAt: true,
          outsourceType: {
            select: {
              name: true,
            },
          },
          id: true,
          supplier: {
            select: {
              name: true,
            },
          },
          outsourceOrderItem: {
            select: {
              dyeColor: {
                select: {
                  name: true,
                },
              },
              product: {
                select: {
                  name: true,
                },
              },
              laminationColor: {
                select: {
                  name: true,
                },
              },
              quantity: true,
              unit: true,
              outsourceShipmentItem: {
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
    outsourceTypeName: shipment?.outsourceOrder.outsourceType.name,
    outsourceOrderItems: shipment?.outsourceOrder.outsourceOrderItem.map(
      (item) => ({
        ...item,
        productName: item.product?.name,
        dyeColorName: item.dyeColor?.name,
        laminationColorName: item.laminationColor?.name,
        scannedItems: item.outsourceShipmentItem.map((scannedItem) => ({
          ...scannedItem,
          barcode: scannedItem.stock.barcode,
          id: scannedItem.stockId,
          personnel: `${scannedItem.personnel.firstName} ${scannedItem.personnel.lastName}`,
        })),
      })
    ),
  };
};

export const getShipments = async () => {
  return await prisma.outsourceShipment.findMany({
    include: {
      outsourceOrder: true,
      shippingCompany: true,
      shippingCarrier: true,
      shippingCar: true,
      personnel: true,
    },
  });
};

export const updateShipmentStatus = async (id: number, closed: boolean) => {
  return await prisma.outsourceShipment.update({
    where: { id },
    data: { closed, sentDate: closed ? new Date() : null },
  });
};

export const deleteOrderShipment = async (id: number) => {
  return await prisma.outsourceShipment.delete({ where: { id } });
};

export const findStockMatchingOrderItem = async (id: number) => {
  const getId = await prisma.outsourceOrderItem.findUnique({
    where: { id },
    select: {
      productId: true,
      dyeColorId: true,
      outsourceOrder: {
        select: { stockStatus: true },
      },
    },
  });

  if (getId) {
    const stock = await prisma.stock.findMany({
      where: {
        status: getId.outsourceOrder.stockStatus,
        productId: getId.productId,
        dyeColorId: getId.dyeColorId || undefined,
        sold: false,
      },
      select: {
        id: true,
        barcode: true,
        meter: true,
        kg: true,
        shelf: true,
        lot: true,
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
  const findOrderItem = await prisma.outsourceOrderItem.findUnique({
    where: { id: body.orderItemId },
    include: {
      outsourceOrder: true,
    },
  });

  if (stock && findOrderItem) {
    if (
      findOrderItem.outsourceOrder.stockStatus !== stock.status ||
      stock.sold === true
    ) {
      throw new Error("Ürün ve stok uyumsuz.");
    } else {
      const confirmRead = await prisma.outsourceShipmentItem
        .create({
          data: {
            outsourceShipment: { connect: { id: body.orderShipmentId } },
            outsourceOrderItem: { connect: { id: body.orderItemId } },
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
          data: { status: "OUTSOURCING" },
        });
        return confirmRead;
      }
    }
  }
};

export const deleteConfirmation = async (id: number) => {
  const updateStock = await prisma.outsourceShipmentItem
    .findUnique({
      where: { id },
      select: {
        stockId: true,
        outsourceOrderItem: {
          select: { outsourceOrder: { select: { stockStatus: true } } },
        },
      },
    })
    .then((data) => {
      return prisma.stock.update({
        where: { id: data?.stockId },
        data: { status: data?.outsourceOrderItem.outsourceOrder.stockStatus },
      });
    });
  return await prisma.outsourceShipmentItem.delete({ where: { id } });
};

export const getScannedItems = async (id: number) => {
  const scannedItems = await prisma.outsourceShipmentItem.findMany({
    where: {
      outsourceOrderItemId: id,
    },
    select: {
      id: true,
      kg: true,
      meter: true,
      count: true,
      stock: { select: { barcode: true, lot: true } },
    },
  });
  return scannedItems.map((item, index) => ({
    index: index + 1,
    barcode: item.stock.barcode,
    lot: item.stock?.lot,
    ...item,
  }));
};

export const getConfirmedByOrderId = async (id: number) => {
  return await prisma.outsourceConfirmation.findMany({
    where: {
      outsourceOrderItem: { outsourceOrderId: id },
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
  const openShipments = await prisma.outsourceShipment.findMany({
    where: {
      closed: false,
    },
    include: {
      outsourceOrder: {
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
    supplierName: shipment.outsourceOrder.supplier.name,
  }));
};

export const getShipmentItems = async (id: number) => {
  const order = await prisma.outsourceOrder.findFirst({
    where: {
      outsourceShipment: {
        some: {
          id,
        },
      },
    },
    include: {
      outsourceOrderItem: {
        select: {
          id: true,
          unit: true,
          quantity: true,
          dyeColor: {
            select: {
              name: true,
            },
          },
          product: {
            select: {
              name: true,
            },
          },
          laminationColor: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return order?.outsourceOrderItem.map((item, index) => ({
    ...item,
    productName: item.product?.name,
    dyeColorName: item.dyeColor?.name,
  }));
};

export const getShipmentItemDetails = async (id: number) => {
  const sentItems = await prisma.outsourceShipmentItem.findMany({
    where: { outsourceOrderItemId: id },
    select: {
      id: true,
      kg: true,
      meter: true,
      count: true,
      stock: { select: { barcode: true } },
    },
  });
  const item = await prisma.outsourceOrderItem.findUnique({
    where: { id },
    select: {
      quantity: true,
      unit: true,
      dyeColor: { select: { name: true } },
      laminationColor: { select: { name: true } },
      product: { select: { name: true } },
      outsourceOrder: {
        select: {
          stockStatus: true,
          outsourceType: {
            select: {
              name: true,
            },
          },
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
