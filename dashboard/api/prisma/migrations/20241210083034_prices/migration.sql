/*
  Warnings:

  - Added the required column `installment` to the `customerPrice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upfront` to the `customerPrice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `installment` to the `productPrice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upfront` to the `productPrice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customerPrice` ADD COLUMN `installment` DOUBLE NOT NULL,
    ADD COLUMN `upfront` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `productPrice` ADD COLUMN `installment` DOUBLE NOT NULL,
    ADD COLUMN `upfront` DOUBLE NOT NULL;
