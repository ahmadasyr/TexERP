/*
  Warnings:

  - You are about to drop the column `accountId` on the `order` table. All the data in the column will be lost.
  - Made the column `customerId` on table `order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_customerId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `accountId`,
    MODIFY `customerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
