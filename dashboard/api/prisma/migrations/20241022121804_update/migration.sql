/*
  Warnings:

  - You are about to alter the column `status` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.
  - You are about to drop the column `dateofhire` on the `personnel` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `personnel` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `personnel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `customer` MODIFY `status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `personnel` DROP COLUMN `dateofhire`,
    DROP COLUMN `firstname`,
    DROP COLUMN `lastname`,
    ADD COLUMN `dateOfHire` DATETIME(3) NULL,
    ADD COLUMN `firstName` VARCHAR(50) NULL,
    ADD COLUMN `lastName` VARCHAR(50) NULL;
