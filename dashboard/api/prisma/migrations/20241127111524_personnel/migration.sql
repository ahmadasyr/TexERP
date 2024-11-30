-- AddForeignKey
ALTER TABLE `yarnType` ADD CONSTRAINT `yarnType_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
