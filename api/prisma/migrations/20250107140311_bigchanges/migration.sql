/*
  Warnings:

  - You are about to drop the column `productId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `laminationTypeId` on the `orderItem` table. All the data in the column will be lost.
  - You are about to drop the column `outsourceTypeId` on the `orderItem` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `orderItem` table. All the data in the column will be lost.
  - You are about to drop the column `sentKg` on the `orderItem` table. All the data in the column will be lost.
  - You are about to drop the column `sentMeter` on the `orderItem` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `orderItem` table. All the data in the column will be lost.
  - You are about to drop the column `fine` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `ham` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `maxGrA` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `maxGrB` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `mayA` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `mayB` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `minGrA` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `minGrB` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `laminationType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `kg` to the `orderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meter` to the `orderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_productId_fkey`;

-- DropForeignKey
ALTER TABLE `orderItem` DROP FOREIGN KEY `orderItem_laminationTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `orderItem` DROP FOREIGN KEY `orderItem_outsourceTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `rawQualityControlStock` DROP FOREIGN KEY `rawQualityControlStock_cutStockId_fkey`;

-- AlterTable
ALTER TABLE `dyeOrderItem` MODIFY `yon` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `dyeReturnStock` MODIFY `yon` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `offerItem` MODIFY `vade` INTEGER NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `productId`;

-- AlterTable
ALTER TABLE `orderItem` DROP COLUMN `laminationTypeId`,
    DROP COLUMN `outsourceTypeId`,
    DROP COLUMN `quantity`,
    DROP COLUMN `sentKg`,
    DROP COLUMN `sentMeter`,
    DROP COLUMN `unit`,
    ADD COLUMN `kg` DOUBLE NOT NULL,
    ADD COLUMN `meter` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `outsourceType` ADD COLUMN `outsourceGroupId` INTEGER NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `fine`,
    DROP COLUMN `ham`,
    DROP COLUMN `maxGrA`,
    DROP COLUMN `maxGrB`,
    DROP COLUMN `mayA`,
    DROP COLUMN `mayB`,
    DROP COLUMN `minGrA`,
    DROP COLUMN `minGrB`,
    ADD COLUMN `productTypeId` INTEGER NULL,
    ADD COLUMN `specs` JSON NULL;

-- AlterTable
ALTER TABLE `rawQualityControlStock` ADD COLUMN `productionOrderId` INTEGER NULL,
    MODIFY `cutStockId` INTEGER NULL,
    MODIFY `lot` VARCHAR(191) NULL,
    MODIFY `yon` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `rawStock` MODIFY `yon` BOOLEAN NULL;

-- DropTable
DROP TABLE `laminationType`;

-- CreateTable
CREATE TABLE `productType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `needsCutting` BOOLEAN NOT NULL,
    `specsGroup` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `outsourceGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orderItemSpecification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderItemId` INTEGER NOT NULL,
    `outsourceTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_productTypeId_fkey` FOREIGN KEY (`productTypeId`) REFERENCES `productType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rawQualityControlStock` ADD CONSTRAINT `rawQualityControlStock_productionOrderId_fkey` FOREIGN KEY (`productionOrderId`) REFERENCES `productionOrder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rawQualityControlStock` ADD CONSTRAINT `rawQualityControlStock_cutStockId_fkey` FOREIGN KEY (`cutStockId`) REFERENCES `cutStock`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceType` ADD CONSTRAINT `outsourceType_outsourceGroupId_fkey` FOREIGN KEY (`outsourceGroupId`) REFERENCES `outsourceGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderItemSpecification` ADD CONSTRAINT `orderItemSpecification_orderItemId_fkey` FOREIGN KEY (`orderItemId`) REFERENCES `orderItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderItemSpecification` ADD CONSTRAINT `orderItemSpecification_outsourceTypeId_fkey` FOREIGN KEY (`outsourceTypeId`) REFERENCES `outsourceType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
