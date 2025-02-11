-- AlterTable
ALTER TABLE `yarnStockEntry` ADD COLUMN `warehouseId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `yarnStockEntry` ADD CONSTRAINT `yarnStockEntry_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `warehouse`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
