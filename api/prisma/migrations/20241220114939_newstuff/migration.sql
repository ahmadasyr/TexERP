/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `account` ADD COLUMN `currencyId` INTEGER NULL,
    ADD COLUMN `taxNumber` VARCHAR(191) NULL,
    ADD COLUMN `taxOfficeId` INTEGER NULL;

-- AlterTable
ALTER TABLE `orderItem` ADD COLUMN `itemTypeId` INTEGER NULL;

-- CreateTable
CREATE TABLE `itemType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `account_name_key` ON `account`(`name`);

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_taxOfficeId_fkey` FOREIGN KEY (`taxOfficeId`) REFERENCES `taxOffice`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `currency`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderItem` ADD CONSTRAINT `orderItem_itemTypeId_fkey` FOREIGN KEY (`itemTypeId`) REFERENCES `itemType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
