/*
  Warnings:

  - You are about to drop the column `buys` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `dye` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `outsource` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `yarn` on the `account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `account` DROP COLUMN `buys`,
    DROP COLUMN `dye`,
    DROP COLUMN `outsource`,
    DROP COLUMN `yarn`,
    ADD COLUMN `accountTypeId` INTEGER NULL;

-- AlterTable
ALTER TABLE `customerComplaint` ADD COLUMN `lot` VARCHAR(191) NULL,
    ADD COLUMN `orderId` INTEGER NULL;

-- CreateTable
CREATE TABLE `accountTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `accountTypes_name_key`(`name`),
    UNIQUE INDEX `accountTypes_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `customer_accountId_key` ON `customer`(`accountId`);

-- AddForeignKey
ALTER TABLE `customerComplaint` ADD CONSTRAINT `customerComplaint_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_accountTypeId_fkey` FOREIGN KEY (`accountTypeId`) REFERENCES `accountType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
