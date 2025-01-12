/*
  Warnings:

  - You are about to drop the column `acceptanceDate` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `currencyId` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `daysDue` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `deadlineDate` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryAddress` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `lastMeetDate` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `maturity` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `offerDate` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `offerNo` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `packingListNo` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `proformaDetails` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `proformaNo` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `rejectionDate` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `requestBudget` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `requestDate` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `requestDeadline` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `requestNo` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `saleNo` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `shippingMethod` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `specialRequirement` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `specification` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `vat` on the `offer` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `offer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.
  - You are about to drop the column `lot` on the `orderItem` table. All the data in the column will be lost.
  - Made the column `date` on table `customerComplaint` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `deliveryDeadlineDate` to the `offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentDue` to the `offer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `offer` DROP FOREIGN KEY `offer_currencyId_fkey`;

-- DropForeignKey
ALTER TABLE `offer` DROP FOREIGN KEY `offer_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `offer` DROP FOREIGN KEY `offer_productId_fkey`;

-- AlterTable
ALTER TABLE `customerComplaint` MODIFY `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `offer` DROP COLUMN `acceptanceDate`,
    DROP COLUMN `currencyId`,
    DROP COLUMN `customerId`,
    DROP COLUMN `date`,
    DROP COLUMN `daysDue`,
    DROP COLUMN `deadlineDate`,
    DROP COLUMN `deliveryAddress`,
    DROP COLUMN `lastMeetDate`,
    DROP COLUMN `maturity`,
    DROP COLUMN `offerDate`,
    DROP COLUMN `offerNo`,
    DROP COLUMN `packingListNo`,
    DROP COLUMN `price`,
    DROP COLUMN `productId`,
    DROP COLUMN `proformaDetails`,
    DROP COLUMN `proformaNo`,
    DROP COLUMN `quantity`,
    DROP COLUMN `rejectionDate`,
    DROP COLUMN `requestBudget`,
    DROP COLUMN `requestDate`,
    DROP COLUMN `requestDeadline`,
    DROP COLUMN `requestNo`,
    DROP COLUMN `saleNo`,
    DROP COLUMN `shippingMethod`,
    DROP COLUMN `specialRequirement`,
    DROP COLUMN `specification`,
    DROP COLUMN `unit`,
    DROP COLUMN `vat`,
    ADD COLUMN `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `customerTargetPrice` DOUBLE NULL,
    ADD COLUMN `deliveryDeadlineDate` DATETIME(3) NOT NULL,
    ADD COLUMN `orderId` INTEGER NULL,
    ADD COLUMN `paymentDue` INTEGER NOT NULL,
    ADD COLUMN `responseDate` DATETIME(3) NULL,
    MODIFY `status` ENUM('Verilecek', 'Red', 'Onaylandi', 'Beklemede') NOT NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `orderItem` DROP COLUMN `lot`,
    ADD COLUMN `laminationTypeId` INTEGER NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `personnel` MODIFY `department` ENUM('admin', 'yon', 'iys', 'ika', 'kal', 'pln', 'stn', 'sts', 'urt', 'sev', 'dep', 'coz', 'orm', 'kalf', 'kes', 'muh') NULL;

-- CreateTable
CREATE TABLE `offerItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `offerId` INTEGER NOT NULL,
    `orderItemId` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `vatRate` DOUBLE NOT NULL,
    `total` DOUBLE NOT NULL,
    `totalVat` DOUBLE NOT NULL,
    `vade` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `laminationType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `personnelId` INTEGER NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `offer` ADD CONSTRAINT `offer_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offerItem` ADD CONSTRAINT `offerItem_offerId_fkey` FOREIGN KEY (`offerId`) REFERENCES `offer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offerItem` ADD CONSTRAINT `offerItem_orderItemId_fkey` FOREIGN KEY (`orderItemId`) REFERENCES `orderItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderItem` ADD CONSTRAINT `orderItem_laminationTypeId_fkey` FOREIGN KEY (`laminationTypeId`) REFERENCES `laminationType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `log` ADD CONSTRAINT `log_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
