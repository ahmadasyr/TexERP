import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSupplier = async (data: {
  name: string;
  materials: string;
  foreign: boolean;
  suitable: boolean;
  supplierScore: number;
  approved: boolean;
  evaluationDate: Date;
  entryScore?: number;
  maxApprovalDate?: Date;
  contractType?: string;
  contractDate?: Date;
  contractValidityPeriod?: number;
  selfPickup: boolean;
  address: string;
  phone?: string;
  email?: string;
  authorizedPerson?: string;
  authorizedPersonPhone?: string;
  authorizedPersonEmail?: string;
  taxOfficeId?: number;
  taxNumber?: string;
  vade?: number;
  iso9001Status: boolean;
  iso14001Status: boolean;
  iso45001Status: boolean;
}) => {
  return prisma.supplier.create({
    data: {
      name: data.name,
      account: {
        create: {
          name: data.name,
          accountType: {
            connect: {
              code: "320",
            },
          },
        },
      },
      materials: data.materials,
      foreign: data.foreign || false,
      suitable: data.suitable || false,
      supplierScore: Number(data.supplierScore) || 0,
      approved: data.approved || false,
      evaluationDate: data.evaluationDate
        ? new Date(data.evaluationDate)
        : new Date(),
      entryScore: data.entryScore,
      maxApprovalDate: data.maxApprovalDate
        ? new Date(data.maxApprovalDate)
        : null,
      contractType: data.contractType,
      contractDate: data.contractDate ? new Date(data.contractDate) : null,
      contractValidityPeriod: data.contractValidityPeriod,
      selfPickup: data.selfPickup || false,
      address: data.address,
      phone: data.phone,
      email: data.email,
      authorizedPerson: data.authorizedPerson,
      authorizedPersonPhone: data.authorizedPersonPhone,
      authorizedPersonEmail: data.authorizedPersonEmail,
      taxOffice: { connect: { id: data.taxOfficeId } },
      taxNumber: data.taxNumber,
      vade: data.vade,
      iso9001Status: data.iso9001Status || false,
      iso14001Status: data.iso14001Status || false,
      iso45001Status: data.iso45001Status || false,
    },
  });
};

export const updateSupplier = async (
  id: number,
  data: {
    name: string;
    materials: string;
    foreign: boolean;
    suitable: boolean;
    supplierScore: number;
    approved: boolean;
    evaluationDate: Date;
    entryScore?: number;
    maxApprovalDate?: Date;
    contractType?: string;
    contractDate?: Date;
    contractValidityPeriod?: number;
    selfPickup: boolean;
    address: string;
    phone?: string;
    email?: string;
    authorizedPerson?: string;
    authorizedPersonPhone?: string;
    authorizedPersonEmail?: string;
    taxOfficeId?: number;
    taxNumber?: string;
    vade?: number;
    iso9001Status: boolean;
    iso14001Status: boolean;
    iso45001Status: boolean;
  }
) => {
  return prisma.supplier.update({
    where: { id: id },
    data: {
      name: data.name,
      account: {
        update: {
          name: data.name,
        },
      },
      materials: data.materials,
      foreign: data.foreign,
      suitable: data.suitable,
      supplierScore: Number(data.supplierScore),
      approved: data.approved || false,
      evaluationDate: data.evaluationDate,
      entryScore: data.entryScore,
      maxApprovalDate: data.maxApprovalDate,
      contractType: data.contractType,
      contractDate: data.contractDate ? new Date(data.contractDate) : null,
      contractValidityPeriod: data.contractValidityPeriod,
      selfPickup: data.selfPickup || false,
      address: data.address,
      phone: data.phone,
      email: data.email,
      authorizedPerson: data.authorizedPerson,
      authorizedPersonPhone: data.authorizedPersonPhone,
      authorizedPersonEmail: data.authorizedPersonEmail,
      taxOffice: { connect: { id: data.taxOfficeId } },
      taxNumber: data.taxNumber,
      vade: data.vade,
      iso9001Status: data.iso9001Status,
      iso14001Status: data.iso14001Status,
      iso45001Status: data.iso45001Status,
    },
  });
};

export const deleteSupplier = async (id: number) => {
  return prisma.supplier.delete({
    where: { id: id },
  });
};

export const getSupplierById = async (id: number) => {
  return prisma.supplier.findUnique({
    where: { id: id },
  });
};

export const getAllSuppliers = async () => {
  return prisma.supplier.findMany({
    include: {
      account: true,
      taxOffice: true,
    },
  });
};
