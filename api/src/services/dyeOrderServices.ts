import { PrismaClient, stockStatus, unit } from "@prisma/client";
import { connect } from "http2";
import { barcodeGenerator } from "./barcodeGen";

const prisma = new PrismaClient();

export const createDyeOrder = async (data: {
  supplierId: number;
  productId: number;
  stockStatus: stockStatus;
  personnelId: number;
  dyeOrderItem: {
    dyeColorId: number;
    dyeTypeId: number;
    lot: string;
    yon?: boolean;
    unit: unit;
    quantity: number;
    kazanNo: string;
    note?: string;
    personnelId: number;
  }[];
}) => {
  const dyeOrder = await prisma.dyeOrder.create({
    data: {
      supplier: {
        connect: {
          id: data.supplierId,
        },
      },
      product: {
        connect: {
          id: data.productId,
        },
      },
      stockStatus: data.stockStatus,
      personnel: {
        connect: {
          id: data.personnelId,
        },
      },
      dyeOrderItem: {
        create: data.dyeOrderItem.map((item) => ({
          dyeColor: {
            connect: {
              id: item.dyeColorId,
            },
          },
          dyeType: {
            connect: {
              id: item.dyeTypeId,
            },
          },
          lot: item.lot,
          yon: item.yon,
          unit: item.unit,
          quantity: item.quantity,
          kazanNo: item.kazanNo,
          note: item.note,
          personnel: {
            connect: {
              id: item.personnelId,
            },
          },
        })),
      },
    },
  });
  return dyeOrder;
};

export const fetchHighestKazanNo = async () => {
  const dyeOrderItem = await prisma.dyeOrderItem.findFirst({
    orderBy: {
      kazanNo: "desc",
    },
  });

  return dyeOrderItem ? dyeOrderItem.kazanNo : null;
};

