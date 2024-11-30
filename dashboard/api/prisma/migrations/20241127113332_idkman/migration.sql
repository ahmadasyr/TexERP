/*
  Warnings:

  - You are about to drop the column `updatedAT` on the `yarnType` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `account` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `yarnType` DROP COLUMN `updatedAT`,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;
