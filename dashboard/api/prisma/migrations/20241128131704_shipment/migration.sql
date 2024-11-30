/*
  Warnings:

  - You are about to drop the column `yarnOrderShippmntId` on the `yarnOrderShipmentItem` table. All the data in the column will be lost.
  - Added the required column `yarnOrderShipmentId` to the `yarnOrderShipmentItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `yarnOrderShipmentItem` DROP FOREIGN KEY `yarnOrderShipmentItem_yarnOrderShippmntId_fkey`;

-- AlterTable
ALTER TABLE `yarnOrderShipmentItem` DROP COLUMN `yarnOrderShippmntId`,
    ADD COLUMN `yarnOrderShipmentId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `yarnOrderShipmentItem` ADD CONSTRAINT `yarnOrderShipmentItem_yarnOrderShipmentId_fkey` FOREIGN KEY (`yarnOrderShipmentId`) REFERENCES `yarnOrderShipment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
