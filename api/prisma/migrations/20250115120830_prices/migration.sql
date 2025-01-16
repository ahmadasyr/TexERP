/*
  Warnings:

  - You are about to drop the column `productTypeId` on the `customerPrice` table. All the data in the column will be lost.
  - You are about to drop the column `productTypeId` on the `productPrice` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `customerPrice` DROP FOREIGN KEY `customerPrice_productTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `productPrice` DROP FOREIGN KEY `productPrice_productTypeId_fkey`;

-- AlterTable
ALTER TABLE `customerPrice` DROP COLUMN `productTypeId`;

-- AlterTable
ALTER TABLE `productPrice` DROP COLUMN `productTypeId`;
