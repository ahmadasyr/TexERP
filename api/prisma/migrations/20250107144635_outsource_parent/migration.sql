-- AlterTable
ALTER TABLE `outsourceType` ADD COLUMN `parentOutsourceTypeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `outsourceType` ADD CONSTRAINT `outsourceType_parentOutsourceTypeId_fkey` FOREIGN KEY (`parentOutsourceTypeId`) REFERENCES `outsourceType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
