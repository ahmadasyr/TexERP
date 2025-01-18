/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `material` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `materialCategory` will be added. If there are existing duplicate values, this will fail.
  - Made the column `password` on table `personnel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `personnel` MODIFY `password` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `material_name_key` ON `material`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `materialCategory_name_key` ON `materialCategory`(`name`);
