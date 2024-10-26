/*
  Warnings:

  - You are about to drop the column `competitorName` on the `competitorReport` table. All the data in the column will be lost.
  - Added the required column `competitorId` to the `competitorReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `competitorReport` DROP COLUMN `competitorName`,
    ADD COLUMN `competitorId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `competitor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `competitorReport` ADD CONSTRAINT `competitorReport_competitorId_fkey` FOREIGN KEY (`competitorId`) REFERENCES `competitor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
