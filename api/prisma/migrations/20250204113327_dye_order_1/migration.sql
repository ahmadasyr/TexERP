/*
  Warnings:

  - You are about to drop the column `accountId` on the `dyeOrder` table. All the data in the column will be lost.
  - You are about to drop the column `currencyId` on the `dyeOrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `returnCount` on the `dyeOrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `returnKg` on the `dyeOrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `returnMeter` on the `dyeOrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `sentCount` on the `dyeOrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `sentKg` on the `dyeOrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `sentMeter` on the `dyeOrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice` on the `dyeOrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `rawStockId` on the `dyeShipmentItem` table. All the data in the column will be lost.
  - Added the required column `stockStatus` to the `dyeOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplierId` to the `dyeOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dyeOrderItemId` to the `dyeShipmentItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kg` to the `dyeShipmentItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meter` to the `dyeShipmentItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockId` to the `dyeShipmentItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `dyeOrder` DROP FOREIGN KEY `dyeOrder_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `dyeOrderItem` DROP FOREIGN KEY `dyeOrderItem_currencyId_fkey`;

-- AlterTable
ALTER TABLE `dyeOrder` DROP COLUMN `accountId`,
    ADD COLUMN `stockStatus` ENUM('PRE_CUT', 'RAW_PRE_QUALITY', 'RAW_QUALITY', 'DYE_HOUSE', 'DYE_PRE_QUALITY', 'DYE_QUALITY', 'OUTSOURCING', 'LAMINATED_PRE_QUALITY', 'LAMINATED_QUALITY', 'COVER_QUALITY') NOT NULL,
    ADD COLUMN `supplierId` INTEGER NOT NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `dyeOrderItem` DROP COLUMN `currencyId`,
    DROP COLUMN `returnCount`,
    DROP COLUMN `returnKg`,
    DROP COLUMN `returnMeter`,
    DROP COLUMN `sentCount`,
    DROP COLUMN `sentKg`,
    DROP COLUMN `sentMeter`,
    DROP COLUMN `unitPrice`,
    MODIFY `note` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `dyeShipmentItem` DROP COLUMN `rawStockId`,
    ADD COLUMN `dyeOrderItemId` INTEGER NOT NULL,
    ADD COLUMN `kg` DOUBLE NOT NULL,
    ADD COLUMN `meter` DOUBLE NOT NULL,
    ADD COLUMN `stockId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `dyeConfirmation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dyeOrderItemId` INTEGER NOT NULL,
    `stockId` INTEGER NOT NULL,
    `meter` DOUBLE NOT NULL,
    `kg` DOUBLE NOT NULL,
    `personnelId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dyeOrder` ADD CONSTRAINT `dyeOrder_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `supplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeOrder` ADD CONSTRAINT `dyeOrder_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeShipmentItem` ADD CONSTRAINT `dyeShipmentItem_dyeOrderItemId_fkey` FOREIGN KEY (`dyeOrderItemId`) REFERENCES `dyeOrderItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeShipmentItem` ADD CONSTRAINT `dyeShipmentItem_stockId_fkey` FOREIGN KEY (`stockId`) REFERENCES `stock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeConfirmation` ADD CONSTRAINT `dyeConfirmation_dyeOrderItemId_fkey` FOREIGN KEY (`dyeOrderItemId`) REFERENCES `dyeOrderItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeConfirmation` ADD CONSTRAINT `dyeConfirmation_stockId_fkey` FOREIGN KEY (`stockId`) REFERENCES `stock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeConfirmation` ADD CONSTRAINT `dyeConfirmation_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
