/*
  Warnings:

  - You are about to drop the column `followedBy` on the `dofiRequest` table. All the data in the column will be lost.
  - You are about to drop the column `from` on the `dofiRequest` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `dofiRequest` table. All the data in the column will be lost.
  - Added the required column `fromPersonnelId` to the `dofiRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toPersonnelId` to the `dofiRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `dofiRequest` DROP FOREIGN KEY `dofiRequest_followedBy_fkey`;

-- DropForeignKey
ALTER TABLE `dofiRequest` DROP FOREIGN KEY `dofiRequest_from_fkey`;

-- DropForeignKey
ALTER TABLE `dofiRequest` DROP FOREIGN KEY `dofiRequest_to_fkey`;

-- AlterTable
ALTER TABLE `dofiRequest` DROP COLUMN `followedBy`,
    DROP COLUMN `from`,
    DROP COLUMN `to`,
    ADD COLUMN `followedByPersonnelId` INTEGER NULL,
    ADD COLUMN `fromPersonnelId` INTEGER NOT NULL,
    ADD COLUMN `toPersonnelId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `dofiRequest` ADD CONSTRAINT `dofiRequest_fromPersonnelId_fkey` FOREIGN KEY (`fromPersonnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dofiRequest` ADD CONSTRAINT `dofiRequest_toPersonnelId_fkey` FOREIGN KEY (`toPersonnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dofiRequest` ADD CONSTRAINT `dofiRequest_followedByPersonnelId_fkey` FOREIGN KEY (`followedByPersonnelId`) REFERENCES `personnel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
