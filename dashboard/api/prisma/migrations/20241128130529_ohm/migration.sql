/*
  Warnings:

  - Added the required column `lot` to the `yarnStockEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `yarnStockEntry` ADD COLUMN `accountId` INTEGER NULL,
    ADD COLUMN `lot` VARCHAR(191) NOT NULL,
    ADD COLUMN `yarnOrderId` INTEGER NULL;

-- CreateTable
CREATE TABLE `yarnOrderShipmentSent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `yarnOrderShipmentId` INTEGER NOT NULL,
    `yarnOrderItemId` INTEGER NOT NULL,
    `yarnStockEntryId` INTEGER NOT NULL,
    `sentKg` DOUBLE NOT NULL,
    `sentCount` INTEGER NOT NULL,
    `personnelId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `yarnStockEntry` ADD CONSTRAINT `yarnStockEntry_yarnOrderId_fkey` FOREIGN KEY (`yarnOrderId`) REFERENCES `yarnOrder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnStockEntry` ADD CONSTRAINT `yarnStockEntry_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrderShipmentSent` ADD CONSTRAINT `yarnOrderShipmentSent_yarnOrderShipmentId_fkey` FOREIGN KEY (`yarnOrderShipmentId`) REFERENCES `yarnOrderShipment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrderShipmentSent` ADD CONSTRAINT `yarnOrderShipmentSent_yarnOrderItemId_fkey` FOREIGN KEY (`yarnOrderItemId`) REFERENCES `yarnOrderItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrderShipmentSent` ADD CONSTRAINT `yarnOrderShipmentSent_yarnStockEntryId_fkey` FOREIGN KEY (`yarnStockEntryId`) REFERENCES `yarnStockEntry`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrderShipmentSent` ADD CONSTRAINT `yarnOrderShipmentSent_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
