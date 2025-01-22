/*
  Warnings:

  - You are about to drop the column `CarId` on the `purchaseDelivery` table. All the data in the column will be lost.
  - You are about to drop the column `approvalFromManagement` on the `purchaseRequest` table. All the data in the column will be lost.
  - You are about to drop the column `approvalFromManagementDate` on the `purchaseRequest` table. All the data in the column will be lost.
  - You are about to drop the column `managementQuantity` on the `purchaseRequestItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `purchaseDelivery` DROP FOREIGN KEY `purchaseDelivery_CarId_fkey`;

-- AlterTable
ALTER TABLE `purchaseDelivery` DROP COLUMN `CarId`,
    ADD COLUMN `carId` INTEGER NULL;

-- AlterTable
ALTER TABLE `purchaseOrder` ADD COLUMN `approved` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `approvedDate` DATETIME(3) NULL,
    ADD COLUMN `requiresApproval` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `status` ENUM('Pending', 'Approved', 'Rejected', 'Cancelled', 'Completed', 'Returned') NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE `purchaseRequest` DROP COLUMN `approvalFromManagement`,
    DROP COLUMN `approvalFromManagementDate`;

-- AlterTable
ALTER TABLE `purchaseRequestItem` DROP COLUMN `managementQuantity`;

-- AddForeignKey
ALTER TABLE `purchaseDelivery` ADD CONSTRAINT `purchaseDelivery_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `shippingCar`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
