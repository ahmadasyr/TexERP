/*
  Warnings:

  - You are about to drop the `accountTypes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `accountType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `accountType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `accountType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accountType` ADD COLUMN `code` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `accountTypes`;

-- CreateIndex
CREATE UNIQUE INDEX `accountType_name_key` ON `accountType`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `accountType_code_key` ON `accountType`(`code`);