export const updateDyeOrder = async (
  id: number,
  data: {
    supplierId: number;
    productId: number;
    stockStatus: stockStatus;
    personnelId: number;
    dyeOrderItem: {
      id?: number;
      dyeColorId: number;
      dyeTypeId: number;
      lot: string;
      yon?: boolean;
      unit: unit;
      quantity: number;
      kazanNo: string;
      note?: string;
      personnelId: number;
    }[];
  }
) => {
  const dyeOrder = await prisma.dyeOrder.update({
    where: {
      id,
    },
    data: {
      supplier: {
        connect: {
          id: data.supplierId,
        },
      },
      product: {
        connect: {
          id: data.productId,
        },
      },
      stockStatus: data.stockStatus,
      personnel: {
        connect: {
          id: data.personnelId,
        },
      },
      dyeOrderItem: {
        deleteMany: {
          id: {
            notIn: data.dyeOrderItem
              .map((item) => item.id)
              .filter((id): id is number => id !== undefined),
          },
        },
        upsert: data.dyeOrderItem.map((item) => ({
          where: {
            id: item.id,
          },
          update: {
            dyeColor: {
              connect: {
                id: item.dyeColorId,
              },
            },
            dyeType: {
              connect: {
                id: item.dyeTypeId,
              },
            },
            lot: item.lot,
            yon: item.yon,
            unit: item.unit,
            quantity: item.quantity,
            kazanNo: item.kazanNo,
            note: item.note,
            personnel: {
              connect: {
                id: item.personnelId,
              },
            },
          },
          create: {
            dyeColor: {
              connect: {
                id: item.dyeColorId,
              },
            },
            dyeType: {
              connect: {
                id: item.dyeTypeId,
              },
            },
            lot: item.lot,
            yon: item.yon,
            unit: item.unit,
            quantity: item.quantity,
            kazanNo: item.kazanNo,
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
  return dyeOrder;
};

export const deleteDyeOrder = async (id: number) => {
  const dyeOrder = await prisma.dyeOrder.delete({
    where: {
      id,
    },
  });
  return dyeOrder;
};

export const fetchDyeOrder = async (id: number) => {
  const dyeOrder = await prisma.dyeOrder.findUnique({
    where: {
      id,
    },
    include: {
      supplier: true,
      product: true,
      personnel: true,
      dyeOrderItem: {
        include: {
          dyeColor: true,
          dyeType: true,
          personnel: true,
          dyeShipmentItem: true,
          dyeConfirmation: true,
        },
      },
    },
  });
  return {
    ...dyeOrder,
    dyeOrderItem:
      dyeOrder?.dyeOrderItem &&
      dyeOrder.dyeOrderItem.map((item) => ({
        ...item,
        sentKg: item.dyeShipmentItem.reduce(
          (acc, shipmentItem) => acc + shipmentItem.kg,
          0
        ),
        sentMeter: item.dyeShipmentItem.reduce(
          (acc, shipmentItem) => acc + shipmentItem.meter,
          0
        ),
        sentCount: item.dyeShipmentItem.reduce(
          (acc, shipmentItem) => acc + shipmentItem.count,
          0
        ),
        remainingKg:
          item.dyeShipmentItem.reduce(
            (acc, shipmentItem) => acc + shipmentItem.kg,
            0
          ) -
          item.dyeConfirmation.reduce(
            (acc, confirmation) => acc + confirmation.kg,
            0
          ),
        remainingMeter:
          item.dyeShipmentItem.reduce(
            (acc, shipmentItem) => acc + shipmentItem.meter,
            0
          ) -
          item.dyeConfirmation.reduce(
            (acc, confirmation) => acc + confirmation.meter,
            0
          ),
        remainingCount:
          item.dyeShipmentItem.reduce(
            (acc, shipmentItem) => acc + shipmentItem.count,
            0
          ) -
          item.dyeConfirmation.reduce(
            (acc, confirmation) => acc + confirmation.count,
            0
          ),
      })),
  };
};

export const fetchDyeOrders = async () => {
  const dyeOrders = await prisma.dyeOrder.findMany({
    include: {
      supplier: true,
      product: true,
      personnel: true,
      dyeOrderItem: {
        include: {
          dyeColor: true,
          dyeType: true,
          personnel: true,
        },
      },
    },
  });
  return dyeOrders;
};

export const changeDyeOrderStatus = async (id: number, closed: boolean) => {
  const dyeOrder = await prisma.dyeOrder.update({
    where: {
      id,
    },
    data: {
      closed,
    },
  });
  return dyeOrder;
};
export const getOrderByShipment = async (id: number) => {
  const order = await prisma.dyeOrder.findFirst({
    where: {
      dyeShipment: {
        some: {
          id,
        },
      },
    },
    select: {
      id: true,
      createdAt: true,
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
    },
  });
  return order;
};

export const getDyeItemSpecs = async (id: number) => {
  const dyeOrderItem = await prisma.dyeOrderItem.findUnique({
    where: {
      id,
    },
    include: {
      dyeConfirmation: {
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
      dyeShipmentItem: true,
      dyeOrder: {
        include: {
          product: {
            select: {
              name: true,
            },
          },
        },
      },
      dyeColor: true,
      dyeType: true,
    },
  });
  return {
    ...dyeOrderItem,
    confirmedKg: dyeOrderItem?.dyeConfirmation.reduce(
      (acc, shipmentItem) => acc + shipmentItem.kg,
      0
    ),
    confirmedMeter: dyeOrderItem?.dyeConfirmation.reduce(
      (acc, shipmentItem) => acc + shipmentItem.meter,
      0
    ),
    confirmedCount: dyeOrderItem?.dyeConfirmation.reduce(
      (acc, shipmentItem) => acc + shipmentItem.count,
      0
    ),
    shippedKg: dyeOrderItem?.dyeShipmentItem.reduce(
      (acc, shipmentItem) => acc + shipmentItem.kg,
      0
    ),
    shippedCount: dyeOrderItem?.dyeShipmentItem.reduce(
      (acc, shipmentItem) => acc + shipmentItem.count,
      0
    ),
    shippedMeter: dyeOrderItem?.dyeShipmentItem.reduce(
      (acc, shipmentItem) => acc + shipmentItem.meter,
      0
    ),
  };
};

export const acceptDye = async (
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

  const dyeOrderItem = await prisma.dyeOrderItem.findUnique({ where: { id } });
  if (!dyeOrderItem) {
    throw new Error(`DyeOrderItem with id ${id} not found.`);
  }

  if (data.perTop && !data.oneBarcode) {
    await Promise.all(
      Array.from({ length: data.topCount }).map(async () => {
        const confirmation = await prisma.dyeConfirmation.create({
          data: {
            dyeOrderItem: { connect: { id } },
            meter: data.topMeter,
            kg: data.topKg,
            count: 1,
            personnel: { connect: { id: data.personnelId } },
            stock: {
              create: {
                kazanNo: dyeOrderItem.kazanNo,
                lot: dyeOrderItem.lot || "",
                meter: data.topMeter,
                kg: data.topKg,
                count: 1,
                yon: dyeOrderItem.yon,
                product: { connect: { id: data.productId } },
                status: "DYE_PRE_QUALITY",
                personnel: { connect: { id: data.personnelId } },
                dyeColor: { connect: { id: dyeOrderItem.dyeColorId } },
                dyeType: { connect: { id: dyeOrderItem.dyeTypeId } },
              },
            },
          },
        });

        await prisma.stock.update({
          where: { id: confirmation.stockId },
          data: {
            barcode: barcodeGenerator("DYE_PRE_QUALITY") + confirmation.stockId,
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
        const confirmation = await prisma.dyeConfirmation.create({
          data: {
            dyeOrderItem: { connect: { id } },
            meter: splitMeter,
            kg: splitKg,
            count: 1,
            personnel: { connect: { id: data.personnelId } },
            stock: {
              create: {
                kazanNo: dyeOrderItem.kazanNo,
                lot: dyeOrderItem.lot || "",
                meter: splitMeter,
                kg: splitKg,
                count: 1,
                yon: dyeOrderItem.yon,
                product: { connect: { id: data.productId } },
                status: "DYE_PRE_QUALITY",
                personnel: { connect: { id: data.personnelId } },
                dyeColor: { connect: { id: dyeOrderItem.dyeColorId } },
                dyeType: { connect: { id: dyeOrderItem.dyeTypeId } },
              },
            },
          },
        });

        await prisma.stock.update({
          where: { id: confirmation.stockId },
          data: {
            barcode: barcodeGenerator("DYE_PRE_QUALITY") + confirmation.stockId,
          },
        });
      })
    );
  } else if (data.oneBarcode) {
    const confirmation = await prisma.dyeConfirmation.create({
      data: {
        dyeOrderItem: { connect: { id } },
        meter: data.topMeter,
        kg: data.topKg,
        count: data.topCount,
        personnel: { connect: { id: data.personnelId } },
        stock: {
          create: {
            kazanNo: dyeOrderItem.kazanNo,
            lot: dyeOrderItem.lot || "",
            meter: data.topMeter,
            kg: data.topKg,
            count: data.topCount,
            yon: dyeOrderItem.yon,
            product: { connect: { id: data.productId } },
            status: "DYE_PRE_QUALITY",
            personnel: { connect: { id: data.personnelId } },
            dyeColor: { connect: { id: dyeOrderItem.dyeColorId } },
            dyeType: { connect: { id: dyeOrderItem.dyeTypeId } },
          },
        },
      },
    });

    await prisma.stock.update({
      where: { id: confirmation.stockId },
      data: {
        barcode: barcodeGenerator("DYE_PRE_QUALITY") + confirmation.stockId,
      },
    });
  }
};

export const deleteConfirmation = async (id: number) => {
  const confirmation = await prisma.dyeConfirmation
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
