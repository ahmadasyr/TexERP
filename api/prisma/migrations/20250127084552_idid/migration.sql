/*
  Warnings:

  - You are about to drop the column `sentKg` on the `orderItem` table. All the data in the column will be lost.
  - You are about to drop the column `sentMeter` on the `orderItem` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `dyeOrder_productId_fkey` ON `dyeOrder`;

-- DropIndex
DROP INDEX `dyeShipmentItem_rawStockId_fkey` ON `dyeShipmentItem`;

-- DropIndex
DROP INDEX `outsourceShipmentItem_dyeStockId_fkey` ON `outsourceShipmentItem`;

-- AlterTable
ALTER TABLE `orderItem` DROP COLUMN `sentKg`,
    DROP COLUMN `sentMeter`;
