/*
  Warnings:

  - You are about to drop the column `code` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `code`,
    ADD COLUMN `fine` INTEGER NULL,
    ADD COLUMN `ham` INTEGER NULL,
    ADD COLUMN `maxGrA` INTEGER NULL,
    ADD COLUMN `maxGrB` INTEGER NULL,
    ADD COLUMN `mayA` INTEGER NULL,
    ADD COLUMN `mayB` INTEGER NULL,
    ADD COLUMN `minGrA` INTEGER NULL,
    ADD COLUMN `minGrB` INTEGER NULL;
