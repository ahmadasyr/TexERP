/*
  Warnings:

  - You are about to drop the column `orderShipmentItemId` on the `orderShipmentConfirmation` table. All the data in the column will be lost.
  - Added the required column `orderItemId` to the `orderShipmentConfirmation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderShipmentId` to the `orderShipmentConfirmation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `orderShipmentConfirmation` DROP FOREIGN KEY `orderShipmentConfirmation_orderShipmentItemId_fkey`;

-- AlterTable
ALTER TABLE `orderShipmentConfirmation` DROP COLUMN `orderShipmentItemId`,
    ADD COLUMN `orderItemId` INTEGER NOT NULL,
    ADD COLUMN `orderShipmentId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `orderShipmentConfirmation` ADD CONSTRAINT `orderShipmentConfirmation_orderShipmentId_fkey` FOREIGN KEY (`orderShipmentId`) REFERENCES `orderShipment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderShipmentConfirmation` ADD CONSTRAINT `orderShipmentConfirmation_orderItemId_fkey` FOREIGN KEY (`orderItemId`) REFERENCES `orderItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
