import { PrismaClient, unit } from "@prisma/client";

const prisma = new PrismaClient();

export const createOrder = async (data: {
  customerId: number;
  description: string;
  personnelId: number;
  orderItem: {
    productId: number;
    dyeColorId?: number;
    itemTypeId?: number;
    laminationColorId?: number;
    meter: number;
    kg: number;
    description?: string;
    personnelId: number;
    orderItemSpecification?: number[];
  }[];
}) => {
  // Update customer status to "Mevcut"
  await prisma.customer.update({
    where: {
      id: data.customerId,
    },
    data: {
      status: "Mevcut",
    },
  });

  // Create order with related items and orderItemSpecification
  return await prisma.order.create({
    data: {
      description: data.description,
      closed: false,
      customer: {
        connect: {
          id: data.customerId,
        },
      },
      personnel: {
        connect: {
          id: data.personnelId,
        },
      },
      orderItem: {
        create: data.orderItem.map((item) => ({
          productId: item.productId,
          dyeColorId: item.dyeColorId || null,
          itemTypeId: item.itemTypeId || null,
          laminationColorId: item.laminationColorId || null,
          meter: item.meter,
          kg: item.kg,
          description: item.description || null,
          personnelId: item.personnelId,
          orderItemSpecification: {
            create:
              item.orderItemSpecification?.map((spec) => ({
                outsourceTypeId: spec,
              })) || [],
          },
        })),
      },
    },
  });
};

export const getOrder = async (id: number) => {
  return await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
        },
      },
      personnel: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      orderItem: {
        include: {
          product: {
            select: {
              name: true,
            },
          },
          dyeColor: {
            select: {
              name: true,
            },
          },
          itemType: {
            select: {
              name: true,
            },
          },
          laminationColor: {
            select: {
              name: true,
            },
          },

          orderItemSpecification: {
            include: {
              outsourceType: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

export const getOrders = async () => {
  return await prisma.order.findMany({
    include: {
      customer: {
        select: {
          id: true,
          name: true,
        },
      },
      personnel: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      orderItem: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const updateOrder = async (
  id: number,
  data: {
    customerId: number;
    description: string;
    personnelId: number;
    closed: boolean;
    orderItem: {
      id?: number; // `id` is optional for new items
      productId: number;
      dyeColorId?: number;
      itemTypeId?: number;
      laminationColorId?: number;
      meter: number;
      kg: number;
      description?: string;
      personnelId: number;
      orderItemSpecification?: number[];
    }[];
  }
) => {
  return await prisma.order.update({
    where: {
      id,
    },
    data: {
      description: data.description,
      closed: data.closed,
      customer: {
        connect: {
          id: data.customerId,
        },
      },
      personnel: {
        connect: {
          id: data.personnelId,
        },
      },
      orderItem: {
        deleteMany: {
          id: {
            notIn: data.orderItem
              .filter((item) => item.id !== undefined)
              .map((item) => item.id!),
          },
        },
        upsert: data.orderItem.map((item) => ({
          where: { id: item.id || 0 }, // Use `0` for non-existing items to ensure creation
          update: {
            productId: item.productId,
            dyeColorId: item.dyeColorId || null,
            itemTypeId: item.itemTypeId || null,
            laminationColorId: item.laminationColorId || null,
            meter: item.meter,
            kg: item.kg,
            description: item.description || null,
            personnelId: item.personnelId,
            orderItemSpecification: {
              deleteMany: {
                outsourceTypeId: {
                  notIn: item.orderItemSpecification?.map((spec) => spec) || [],
                },
              },
              create:
                item.orderItemSpecification?.map((spec) => ({
                  outsourceTypeId: spec,
                })) || [],
            },
          },
          create: {
            productId: item.productId,
            dyeColorId: item.dyeColorId || null,
            itemTypeId: item.itemTypeId || null,
            laminationColorId: item.laminationColorId || null,
            meter: item.meter,
            kg: item.kg,
            description: item.description || null,
            personnelId: item.personnelId,
            orderItemSpecification: {
              create:
                item.orderItemSpecification?.map((spec) => ({
                  outsourceTypeId: spec,
                })) || [],
            },
          },
        })),
      },
    },
  });
};

export const deleteOrder = async (id: number) => {
  await prisma.orderItemSpecification.deleteMany({
    where: {
      orderItemId: {
        in: (
          await prisma.orderItem.findMany({
            where: {
              orderId: id,
            },
            select: {
              id: true,
            },
          })
        ).map((orderItem) => orderItem.id),
      },
    },
  });

  await prisma.orderItem.deleteMany({
    where: {
      orderId: id,
    },
  });

  return await prisma.order.delete({
    where: {
      id,
    },
  });
};

export const getOrderByCustomerId = async (customerId: number) => {
  return await prisma.order.findMany({
    where: {
      customerId,
    },
    include: {
      customer: true,
      personnel: {
        select: {
          firstName: true,
          lastName: true,
          department: true,
        },
      },
      orderItem: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const orderStatus = async (id: number, status: boolean) => {
  return await prisma.order.update({
    where: {
      id,
    },
    data: {
      closed: status,
    },
  });
};
