/*
  Warnings:

  - Added the required column `personnelId` to the `yarnOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `yarnOrder` ADD COLUMN `personnelId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `yarnOrder` ADD CONSTRAINT `yarnOrder_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrder` ADD CONSTRAINT `yarnOrder_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
