/*
  Warnings:

  - You are about to drop the column `accountId` on the `outsourceOrder` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `outsourceOrder` table. All the data in the column will be lost.
  - You are about to drop the column `open` on the `outsourceOrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `returnCount` on the `outsourceOrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `returnKg` on the `outsourceOrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `returnMeter` on the `outsourceOrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `sentCount` on the `outsourceOrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `sentKg` on the `outsourceOrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `sentMeter` on the `outsourceOrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `dyeStockId` on the `outsourceShipmentItem` table. All the data in the column will be lost.
  - Added the required column `stockStatus` to the `outsourceOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplierId` to the `outsourceOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personnelId` to the `outsourceShipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `count` to the `outsourceShipmentItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kg` to the `outsourceShipmentItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meter` to the `outsourceShipmentItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outsourceOrderItemId` to the `outsourceShipmentItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockId` to the `outsourceShipmentItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `outsourceOrder` DROP FOREIGN KEY `outsourceOrder_accountId_fkey`;

-- AlterTable
ALTER TABLE `outsourceOrder` DROP COLUMN `accountId`,
    DROP COLUMN `note`,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `stockStatus` ENUM('PRE_CUT', 'RAW_PRE_QUALITY', 'RAW_QUALITY', 'DYE_HOUSE', 'DYE_PRE_QUALITY', 'DYE_QUALITY', 'OUTSOURCING', 'LAMINATED_PRE_QUALITY', 'LAMINATED_QUALITY', 'COVER_QUALITY') NOT NULL,
    ADD COLUMN `supplierId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `outsourceOrderItem` DROP COLUMN `open`,
    DROP COLUMN `returnCount`,
    DROP COLUMN `returnKg`,
    DROP COLUMN `returnMeter`,
    DROP COLUMN `sentCount`,
    DROP COLUMN `sentKg`,
    DROP COLUMN `sentMeter`,
    MODIFY `dyeColorId` INTEGER NULL,
    MODIFY `laminationColorId` INTEGER NULL,
    MODIFY `note` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `outsourceShipment` ADD COLUMN `personnelId` INTEGER NOT NULL,
    ADD COLUMN `shippingCarId` INTEGER NULL,
    ADD COLUMN `shippingCarrierId` INTEGER NULL,
    ADD COLUMN `shippingCompanyId` INTEGER NULL,
    MODIFY `sentDate` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `outsourceShipmentItem` DROP COLUMN `dyeStockId`,
    ADD COLUMN `count` INTEGER NOT NULL,
    ADD COLUMN `kg` DOUBLE NOT NULL,
    ADD COLUMN `meter` DOUBLE NOT NULL,
    ADD COLUMN `outsourceOrderItemId` INTEGER NOT NULL,
    ADD COLUMN `stockId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `stock` ADD COLUMN `originStockId` INTEGER NULL;

-- CreateTable
CREATE TABLE `outsourceConfirmation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `outsourceOrderItemId` INTEGER NOT NULL,
    `stockId` INTEGER NOT NULL,
    `meter` DOUBLE NOT NULL,
    `kg` DOUBLE NOT NULL,
    `count` INTEGER NOT NULL,
    `personnelId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `stock` ADD CONSTRAINT `stock_originStockId_fkey` FOREIGN KEY (`originStockId`) REFERENCES `stock`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceOrder` ADD CONSTRAINT `outsourceOrder_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `supplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceOrder` ADD CONSTRAINT `outsourceOrder_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceOrderItem` ADD CONSTRAINT `outsourceOrderItem_dyeColorId_fkey` FOREIGN KEY (`dyeColorId`) REFERENCES `dyeColor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceOrderItem` ADD CONSTRAINT `outsourceOrderItem_laminationColorId_fkey` FOREIGN KEY (`laminationColorId`) REFERENCES `laminationColor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceShipment` ADD CONSTRAINT `outsourceShipment_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceShipment` ADD CONSTRAINT `outsourceShipment_shippingCompanyId_fkey` FOREIGN KEY (`shippingCompanyId`) REFERENCES `shippingCompany`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceShipment` ADD CONSTRAINT `outsourceShipment_shippingCarrierId_fkey` FOREIGN KEY (`shippingCarrierId`) REFERENCES `shippingCarrier`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceShipment` ADD CONSTRAINT `outsourceShipment_shippingCarId_fkey` FOREIGN KEY (`shippingCarId`) REFERENCES `shippingCar`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceShipmentItem` ADD CONSTRAINT `outsourceShipmentItem_stockId_fkey` FOREIGN KEY (`stockId`) REFERENCES `stock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceShipmentItem` ADD CONSTRAINT `outsourceShipmentItem_outsourceOrderItemId_fkey` FOREIGN KEY (`outsourceOrderItemId`) REFERENCES `outsourceOrderItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceConfirmation` ADD CONSTRAINT `outsourceConfirmation_outsourceOrderItemId_fkey` FOREIGN KEY (`outsourceOrderItemId`) REFERENCES `outsourceOrderItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceConfirmation` ADD CONSTRAINT `outsourceConfirmation_stockId_fkey` FOREIGN KEY (`stockId`) REFERENCES `stock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceConfirmation` ADD CONSTRAINT `outsourceConfirmation_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
