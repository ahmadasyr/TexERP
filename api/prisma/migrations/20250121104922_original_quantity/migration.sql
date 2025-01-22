/*
  Warnings:

  - Added the required column `originalQuantity` to the `purchaseRequestItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `purchaseRequestItem` ADD COLUMN `originalQuantity` DOUBLE NOT NULL;
