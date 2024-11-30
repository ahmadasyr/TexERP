/*
  Warnings:

  - Added the required column `personnelId` to the `cutStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personnelId` to the `dyeOrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personnelId` to the `dyeReturnStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personnelId` to the `dyeStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personnelId` to the `orderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personnelId` to the `orderShipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personnelId` to the `outsourceOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personnelId` to the `outsourceOrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personnelId` to the `outsourceReturnStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personnelId` to the `rawQualityControlStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personnelId` to the `rawStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personnelId` to the `wrapStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personnelId` to the `yarnStockEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cutStock` ADD COLUMN `personnelId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `dyeOrderItem` ADD COLUMN `personnelId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `dyeReturnStock` ADD COLUMN `personnelId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `dyeStock` ADD COLUMN `personnelId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `orderItem` ADD COLUMN `personnelId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `orderShipment` ADD COLUMN `personnelId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `outsourceOrder` ADD COLUMN `personnelId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `outsourceOrderItem` ADD COLUMN `personnelId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `outsourceReturnStock` ADD COLUMN `personnelId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `rawQualityControlStock` ADD COLUMN `personnelId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `rawStock` ADD COLUMN `personnelId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `wrapStock` ADD COLUMN `personnelId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `yarnStockEntry` ADD COLUMN `personnelId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `yarnStockEntry` ADD CONSTRAINT `yarnStockEntry_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wrapStock` ADD CONSTRAINT `wrapStock_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cutStock` ADD CONSTRAINT `cutStock_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rawQualityControlStock` ADD CONSTRAINT `rawQualityControlStock_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rawStock` ADD CONSTRAINT `rawStock_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeOrderItem` ADD CONSTRAINT `dyeOrderItem_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeReturnStock` ADD CONSTRAINT `dyeReturnStock_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeStock` ADD CONSTRAINT `dyeStock_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceOrderItem` ADD CONSTRAINT `outsourceOrderItem_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceReturnStock` ADD CONSTRAINT `outsourceReturnStock_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderShipment` ADD CONSTRAINT `orderShipment_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
