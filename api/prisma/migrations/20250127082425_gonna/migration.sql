/*
  Warnings:

  - You are about to drop the column `orderedQuantity` on the `orderShipmentItem` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `orderShipmentItem` table. All the data in the column will be lost.
  - You are about to drop the `cutStock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dyeReturnStock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dyeStock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `outsourceReturnStock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rawQualityControlStock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rawStock` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `kg` to the `orderShipmentItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meter` to the `orderShipmentItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cutStock` DROP FOREIGN KEY `cutStock_personnelId_fkey`;

-- DropForeignKey
ALTER TABLE `cutStock` DROP FOREIGN KEY `cutStock_productId_fkey`;

-- DropForeignKey
ALTER TABLE `cutStock` DROP FOREIGN KEY `cutStock_productionOrderId_fkey`;

-- DropForeignKey
ALTER TABLE `dyeOrder` DROP FOREIGN KEY `dyeOrder_productId_fkey`;

-- DropForeignKey
ALTER TABLE `dyeReturnStock` DROP FOREIGN KEY `dyeReturnStock_dyeColorId_fkey`;

-- DropForeignKey
ALTER TABLE `dyeReturnStock` DROP FOREIGN KEY `dyeReturnStock_dyeOrderItemId_fkey`;

-- DropForeignKey
ALTER TABLE `dyeReturnStock` DROP FOREIGN KEY `dyeReturnStock_dyeTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `dyeReturnStock` DROP FOREIGN KEY `dyeReturnStock_personnelId_fkey`;

-- DropForeignKey
ALTER TABLE `dyeReturnStock` DROP FOREIGN KEY `dyeReturnStock_productId_fkey`;

-- DropForeignKey
ALTER TABLE `dyeShipmentItem` DROP FOREIGN KEY `dyeShipmentItem_rawStockId_fkey`;

-- DropForeignKey
ALTER TABLE `dyeStock` DROP FOREIGN KEY `dyeStock_dyeColorId_fkey`;

-- DropForeignKey
ALTER TABLE `dyeStock` DROP FOREIGN KEY `dyeStock_laminationColorId_fkey`;

-- DropForeignKey
ALTER TABLE `dyeStock` DROP FOREIGN KEY `dyeStock_outsourceTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `dyeStock` DROP FOREIGN KEY `dyeStock_personnelId_fkey`;

-- DropForeignKey
ALTER TABLE `dyeStock` DROP FOREIGN KEY `dyeStock_productId_fkey`;

-- DropForeignKey
ALTER TABLE `outsourceReturnStock` DROP FOREIGN KEY `outsourceReturnStock_dyeColorId_fkey`;

-- DropForeignKey
ALTER TABLE `outsourceReturnStock` DROP FOREIGN KEY `outsourceReturnStock_outsourceItemId_fkey`;

-- DropForeignKey
ALTER TABLE `outsourceReturnStock` DROP FOREIGN KEY `outsourceReturnStock_personnelId_fkey`;

-- DropForeignKey
ALTER TABLE `outsourceReturnStock` DROP FOREIGN KEY `outsourceReturnStock_productId_fkey`;

-- DropForeignKey
ALTER TABLE `outsourceShipmentItem` DROP FOREIGN KEY `outsourceShipmentItem_dyeStockId_fkey`;

-- DropForeignKey
ALTER TABLE `rawQualityControlStock` DROP FOREIGN KEY `rawQualityControlStock_cutStockId_fkey`;

-- DropForeignKey
ALTER TABLE `rawQualityControlStock` DROP FOREIGN KEY `rawQualityControlStock_personnelId_fkey`;

-- DropForeignKey
ALTER TABLE `rawQualityControlStock` DROP FOREIGN KEY `rawQualityControlStock_productId_fkey`;

-- DropForeignKey
ALTER TABLE `rawQualityControlStock` DROP FOREIGN KEY `rawQualityControlStock_productionOrderId_fkey`;

-- DropForeignKey
ALTER TABLE `rawStock` DROP FOREIGN KEY `rawStock_personnelId_fkey`;

-- DropForeignKey
ALTER TABLE `rawStock` DROP FOREIGN KEY `rawStock_productId_fkey`;

-- DropForeignKey
ALTER TABLE `rawStock` DROP FOREIGN KEY `rawStock_rawQualityControlStockId_fkey`;

-- AlterTable
ALTER TABLE `orderItem` ADD COLUMN `sentKg` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `sentMeter` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `orderShipmentItem` DROP COLUMN `orderedQuantity`,
    DROP COLUMN `unit`,
    ADD COLUMN `kg` DOUBLE NOT NULL,
    ADD COLUMN `meter` DOUBLE NOT NULL;

-- DropTable
DROP TABLE `cutStock`;

-- DropTable
DROP TABLE `dyeReturnStock`;

-- DropTable
DROP TABLE `dyeStock`;

-- DropTable
DROP TABLE `outsourceReturnStock`;

-- DropTable
DROP TABLE `rawQualityControlStock`;

-- DropTable
DROP TABLE `rawStock`;

-- CreateTable
CREATE TABLE `stock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `productId` INTEGER NOT NULL,
    `lot` VARCHAR(191) NOT NULL,
    `meter` DOUBLE NOT NULL,
    `kg` DOUBLE NOT NULL,
    `status` ENUM('Depoda', 'CikisYapildi') NOT NULL,
    `counted` BOOLEAN NULL,
    `countDate` DATETIME(3) NULL,
    `shelf` VARCHAR(191) NULL,
    `personnelId` INTEGER NOT NULL,
    `barcode` VARCHAR(191) NULL,
    `yon` BOOLEAN NULL,
    `quality` INTEGER NULL,
    `qualityNote` VARCHAR(191) NULL,
    `kazanNo` VARCHAR(191) NULL,
    `dyeColorId` INTEGER NULL,
    `dyeTypeId` INTEGER NULL,
    `laminationColorId` INTEGER NULL,
    `note` VARCHAR(191) NULL,
    `productionOrderId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `stock` ADD CONSTRAINT `stock_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock` ADD CONSTRAINT `stock_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock` ADD CONSTRAINT `stock_dyeColorId_fkey` FOREIGN KEY (`dyeColorId`) REFERENCES `dyeColor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock` ADD CONSTRAINT `stock_dyeTypeId_fkey` FOREIGN KEY (`dyeTypeId`) REFERENCES `dyeType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock` ADD CONSTRAINT `stock_laminationColorId_fkey` FOREIGN KEY (`laminationColorId`) REFERENCES `laminationColor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock` ADD CONSTRAINT `stock_productionOrderId_fkey` FOREIGN KEY (`productionOrderId`) REFERENCES `productionOrder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
