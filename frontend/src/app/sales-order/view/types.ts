interface Order {
  id: number;
  description: string;
  personnelId: number;
  closed: boolean;
  customerId: number;
  createdAt: Date;
  personnel: Personnel;
  customer: { name: string };
  orderItem: OrderItem[];
  orderShipment: OrderShipment[];
}

interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  dyeColorId?: number;
  laminationColorId?: number;
  itemType?: string;
  description?: string;
  personnelId: number;
  meter: number;
  kg: number;
  product: { name: string };
  dyeColor?: { name: string };
  laminationColor?: { name: string };
}

interface OrderShipment {
  id: number;
  orderId: number;
  createdAt: Date;
  sentDate?: Date;
  shippingCompanyId?: number;
  shippingCarrierId?: number;
  shippingCarId?: number;
  closed: boolean;
  personnelId: number;
  shippingCompany?: { name: string };
  shippingCarrier?: { name: string };
  shippingCar?: { plate: string };
  orderShipmentItem: OrderShipmentItem[];
}

interface OrderShipmentItem {
  id: number;
  orderShipmentId: number;
  orderItemId: number;
  personnelId: number;
  meter: number;
  kg: number;
  orderItem: OrderItem;
}

interface ConfirmedItems {
  orderShipmentItemId: number;
  stockId: number;
  personnelId: number;
  sentMeter: number;
  sentKg: number;
  lot: string;
  barcode: string;
  orderShipmentItem: {
    orderItemId: number;
  };
}

interface Personnel {
  id: number;
  firstName: string;
  lastName: string;
}

export type {
  Order,
  OrderItem,
  OrderShipment,
  OrderShipmentItem,
  ConfirmedItems,
  Personnel,
};
