interface DyeOrder {
  id: number;
  createdAt: Date;
  supplierId: number;
  productId: number;
  stockStatus: string; // Assuming stockStatus is an enum
  personnelId: number;
  description?: string;
  closed: boolean;

  // Relations
  supplier: { name: string };
  personnel: Personnel;
  product: { name: string };
  dyeOrderItems: DyeOrderItem[];
  dyeShipments: DyeShipment[];
}

interface DyeOrderItem {
  id: number;
  dyeOrderId: number;
  dyeColorId: number;
  dyeTypeId: number;
  lot: string;
  yon?: boolean;
  unit: string;
  quantity: number;
  kazanNo: string;
  note?: string;
  personnelId: number;

  // Relations
  dyeOrder: DyeOrder;
  dyeColor: { name: string };
  dyeType: { name: string };
  personnel: Personnel;
  dyeShipmentItems: DyeShipmentItem[];
  dyeConfirmations: DyeConfirmation[];
}

interface DyeShipment {
  id: number;
  createdAt: Date;
  sentDate: Date;
  dyeOrderId: number;
  closed: boolean;
  personnel: Personnel;
  // Relations
  dyeOrder: DyeOrder;
  dyeShipmentItems: DyeShipmentItem[];
}

interface DyeShipmentItem {
  id: number;
  dyeShipmentId: number;
  dyeOrderItemId: number;
  stockId: number;
  personnelId: number;
  meter: number;
  kg: number;

  // Relations
  dyeShipment: DyeShipment;
  dyeOrderItem: DyeOrderItem;
  stock: { name: string };
  personnel: Personnel;
}

interface DyeConfirmation {
  id: number;
  createdAt: Date;
  dyeOrderItemId: number;
  stockId: number;
  meter: number;
  kg: number;
  personnelId: number;

  // Relations
  dyeOrderItem: DyeOrderItem;
  stock: { name: string };
  personnel: Personnel;
}

interface Personnel {
  id: number;
  firstName: string;
  lastName: string;
}

export type {
  DyeOrder,
  DyeOrderItem,
  DyeShipment,
  DyeShipmentItem,
  DyeConfirmation,
  Personnel,
};
