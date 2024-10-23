/*
  Warnings:

  - You are about to drop the column `salesPersonId` on the `customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `customer` DROP COLUMN `salesPersonId`,
    ADD COLUMN `personnelId` INTEGER NULL;
