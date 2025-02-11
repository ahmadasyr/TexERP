import { PrismaClient, stockStatus, unit } from "@prisma/client";
import { barcodeGenerator } from "./barcodeGen";

const prisma = new PrismaClient();

export const createOutsourceOrder = async (data: {
  supplierId: number;
  outsourceTypeId: number;
  stockStatus: stockStatus;
  personnelId: number;
  description?: string;
  outsourceOrderItem: {
    productId: number;
    dyeColorId: number;
    laminationColorId: number;
    unit: unit;
    quantity: number;
    note?: string;
    personnelId: number;
  }[];
}) => {
  const outsourceOrder = await prisma.outsourceOrder.create({
    data: {
      supplier: {
        connect: {
          id: data.supplierId,
        },
      },
      outsourceType: {
        connect: {
          id: data.outsourceTypeId,
        },
      },
      stockStatus: data.stockStatus,
      personnel: {
        connect: {
          id: data.personnelId,
        },
      },
      description: data.description,
      outsourceOrderItem: {
        create: data.outsourceOrderItem.map((item) => ({
          product: {
            connect: {
              id: item.productId,
            },
          },
          dyeColor: {
            connect: {
              id: item.dyeColorId,
            },
          },
          laminationColor: {
            connect: {
              id: item.laminationColorId,
            },
          },
          unit: item.unit,
          quantity: item.quantity,
          note: item.note ?? "",
          personnel: {
            connect: {
              id: item.personnelId,
            },
          },
        })),
      },
    },
  });
  return outsourceOrder;
};

export const updateOutsourceOrder = async (
  id: number,
  data: {
    supplierId: number;
    outsourceTypeId: number;
    stockStatus: stockStatus;
    personnelId: number;
    description?: string;
    outsourceOrderItem: {
      id?: number;
      productId: number;
      dyeColorId: number;
      laminationColorId: number;
      unit: unit;
      quantity: number;
      note?: string;
      personnelId: number;
    }[];
  }
) => {
  const outsourceOrder = await prisma.outsourceOrder.update({
    where: {
      id,
    },
    data: {
      supplier: {
        connect: {
          id: data.supplierId,
        },
      },
      outsourceType: {
        connect: {
          id: data.outsourceTypeId,
        },
      },
      stockStatus: data.stockStatus,
      personnel: {
        connect: {
          id: data.personnelId,
        },
      },
      description: data.description,
      outsourceOrderItem: {
        deleteMany: {
          id: {
            notIn: data.outsourceOrderItem
              .map((item) => item.id)
              .filter((id): id is number => id !== undefined),
          },
        },
        upsert: data.outsourceOrderItem.map((item) => ({
          where: {
            id: item.id,
          },
          update: {
            product: {
              connect: {
                id: item.productId,
              },
            },
            dyeColor: {
              connect: {
                id: item.dyeColorId,
              },
            },
            laminationColor: {
              connect: {
                id: item.laminationColorId,
              },
            },
            unit: item.unit,
            quantity: item.quantity,
            note: item.note,
            personnel: {
              connect: {
                id: item.personnelId,
              },
            },
          },
          create: {
            product: {
              connect: {
                id: item.productId,
              },
            },
            dyeColor: {
              connect: {
                id: item.dyeColorId,
              },
            },
            laminationColor: {
              connect: {
                id: item.laminationColorId,
              },
            },
            unit: item.unit,
            quantity: item.quantity,
            note: item.note,
            personnel: {
              connect: {
                id: item.personnelId,
              },
            },
          },
        })),
      },
    },
  });
  return outsourceOrder;
};

export const deleteOutsourceOrder = async (id: number) => {
  const dyeOrder = await prisma.outsourceOrder.delete({
    where: {
      id,
    },
  });
  return dyeOrder;
};

