/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `personnel` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `personnel` ADD COLUMN `username` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `personnel_email_key` ON `personnel`(`email`);
