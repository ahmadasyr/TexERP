/*
  Warnings:

  - You are about to drop the column `amount` on the `materialStock` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `materialStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `materialStock` DROP COLUMN `amount`,
    ADD COLUMN `quantity` DOUBLE NOT NULL;
