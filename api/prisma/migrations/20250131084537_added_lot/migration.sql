/*
  Warnings:

  - A unique constraint covering the columns `[barcode]` on the table `stock` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `orderShipmentItem` ADD COLUMN `lot` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `stock_barcode_key` ON `stock`(`barcode`);