export const fetchOutsourceOrder = async (id: number) => {
  const outsourceOrder = await prisma.outsourceOrder.findUnique({
    where: {
      id,
    },
    include: {
      supplier: true,
      outsourceType: true,
      personnel: true,
      outsourceOrderItem: {
        include: {
          product: true,
          dyeColor: true,
          laminationColor: true,
          personnel: true,
          outsourceShipmentItem: true,
          outsourceConfirmation: true,
        },
      },
    },
  });
  return {
    ...outsourceOrder,
    outsourceOrderItem:
      outsourceOrder?.outsourceOrderItem &&
      outsourceOrder.outsourceOrderItem.map((item) => ({
        ...item,
        sentMeter: item.outsourceShipmentItem.reduce(
          (acc, shipmentItem) => acc + shipmentItem.meter,
          0
        ),
        sentKg: item.outsourceShipmentItem.reduce(
          (acc, shipmentItem) => acc + shipmentItem.kg,
          0
        ),
        sentCount: item.outsourceShipmentItem.reduce(
          (acc, shipmentItem) => acc + shipmentItem.count,
          0
        ),
        confirmedMeter: item.outsourceConfirmation.reduce(
          (acc, confirmation) => acc + confirmation.meter,
          0
        ),
        confirmedKg: item.outsourceConfirmation.reduce(
          (acc, confirmation) => acc + confirmation.kg,
          0
        ),
        confirmedCount: item.outsourceConfirmation.reduce(
          (acc, confirmation) => acc + confirmation.count,
          0
        ),
      })),
  };
};

export const fetchOutsourceOrders = async () => {
  const outsourceOrders = await prisma.outsourceOrder.findMany({
    include: {
      supplier: true,
      outsourceType: true,
      personnel: true,
      outsourceOrderItem: {
        include: {
          product: true,
          dyeColor: true,
          laminationColor: true,
          personnel: true,
        },
      },
    },
  });
  return outsourceOrders;
};

