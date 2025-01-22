-- DropForeignKey
ALTER TABLE `purchaseOrderItem` DROP FOREIGN KEY `purchaseOrderItem_currencyId_fkey`;

-- AlterTable
ALTER TABLE `purchaseOrderItem` MODIFY `pricePerUnit` DOUBLE NULL,
    MODIFY `currencyId` INTEGER NULL,
    MODIFY `vat` DOUBLE NULL;

-- AddForeignKey
ALTER TABLE `purchaseOrderItem` ADD CONSTRAINT `purchaseOrderItem_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `currency`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
