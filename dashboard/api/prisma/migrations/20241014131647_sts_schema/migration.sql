/*
  Warnings:

  - You are about to drop the column `test` on the `personnel` table. All the data in the column will be lost.
  - You are about to drop the column `test2` on the `personnel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `personnel` DROP COLUMN `test`,
    DROP COLUMN `test2`;

-- CreateTable
CREATE TABLE `taxOffice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bank` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `currency` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` CHAR(3) NOT NULL,
    `rate` DOUBLE NOT NULL,
    `exchangePercent` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `foreign` BOOLEAN NOT NULL,
    `relatedPerson` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `firstOffer` DATETIME(3) NOT NULL,
    `salesPersonId` INTEGER NULL,
    `firstRegisterDate` DATETIME(3) NOT NULL,
    `status` ENUM('Mevcut', 'Potansiyel', 'Riskli', 'Kara_Liste') NOT NULL,
    `returnDate` DATETIME(3) NOT NULL,
    `salesOpinion` VARCHAR(191) NOT NULL,
    `creditNote` VARCHAR(191) NOT NULL,
    `shippingMethod` ENUM('Fabricadan', 'Depodan', 'Limana', 'EXW', 'FCA', 'CPT', 'CIP', 'DAT', 'DAP', 'DDP', 'FAS', 'FOB', 'CFR', 'CIF') NOT NULL,
    `meterLimit` DOUBLE NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `taxOfficeId` INTEGER NOT NULL,
    `taxNumber` VARCHAR(191) NOT NULL,
    `paymentKind` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NOT NULL,
    `bankId` INTEGER NOT NULL,
    `currencyId` INTEGER NOT NULL,
    `iban` VARCHAR(191) NOT NULL,
    `swift` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customerMeetPlan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `visitReason` VARCHAR(191) NOT NULL,
    `plannedDate` DATETIME(3) NOT NULL,
    `realDate` DATETIME(3) NOT NULL,
    `visitingPersonnelId` INTEGER NOT NULL,
    `result` VARCHAR(191) NOT NULL,
    `accuracyRate` DOUBLE NOT NULL,
    `note` VARCHAR(191) NOT NULL,
    `travelExpense` DOUBLE NOT NULL,
    `accommodationExpense` DOUBLE NOT NULL,
    `foodExpense` DOUBLE NOT NULL,
    `giftExpense` DOUBLE NOT NULL,
    `officeExpense` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customerMeetReport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `revisionDate` DATETIME(3) NOT NULL,
    `meetDate` DATETIME(3) NOT NULL,
    `personnelId` INTEGER NOT NULL,
    `visitReason` VARCHAR(191) NOT NULL,
    `customerId` INTEGER NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `peopleMet` JSON NOT NULL,
    `wayOfMeeting` VARCHAR(191) NOT NULL,
    `contentsOfMeeting` VARCHAR(191) NOT NULL,
    `customerNote` VARCHAR(191) NOT NULL,
    `responseToCustomer` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `competitorReport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `competitorName` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `competitionReportSubject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `competitorReportContent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `competitorReportId` INTEGER NOT NULL,
    `competitionReportSubjectId` INTEGER NOT NULL,
    `exists` BOOLEAN NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `gap` VARCHAR(191) NOT NULL,
    `strategy` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customerPrice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `customerId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `currencyId` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `unit` ENUM('m', 'kg') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `offer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `offerNo` INTEGER NOT NULL,
    `saleNo` INTEGER NOT NULL,
    `offerDate` DATETIME(3) NOT NULL,
    `customerId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `proformaNo` INTEGER NOT NULL,
    `requestNo` INTEGER NOT NULL,
    `requestDate` DATETIME(3) NOT NULL,
    `requestDeadline` DATETIME(3) NOT NULL,
    `requestBudget` DOUBLE NOT NULL,
    `productId` INTEGER NOT NULL,
    `specification` VARCHAR(191) NOT NULL,
    `detail` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `unit` ENUM('m', 'kg') NOT NULL,
    `price` DOUBLE NOT NULL,
    `currencyId` INTEGER NOT NULL,
    `vat` DOUBLE NOT NULL,
    `total` DOUBLE NOT NULL,
    `maturity` INTEGER NOT NULL,
    `daysDue` INTEGER NOT NULL,
    `deadlineDate` DATETIME(3) NOT NULL,
    `specialRequirement` VARCHAR(191) NOT NULL,
    `deliveryAddress` VARCHAR(191) NOT NULL,
    `shippingMethod` ENUM('Fabricadan', 'Depodan', 'Limana', 'EXW', 'FCA', 'CPT', 'CIP', 'DAT', 'DAP', 'DDP', 'FAS', 'FOB', 'CFR', 'CIF') NOT NULL,
    `proformaDetails` VARCHAR(191) NOT NULL,
    `packingListNo` INTEGER NOT NULL,
    `additionalTerms` VARCHAR(191) NOT NULL,
    `validPeriod` INTEGER NOT NULL,
    `validPeriodType` VARCHAR(191) NOT NULL,
    `conditions` JSON NOT NULL,
    `lastValidityDate` DATETIME(3) NOT NULL,
    `acceptanceDate` DATETIME(3) NOT NULL,
    `rejectionDate` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `meetNote` VARCHAR(191) NOT NULL,
    `lastMeetDate` DATETIME(3) NOT NULL,
    `meetStatement` VARCHAR(191) NOT NULL,
    `totalKDV` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderNo` VARCHAR(191) NOT NULL,
    `customerId` INTEGER NOT NULL,
    `index` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `unit` ENUM('m', 'kg') NOT NULL,
    `deliveryAddress` VARCHAR(191) NOT NULL,
    `acceptanceDate` DATETIME(3) NOT NULL,
    `specifications` VARCHAR(191) NOT NULL,
    `details` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customerComplaint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `productId` INTEGER NOT NULL,
    `packagingDate` DATETIME(3) NOT NULL,
    `complaintDetails` VARCHAR(191) NOT NULL,
    `dealingPersonnelId` INTEGER NOT NULL,
    `dealingDate` DATETIME(3) NOT NULL,
    `evaluatingPersonnelId` INTEGER NOT NULL,
    `actionTaken` VARCHAR(191) NOT NULL,
    `dofNo` INTEGER NOT NULL,
    `result` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productFeasibilityForm` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `attendees` JSON NOT NULL,
    `productName` VARCHAR(191) NOT NULL,
    `customerId` INTEGER NOT NULL,
    `yearlyProductionCount` INTEGER NOT NULL,
    `startDateGoal` DATETIME(3) NOT NULL,
    `productPriceGoal` DOUBLE NOT NULL,
    `marketReady` BOOLEAN NOT NULL,
    `demandReady` BOOLEAN NOT NULL,
    `legalReady` BOOLEAN NOT NULL,
    `testReady` BOOLEAN NOT NULL,
    `productionReady` BOOLEAN NOT NULL,
    `measurementReady` BOOLEAN NOT NULL,
    `rawMaterialCost` DOUBLE NOT NULL,
    `productionCost` DOUBLE NOT NULL,
    `process` JSON NOT NULL,
    `material` JSON NOT NULL,
    `auxEquipment` JSON NOT NULL,
    `machine` JSON NOT NULL,
    `costs` JSON NOT NULL,
    `cost` DOUBLE NOT NULL,
    `customerBudget` DOUBLE NOT NULL,
    `priceDifferencePercent` DOUBLE NOT NULL,
    `suitable` BOOLEAN NOT NULL,
    `costsCovered` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_taxOfficeId_fkey` FOREIGN KEY (`taxOfficeId`) REFERENCES `taxOffice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_bankId_fkey` FOREIGN KEY (`bankId`) REFERENCES `bank`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `currency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerMeetPlan` ADD CONSTRAINT `customerMeetPlan_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerMeetPlan` ADD CONSTRAINT `customerMeetPlan_visitingPersonnelId_fkey` FOREIGN KEY (`visitingPersonnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerMeetReport` ADD CONSTRAINT `customerMeetReport_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerMeetReport` ADD CONSTRAINT `customerMeetReport_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `competitorReportContent` ADD CONSTRAINT `competitorReportContent_competitorReportId_fkey` FOREIGN KEY (`competitorReportId`) REFERENCES `competitorReport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `competitorReportContent` ADD CONSTRAINT `competitorReportContent_competitionReportSubjectId_fkey` FOREIGN KEY (`competitionReportSubjectId`) REFERENCES `competitionReportSubject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerPrice` ADD CONSTRAINT `customerPrice_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerPrice` ADD CONSTRAINT `customerPrice_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerPrice` ADD CONSTRAINT `customerPrice_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `currency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offer` ADD CONSTRAINT `offer_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offer` ADD CONSTRAINT `offer_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offer` ADD CONSTRAINT `offer_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `currency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerComplaint` ADD CONSTRAINT `customerComplaint_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerComplaint` ADD CONSTRAINT `customerComplaint_dealingPersonnelId_fkey` FOREIGN KEY (`dealingPersonnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerComplaint` ADD CONSTRAINT `customerComplaint_evaluatingPersonnelId_fkey` FOREIGN KEY (`evaluatingPersonnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productFeasibilityForm` ADD CONSTRAINT `productFeasibilityForm_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
