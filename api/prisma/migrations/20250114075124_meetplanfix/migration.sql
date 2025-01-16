/*
  Warnings:

  - You are about to drop the column `accuracyRate` on the `customerMeetPlan` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `customerMeetPlan` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `customerMeetPlan` table. All the data in the column will be lost.
  - You are about to drop the column `visitingPersonnelId` on the `customerMeetPlan` table. All the data in the column will be lost.
  - You are about to drop the column `followedByPersonnelId` on the `dofiRequest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderItemId,outsourceTypeId]` on the table `orderItemSpecification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `location` to the `customerMeetPlan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `customerMeetPlan` DROP FOREIGN KEY `customerMeetPlan_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `customerMeetPlan` DROP FOREIGN KEY `customerMeetPlan_visitingPersonnelId_fkey`;

-- DropForeignKey
ALTER TABLE `dofiRequest` DROP FOREIGN KEY `dofiRequest_followedByPersonnelId_fkey`;

-- AlterTable
ALTER TABLE `customerMeetPlan` DROP COLUMN `accuracyRate`,
    DROP COLUMN `country`,
    DROP COLUMN `customerId`,
    DROP COLUMN `visitingPersonnelId`,
    ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `returnDate` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `dofiRequest` DROP COLUMN `followedByPersonnelId`,
    ADD COLUMN `followedPersonnelId` INTEGER NULL;

-- CreateTable
CREATE TABLE `customerMeetPlanAttendee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerMeetPlanId` INTEGER NOT NULL,
    `personnelId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customerMeetPlanCustomer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `customerMeetPlanId` INTEGER NOT NULL,
    `note` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `category` ENUM('General', 'Customer', 'Personnel', 'Product', 'Order', 'Offer', 'Dye', 'Outsource', 'Yarn', 'Wrap', 'Production', 'Account', 'Stock', 'Machine', 'Dofi', 'Log') NOT NULL,
    `personnelId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NULL,
    `read` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `orderItemSpecification_orderItemId_outsourceTypeId_key` ON `orderItemSpecification`(`orderItemId`, `outsourceTypeId`);

-- AddForeignKey
ALTER TABLE `customerMeetPlanAttendee` ADD CONSTRAINT `customerMeetPlanAttendee_customerMeetPlanId_fkey` FOREIGN KEY (`customerMeetPlanId`) REFERENCES `customerMeetPlan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerMeetPlanAttendee` ADD CONSTRAINT `customerMeetPlanAttendee_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerMeetPlanCustomer` ADD CONSTRAINT `customerMeetPlanCustomer_customerMeetPlanId_fkey` FOREIGN KEY (`customerMeetPlanId`) REFERENCES `customerMeetPlan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerMeetPlanCustomer` ADD CONSTRAINT `customerMeetPlanCustomer_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dofiRequest` ADD CONSTRAINT `dofiRequest_followedPersonnelId_fkey` FOREIGN KEY (`followedPersonnelId`) REFERENCES `personnel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notification` ADD CONSTRAINT `notification_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
