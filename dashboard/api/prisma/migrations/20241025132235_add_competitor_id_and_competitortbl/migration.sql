/*
  Warnings:

  - You are about to drop the column `firstOffer` on the `customer` table. All the data in the column will be lost.
  - Added the required column `firstOfferDate` to the `customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer` DROP COLUMN `firstOffer`,
    ADD COLUMN `firstOfferDate` DATETIME(3) NOT NULL;
