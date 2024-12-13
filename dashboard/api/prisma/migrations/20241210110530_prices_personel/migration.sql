-- AlterTable
ALTER TABLE `customerPrice` ADD COLUMN `personnelId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `customerPrice` ADD CONSTRAINT `customerPrice_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
