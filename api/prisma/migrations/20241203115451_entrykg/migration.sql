/*
  Warnings:

  - Added the required column `entryCount` to the `yarnStockEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entryKg` to the `yarnStockEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `yarnStockEntry` ADD COLUMN `entryCount` INTEGER NOT NULL,
    ADD COLUMN `entryKg` DOUBLE NOT NULL;
