/*
  Warnings:

  - Made the column `personnelId` on table `customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `customer` MODIFY `personnelId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
