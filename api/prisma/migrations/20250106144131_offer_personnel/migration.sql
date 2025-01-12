/*
  Warnings:

  - Added the required column `personnelId` to the `offer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `offer` ADD COLUMN `personnelId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `offer` ADD CONSTRAINT `offer_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