export const changeOutsourceOrderStatus = async (
  id: number,
  closed: boolean
) => {
  const outsourceOrder = await prisma.outsourceOrder.update({
    where: {
      id,
    },
    data: {
      closed,
    },
  });
  return outsourceOrder;
};
export const getOrderByShipment = async (id: number) => {
  const order = await prisma.outsourceOrder.findFirst({
    where: {
      outsourceShipment: {
        some: {
          id,
        },
      },
    },
    select: {
      id: true,
      createdAt: true,
      supplier: {
        select: {
          name: true,
        },
      },
      outsourceType: {
        select: {
          name: true,
        },
      },
      personnel: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  return order;
};

export const getOutsourceOrderItemSpecs = async (id: number) => {
  const outsourceOrderItem = await prisma.outsourceOrderItem.findUnique({
    where: {
      id,
    },
    include: {
      outsourceConfirmation: {
        include: {
          personnel: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          stock: {
            select: {
              barcode: true,
            },
          },
        },
      },
      outsourceShipmentItem: true,
      outsourceOrder: true,
      product: {
        select: {
          name: true,
        },
      },
      dyeColor: true,
      laminationColor: true,
    },
  });
  return {
    ...outsourceOrderItem,
    confirmedKg: outsourceOrderItem?.outsourceConfirmation.reduce(
      (acc, confirmation) => acc + confirmation.kg,
      0
    ),
    confirmedMeter: outsourceOrderItem?.outsourceConfirmation.reduce(
      (acc, confirmation) => acc + confirmation.meter,
      0
    ),
    confirmedCount: outsourceOrderItem?.outsourceConfirmation.reduce(
      (acc, confirmation) => acc + confirmation.count,
      0
    ),
    shippedKg: outsourceOrderItem?.outsourceShipmentItem.reduce(
      (acc, shipmentItem) => acc + shipmentItem.kg,
      0
    ),
    shippedCount: outsourceOrderItem?.outsourceShipmentItem.reduce(
      (acc, shipmentItem) => acc + shipmentItem.count,
      0
    ),
    shippedMeter: outsourceOrderItem?.outsourceShipmentItem.reduce(
      (acc, shipmentItem) => acc + shipmentItem.meter,
      0
    ),
  };
};

export const acceptOutsourceOrder = async (
  id: number,
  data: {
    oneBarcode: boolean;
    productId: number;
    perTop: boolean;
    topCount: number;
    topMeter: number;
    topKg: number;
    personnelId: number;
    stockStatus: stockStatus;
  }
) => {
  if (!data.productId || !data.personnelId) {
    throw new Error("Missing productId or personnelId.");
  }
  if (
    !data.topMeter ||
    !data.topKg ||
    isNaN(data.topMeter) ||
    isNaN(data.topKg)
  ) {
    throw new Error("Invalid topMeter or topKg.");
  }
  if (data.topCount <= 0) {
    throw new Error("topCount must be greater than zero.");
  }

  const outsourceOrderItem = await prisma.outsourceOrderItem.findUnique({
    where: { id },
  });
  if (!outsourceOrderItem) {
    throw new Error(`OutsourceOrderItem with id ${id} not found.`);
  }

  if (data.perTop && !data.oneBarcode) {
    await Promise.all(
      Array.from({ length: data.topCount }).map(async () => {
        const confirmation = await prisma.outsourceConfirmation.create({
          data: {
            outsourceOrderItem: { connect: { id } },
            meter: data.topMeter,
            kg: data.topKg,
            count: 1,
            personnel: { connect: { id: data.personnelId } },
            stock: {
              create: {
                meter: data.topMeter,
                kg: data.topKg,
                count: 1,
                product: { connect: { id: data.productId } },
                status: data.stockStatus,
                personnel: { connect: { id: data.personnelId } },
                dyeColor: outsourceOrderItem.dyeColorId
                  ? { connect: { id: outsourceOrderItem.dyeColorId } }
                  : undefined,
                laminationColor: outsourceOrderItem.laminationColorId
                  ? { connect: { id: outsourceOrderItem.laminationColorId } }
                  : undefined,
              },
            },
          },
        });

        await prisma.stock.update({
          where: { id: confirmation.stockId },
          data: {
            barcode: barcodeGenerator(data.stockStatus) + confirmation.stockId,
          },
        });
      })
    );
  } else if (!data.perTop && !data.oneBarcode) {
    const splitMeter = data.topMeter / data.topCount;
    const splitKg = data.topKg / data.topCount;

    if (isNaN(splitMeter) || isNaN(splitKg)) {
      throw new Error("Invalid division resulting in NaN values.");
    }

    await Promise.all(
      Array.from({ length: data.topCount }).map(async () => {
        const confirmation = await prisma.outsourceConfirmation.create({
          data: {
            outsourceOrderItem: { connect: { id } },
            meter: splitMeter,
            kg: splitKg,
            count: 1,
            personnel: { connect: { id: data.personnelId } },
            stock: {
              create: {
                meter: splitMeter,
                kg: splitKg,
                count: 1,
                product: { connect: { id: data.productId } },
                status: data.stockStatus,
                personnel: { connect: { id: data.personnelId } },
                dyeColor: outsourceOrderItem.dyeColorId
                  ? { connect: { id: outsourceOrderItem.dyeColorId } }
                  : undefined,
                laminationColor: outsourceOrderItem.laminationColorId
                  ? { connect: { id: outsourceOrderItem.laminationColorId } }
                  : undefined,
              },
            },
          },
        });

        await prisma.stock.update({
          where: { id: confirmation.stockId },
          data: {
            barcode: barcodeGenerator(data.stockStatus) + confirmation.stockId,
          },
        });
      })
    );
  } else if (data.oneBarcode) {
    const confirmation = await prisma.outsourceConfirmation.create({
      data: {
        outsourceOrderItem: { connect: { id } },
        meter: data.topMeter,
        kg: data.topKg,
        count: data.topCount,
        personnel: { connect: { id: data.personnelId } },
        stock: {
          create: {
            meter: data.topMeter,
            kg: data.topKg,
            count: data.topCount,
            product: { connect: { id: data.productId } },
            status: data.stockStatus,
            personnel: { connect: { id: data.personnelId } },
            dyeColor: outsourceOrderItem.dyeColorId
              ? { connect: { id: outsourceOrderItem.dyeColorId } }
              : undefined,
            laminationColor: outsourceOrderItem.laminationColorId
              ? { connect: { id: outsourceOrderItem.laminationColorId } }
              : undefined,
          },
        },
      },
    });

    await prisma.stock.update({
      where: { id: confirmation.stockId },
      data: {
        barcode: barcodeGenerator(data.stockStatus) + confirmation.stockId,
      },
    });
  }
};

export const deleteConfirmation = async (id: number) => {
  const confirmation = await prisma.outsourceConfirmation
    .delete({
      where: {
        id,
      },
    })
    .then(async (confirmation) => {
      await prisma.stock.delete({
        where: {
          id: confirmation.stockId,
        },
      });
    });
};
