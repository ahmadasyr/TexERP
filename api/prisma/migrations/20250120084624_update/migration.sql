-- AlterTable
ALTER TABLE `materialCategory` ADD COLUMN `parentCategoryId` INTEGER NULL;

-- AlterTable
ALTER TABLE `supplier` MODIFY `suitable` BOOLEAN NULL DEFAULT false,
    MODIFY `approved` BOOLEAN NULL DEFAULT false,
    MODIFY `selfPickup` BOOLEAN NULL;

-- AddForeignKey
ALTER TABLE `materialCategory` ADD CONSTRAINT `materialCategory_parentCategoryId_fkey` FOREIGN KEY (`parentCategoryId`) REFERENCES `materialCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
