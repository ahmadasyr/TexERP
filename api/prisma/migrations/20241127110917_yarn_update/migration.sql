/*
  Warnings:

  - Added the required column `color` to the `yarnType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorCode` to the `yarnType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `count` to the `yarnType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personnelId` to the `yarnType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `yarnType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAT` to the `yarnType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `yarnType` ADD COLUMN `color` VARCHAR(191) NOT NULL,
    ADD COLUMN `colorCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `count` DOUBLE NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `currencyId` INTEGER NULL,
    ADD COLUMN `personnelId` INTEGER NOT NULL,
    ADD COLUMN `price` DOUBLE NULL,
    ADD COLUMN `unit` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAT` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `yarnType` ADD CONSTRAINT `yarnType_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `currency`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
