interface OutsourceOrder {
  id: number;
  createdAt: Date;
  supplierId: number;
  outsourceTypeId: number;
  stockStatus: string; // Assuming stockStatus is an enum
  description?: string;
  personnelId: number;
  closed: boolean;

  // Relations
  supplier: { name: string };
  personnel: Personnel;
  outsourceType: { name: string };
  outsourceOrderItems: OutsourceOrderItem[];
  outsourceShipments: OutsourceShipment[];
}

interface OutsourceOrderItem {
  id: number;
  outsourceOrderId: number;
  productId: number;
  dyeColorId?: number;
  laminationColorId?: number;
  quantity: number;
  unit: string; // Assuming unit is an enum
  note?: string;
  personnelId: number;

  // Relations
  dyeColor?: { name: string };
  laminationColor?: { name: string };
  outsourceOrder: OutsourceOrder;
  product: { name: string };
  personnel: Personnel;
  outsourceShipmentItems: OutsourceShipmentItem[];
  outsourceConfirmations: OutsourceConfirmation[];
}

interface OutsourceShipment {
  id: number;
  createdAt: Date;
  personnelId: number;
  sentDate?: Date;
  outsourceOrderId: number;
  closed: boolean;
  shippingCompanyId?: number;
  shippingCarrierId?: number;
  shippingCarId?: number;

  // Relations
  outsourceOrder: OutsourceOrder;
  personnel: Personnel;
  outsourceShipmentItems: OutsourceShipmentItem[];
  shippingCompany?: { name: string };
  shippingCarrier?: { name: string };
  shippingCar?: { name: string };
}

interface OutsourceShipmentItem {
  id: number;
  outsourceShipmentId: number;
  outsourceOrderItemId: number;
  stockId: number;
  personnelId: number;
  meter: number;
  kg: number;
  count: number;

  // Relations
  stock: { name: string };
  outsourceOrderItem: OutsourceOrderItem;
  personnel: Personnel;
  outsourceShipment: OutsourceShipment;
}

interface OutsourceConfirmation {
  id: number;
  createdAt: Date;
  outsourceOrderItemId: number;
  stockId: number;
  meter: number;
  kg: number;
  count: number;
  personnelId: number;

  // Relations
  outsourceOrderItem: OutsourceOrderItem;
  stock: { name: string };
  personnel: Personnel;
}

interface Personnel {
  id: number;
  firstName: string;
  lastName: string;
}

export type {
  OutsourceOrder,
  OutsourceOrderItem,
  OutsourceShipment,
  OutsourceShipmentItem,
  OutsourceConfirmation,
  Personnel,
};
