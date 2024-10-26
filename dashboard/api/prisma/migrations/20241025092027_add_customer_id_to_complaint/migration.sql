/*
  Warnings:

  - Added the required column `customerId` to the `customerComplaint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customerComplaint` ADD COLUMN `customerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `customerComplaint` ADD CONSTRAINT `customerComplaint_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
