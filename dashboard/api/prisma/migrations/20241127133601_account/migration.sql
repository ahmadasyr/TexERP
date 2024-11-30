/*
  Warnings:

  - You are about to drop the column `accountTypeId` on the `account` table. All the data in the column will be lost.
  - Added the required column `buys` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dye` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outsource` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yarn` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `account_accountTypeId_fkey`;

-- AlterTable
ALTER TABLE `account` DROP COLUMN `accountTypeId`,
    ADD COLUMN `buys` BOOLEAN NOT NULL,
    ADD COLUMN `dye` BOOLEAN NOT NULL,
    ADD COLUMN `outsource` BOOLEAN NOT NULL,
    ADD COLUMN `yarn` BOOLEAN NOT NULL;
