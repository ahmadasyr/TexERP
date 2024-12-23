/*
  Warnings:

  - Made the column `personnelId` on table `customerPrice` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `customerPrice` DROP FOREIGN KEY `customerPrice_personnelId_fkey`;

-- AlterTable
ALTER TABLE `customerPrice` MODIFY `personnelId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `customerPrice` ADD CONSTRAINT `customerPrice_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
