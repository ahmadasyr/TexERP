/*
  Warnings:

  - You are about to drop the `yarnOrderShippment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `yarnOrderShippmentItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `yarnOrderShippment` DROP FOREIGN KEY `yarnOrderShippment_personnelId_fkey`;

-- DropForeignKey
ALTER TABLE `yarnOrderShippment` DROP FOREIGN KEY `yarnOrderShippment_shippingCarId_fkey`;

-- DropForeignKey
ALTER TABLE `yarnOrderShippment` DROP FOREIGN KEY `yarnOrderShippment_shippingCarrierId_fkey`;

-- DropForeignKey
ALTER TABLE `yarnOrderShippment` DROP FOREIGN KEY `yarnOrderShippment_shippingCompanyId_fkey`;

-- DropForeignKey
ALTER TABLE `yarnOrderShippment` DROP FOREIGN KEY `yarnOrderShippment_yarnOrderId_fkey`;

-- DropForeignKey
ALTER TABLE `yarnOrderShippmentItem` DROP FOREIGN KEY `yarnOrderShippmentItem_personnelId_fkey`;

-- DropForeignKey
ALTER TABLE `yarnOrderShippmentItem` DROP FOREIGN KEY `yarnOrderShippmentItem_yarnOrderItemId_fkey`;

-- DropForeignKey
ALTER TABLE `yarnOrderShippmentItem` DROP FOREIGN KEY `yarnOrderShippmentItem_yarnOrderShippmentId_fkey`;

-- DropTable
DROP TABLE `yarnOrderShippment`;

-- DropTable
DROP TABLE `yarnOrderShippmentItem`;

-- CreateTable
CREATE TABLE `yarnOrderShipment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `yarnOrderId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sentDate` DATETIME(3) NOT NULL,
    `closed` BOOLEAN NOT NULL DEFAULT false,
    `shippingCompanyId` INTEGER NULL,
    `shippingCarrierId` INTEGER NULL,
    `shippingCarId` INTEGER NULL,
    `personnelId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `yarnOrderShipmentItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `personnelId` INTEGER NOT NULL,
    `yarnOrderShippmntId` INTEGER NOT NULL,
    `yarnOrderItemId` INTEGER NOT NULL,
    `sentKg` DOUBLE NOT NULL,
    `sentCount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `yarnOrderShipment` ADD CONSTRAINT `yarnOrderShipment_yarnOrderId_fkey` FOREIGN KEY (`yarnOrderId`) REFERENCES `yarnOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrderShipment` ADD CONSTRAINT `yarnOrderShipment_shippingCompanyId_fkey` FOREIGN KEY (`shippingCompanyId`) REFERENCES `shippingCompany`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrderShipment` ADD CONSTRAINT `yarnOrderShipment_shippingCarrierId_fkey` FOREIGN KEY (`shippingCarrierId`) REFERENCES `shippingCarrier`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrderShipment` ADD CONSTRAINT `yarnOrderShipment_shippingCarId_fkey` FOREIGN KEY (`shippingCarId`) REFERENCES `shippingCar`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrderShipment` ADD CONSTRAINT `yarnOrderShipment_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrderShipmentItem` ADD CONSTRAINT `yarnOrderShipmentItem_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrderShipmentItem` ADD CONSTRAINT `yarnOrderShipmentItem_yarnOrderShippmntId_fkey` FOREIGN KEY (`yarnOrderShippmntId`) REFERENCES `yarnOrderShipment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrderShipmentItem` ADD CONSTRAINT `yarnOrderShipmentItem_yarnOrderItemId_fkey` FOREIGN KEY (`yarnOrderItemId`) REFERENCES `yarnOrderItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
