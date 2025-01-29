/*
  Warnings:

  - Added the required column `stockId` to the `orderShipmentConfirmation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderShipmentConfirmation` ADD COLUMN `stockId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `orderShipmentConfirmation` ADD CONSTRAINT `orderShipmentConfirmation_stockId_fkey` FOREIGN KEY (`stockId`) REFERENCES `stock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
