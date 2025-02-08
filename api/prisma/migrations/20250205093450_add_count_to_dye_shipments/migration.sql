/*
  Warnings:

  - Added the required column `count` to the `dyeConfirmation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `count` to the `dyeShipmentItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dyeConfirmation` ADD COLUMN `count` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `dyeShipmentItem` ADD COLUMN `count` INTEGER NOT NULL;
