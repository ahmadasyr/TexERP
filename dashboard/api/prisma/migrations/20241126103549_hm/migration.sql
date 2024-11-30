-- CreateTable
CREATE TABLE `personnel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(50) NULL,
    `lastName` VARCHAR(50) NULL,
    `position` VARCHAR(50) NULL,
    `department` VARCHAR(50) NULL,
    `dateOfHire` DATETIME(3) NULL,
    `email` VARCHAR(100) NULL,
    `phone` VARCHAR(15) NULL,
    `handleComplaints` BOOLEAN NULL,
    `handleSales` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `exchangePercent` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `foreign` BOOLEAN NOT NULL,
    `relatedPerson` VARCHAR(191) NULL,
    `title` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `firstOfferDate` DATETIME(3) NULL,
    `personnelId` INTEGER NOT NULL,
    `firstRegisterDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL,
    `returnDate` DATETIME(3) NULL,
    `salesOpinion` VARCHAR(191) NULL,
    `creditNote` VARCHAR(191) NULL,
    `shippingMethod` ENUM('Fabrikadan', 'Depodan', 'Limana', 'EXW', 'FCA', 'CPT', 'CIP', 'DAT', 'DAP', 'DDP', 'FAS', 'FOB', 'CFR', 'CIF') NULL,
    `meterLimit` DOUBLE NULL,
    `address` VARCHAR(191) NULL,
    `city` VARCHAR(191) NOT NULL,
    `taxOfficeId` INTEGER NULL,
    `taxNumber` VARCHAR(191) NULL,
    `paymentKind` VARCHAR(191) NULL,
    `note` VARCHAR(191) NULL,
    `bankId` INTEGER NULL,
    `currencyId` INTEGER NULL,
    `iban` VARCHAR(191) NULL,
    `swift` VARCHAR(191) NULL,
    `accountId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `competitor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customerMeetPlan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `visitReason` VARCHAR(191) NOT NULL,
    `plannedDate` DATETIME(3) NOT NULL,
    `realDate` DATETIME(3) NULL,
    `visitingPersonnelId` INTEGER NULL,
    `result` VARCHAR(191) NULL,
    `accuracyRate` DOUBLE NULL,
    `note` VARCHAR(191) NULL,
    `travelExpense` DOUBLE NULL,
    `accommodationExpense` DOUBLE NULL,
    `foodExpense` DOUBLE NULL,
    `giftExpense` DOUBLE NULL,
    `officeExpense` DOUBLE NULL,

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
    `customerNote` VARCHAR(191) NULL,
    `responseToCustomer` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `competitorReport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `competitorId` INTEGER NOT NULL,
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
    `date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
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
    `date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `proformaNo` INTEGER NULL,
    `requestNo` INTEGER NOT NULL,
    `requestDate` DATETIME(3) NOT NULL,
    `requestDeadline` DATETIME(3) NULL,
    `requestBudget` DOUBLE NOT NULL,
    `productId` INTEGER NOT NULL,
    `specification` VARCHAR(191) NULL,
    `detail` VARCHAR(191) NULL,
    `quantity` DOUBLE NOT NULL,
    `unit` ENUM('m', 'kg') NOT NULL,
    `price` DOUBLE NOT NULL,
    `currencyId` INTEGER NOT NULL,
    `vat` DOUBLE NOT NULL,
    `total` DOUBLE NOT NULL,
    `maturity` INTEGER NOT NULL,
    `daysDue` INTEGER NOT NULL,
    `deadlineDate` DATETIME(3) NOT NULL,
    `specialRequirement` VARCHAR(191) NULL,
    `deliveryAddress` VARCHAR(191) NOT NULL,
    `shippingMethod` ENUM('Fabrikadan', 'Depodan', 'Limana', 'EXW', 'FCA', 'CPT', 'CIP', 'DAT', 'DAP', 'DDP', 'FAS', 'FOB', 'CFR', 'CIF') NOT NULL,
    `proformaDetails` VARCHAR(191) NULL,
    `packingListNo` INTEGER NULL,
    `additionalTerms` JSON NULL,
    `validPeriod` INTEGER NOT NULL,
    `validPeriodType` VARCHAR(191) NOT NULL,
    `conditions` JSON NULL,
    `lastValidityDate` DATETIME(3) NOT NULL,
    `acceptanceDate` DATETIME(3) NULL,
    `rejectionDate` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL,
    `meetNote` VARCHAR(191) NULL,
    `lastMeetDate` DATETIME(3) NULL,
    `meetStatement` VARCHAR(191) NULL,
    `totalKDV` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customerComplaint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `subject` VARCHAR(191) NOT NULL,
    `customerId` INTEGER NOT NULL,
    `productId` INTEGER NULL,
    `packagingDate` DATETIME(3) NULL,
    `complaintDetails` VARCHAR(191) NOT NULL,
    `dealingPersonnelId` INTEGER NOT NULL,
    `dealingDate` DATETIME(3) NOT NULL,
    `evaluatingPersonnelId` INTEGER NULL,
    `actionTaken` VARCHAR(191) NULL,
    `dofNo` INTEGER NULL,
    `result` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productFeasibilityForm` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `attendees` JSON NULL,
    `productName` VARCHAR(191) NOT NULL,
    `customerId` INTEGER NOT NULL,
    `yearlyProductionCount` INTEGER NULL,
    `startDateGoal` DATETIME(3) NULL,
    `productPriceGoal` DOUBLE NOT NULL,
    `marketReady` BOOLEAN NULL,
    `demandReady` BOOLEAN NULL,
    `legalReady` BOOLEAN NULL,
    `testReady` BOOLEAN NULL,
    `productionReady` BOOLEAN NULL,
    `measurementReady` BOOLEAN NULL,
    `rawMaterialCost` DOUBLE NULL,
    `productionCost` DOUBLE NULL,
    `process` JSON NULL,
    `material` JSON NULL,
    `auxEquipment` JSON NULL,
    `machine` JSON NULL,
    `costs` JSON NULL,
    `cost` DOUBLE NULL,
    `customerBudget` DOUBLE NULL,
    `priceDifferencePercent` DOUBLE NULL,
    `suitable` BOOLEAN NULL,
    `costsCovered` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `debit` DOUBLE NOT NULL,
    `credit` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `accountTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accountType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `productGroupId` INTEGER NOT NULL,
    `details` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `yarnType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `yarnStockEntry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `yarnTypeId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `netKg` DOUBLE NOT NULL,
    `count` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `machineType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `machine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `machineTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wrapGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wrapType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `wrapGroupId` INTEGER NULL,
    `stringCount` INTEGER NOT NULL,
    `en` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wrapOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wrapTypeId` INTEGER NOT NULL,
    `yarnTypeId` INTEGER NOT NULL,
    `yarnLot` VARCHAR(191) NOT NULL,
    `wrapMeter` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `startDate` DATETIME(3) NOT NULL,
    `machineId` INTEGER NOT NULL,
    `status` ENUM('Tamamlandi', 'Uretimde', 'Beklemede') NOT NULL,
    `personnelId` INTEGER NOT NULL,
    `requiredKg` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wrapStock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wrapOrderId` INTEGER NOT NULL,
    `meter` DOUBLE NOT NULL,
    `exitDate` DATETIME(3) NULL,
    `productionOrderId` INTEGER NULL,
    `loopCount` INTEGER NOT NULL,
    `status` ENUM('Depoda', 'Kullanildi') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productionOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `startDate` DATETIME(3) NULL,
    `machineId` INTEGER NOT NULL,
    `status` ENUM('Tamamlandi', 'Uretimde', 'Beklemede') NOT NULL,
    `productId` INTEGER NOT NULL,
    `lot` VARCHAR(191) NOT NULL,
    `meter` DOUBLE NOT NULL,
    `personnelId` INTEGER NOT NULL,
    `note` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productionOrderWrap` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productionOrderId` INTEGER NOT NULL,
    `wrapStockId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cutStock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `productId` INTEGER NOT NULL,
    `lot` VARCHAR(191) NOT NULL,
    `productionOrderId` INTEGER NOT NULL,
    `meter` DOUBLE NOT NULL,
    `kg` DOUBLE NOT NULL,
    `status` ENUM('Depoda', 'Kesildi') NOT NULL,
    `exitDate` DATETIME(3) NULL,
    `shelf` VARCHAR(191) NULL,
    `counted` BOOLEAN NULL,
    `countDate` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rawQualityControlStock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cutStockId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `lot` VARCHAR(191) NOT NULL,
    `yon` BOOLEAN NOT NULL,
    `meter` DOUBLE NOT NULL,
    `kg` DOUBLE NOT NULL,
    `shelf` VARCHAR(191) NULL,
    `status` ENUM('Depoda', 'Kesildi') NOT NULL,
    `counted` BOOLEAN NULL,
    `countDate` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rawStock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `barcode` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `productId` INTEGER NOT NULL,
    `yon` BOOLEAN NOT NULL,
    `lot` VARCHAR(191) NOT NULL,
    `rawQualityControlStockId` INTEGER NOT NULL,
    `status` ENUM('Depoda', 'CikisYapildi') NOT NULL,
    `counted` BOOLEAN NULL,
    `countDate` DATETIME(3) NULL,
    `meter` DOUBLE NOT NULL,
    `kg` DOUBLE NOT NULL,
    `quality` INTEGER NOT NULL,
    `qualityNote` VARCHAR(191) NULL,
    `shelf` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dyeType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dyeColor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dyeOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `accountId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `personnelId` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `closed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dyeOrderItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dyeOrderId` INTEGER NOT NULL,
    `dyeColorId` INTEGER NOT NULL,
    `dyeTypeId` INTEGER NOT NULL,
    `lot` VARCHAR(191) NOT NULL,
    `yon` BOOLEAN NOT NULL,
    `unitPrice` DOUBLE NULL,
    `currencyId` INTEGER NULL,
    `unit` ENUM('m', 'kg') NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `kazanNo` VARCHAR(191) NOT NULL,
    `sentCount` INTEGER NOT NULL,
    `sentMeter` DOUBLE NOT NULL,
    `sentKg` DOUBLE NOT NULL,
    `returnCount` INTEGER NOT NULL,
    `returnMeter` DOUBLE NOT NULL,
    `returnKg` DOUBLE NOT NULL,
    `note` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dyeShipment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dyeOrderId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sentDate` DATETIME(3) NOT NULL,
    `closed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dyeShipmentItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dyeShipmentId` INTEGER NOT NULL,
    `rawStockId` INTEGER NOT NULL,
    `personnelId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dyeReturnStock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dyeOrderItemId` INTEGER NOT NULL,
    `shippingNo` VARCHAR(191) NOT NULL,
    `kazanNo` VARCHAR(191) NOT NULL,
    `productId` INTEGER NOT NULL,
    `dyeColorId` INTEGER NOT NULL,
    `dyeTypeId` INTEGER NOT NULL,
    `lot` VARCHAR(191) NOT NULL,
    `yon` BOOLEAN NOT NULL,
    `count` INTEGER NOT NULL,
    `meter` DOUBLE NOT NULL,
    `kg` DOUBLE NOT NULL,
    `status` ENUM('Depoda', 'CikisYapildi') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dyeStock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `productId` INTEGER NOT NULL,
    `dyeColorId` INTEGER NOT NULL,
    `lot` VARCHAR(191) NOT NULL,
    `meter` DOUBLE NOT NULL,
    `kg` DOUBLE NOT NULL,
    `status` ENUM('Depoda', 'CikisYapildi') NOT NULL,
    `counted` BOOLEAN NULL,
    `countDate` DATETIME(3) NULL,
    `quality` INTEGER NOT NULL,
    `qualityNote` VARCHAR(191) NULL,
    `shelf` VARCHAR(191) NULL,
    `outsourceTypeId` INTEGER NULL,
    `laminationColorId` INTEGER NULL,
    `note` VARCHAR(191) NULL,
    `barcode` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `outsourceType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `outsourceOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `outsourceTypeId` INTEGER NOT NULL,
    `accountId` INTEGER NOT NULL,
    `note` VARCHAR(191) NOT NULL,
    `closed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `laminationColor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `outsourceOrderItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `outsourceOrderId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `dyeColorId` INTEGER NOT NULL,
    `laminationColorId` INTEGER NOT NULL,
    `lot` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `unit` ENUM('m', 'kg') NOT NULL,
    `sentMeter` DOUBLE NOT NULL,
    `sentKg` DOUBLE NOT NULL,
    `sentCount` INTEGER NOT NULL,
    `returnMeter` DOUBLE NOT NULL,
    `returnKg` DOUBLE NOT NULL,
    `returnCount` INTEGER NOT NULL,
    `open` BOOLEAN NOT NULL DEFAULT true,
    `note` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `outsourceShipment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `outsourceOrderId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sentDate` DATETIME(3) NOT NULL,
    `closed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `outsourceShipmentItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `outsourceShipmentId` INTEGER NOT NULL,
    `dyeStockId` INTEGER NOT NULL,
    `personnelId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `outsourceReturnStock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `productId` INTEGER NOT NULL,
    `dyeColorId` INTEGER NOT NULL,
    `outsourceItemId` INTEGER NOT NULL,
    `shippingNo` VARCHAR(191) NOT NULL,
    `lot` VARCHAR(191) NOT NULL,
    `shelf` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL,
    `counted` BOOLEAN NULL,
    `countDate` DATETIME(3) NULL,
    `meter` DOUBLE NOT NULL,
    `kg` DOUBLE NOT NULL,
    `status` ENUM('Depoda', 'CikisYapildi') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `type` VARCHAR(191) NOT NULL,
    `accountId` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `personnelId` INTEGER NOT NULL,
    `closed` BOOLEAN NOT NULL DEFAULT false,
    `customerId` INTEGER NULL,
    `productId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orderItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `dyeColorId` INTEGER NULL,
    `lot` VARCHAR(191) NOT NULL,
    `outsourceTypeId` INTEGER NULL,
    `laminationColorId` INTEGER NULL,
    `quantity` DOUBLE NOT NULL,
    `unit` ENUM('m', 'kg') NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `sentMeter` DOUBLE NOT NULL DEFAULT 0,
    `sentKg` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shippingCompany` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shippingCarrier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shippingCompanyId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `identityNo` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `note` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shippingCar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shippingCompanyId` INTEGER NOT NULL,
    `plate` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orderShipment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sentDate` DATETIME(3) NULL,
    `shippingCompanyId` INTEGER NULL,
    `shippingCarrierId` INTEGER NULL,
    `shippingCarId` INTEGER NULL,
    `closed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orderShipmentItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderShipmentId` INTEGER NOT NULL,
    `orderItemId` INTEGER NOT NULL,
    `personnelId` INTEGER NOT NULL,
    `orderedQuantity` DOUBLE NOT NULL,
    `unit` ENUM('m', 'kg') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orderShipmentConfirmation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderShipmentItemId` INTEGER NOT NULL,
    `personnelId` INTEGER NOT NULL,
    `sentMeter` DOUBLE NOT NULL,
    `sentKg` DOUBLE NOT NULL,
    `lot` VARCHAR(191) NOT NULL,
    `barcode` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_taxOfficeId_fkey` FOREIGN KEY (`taxOfficeId`) REFERENCES `taxOffice`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_bankId_fkey` FOREIGN KEY (`bankId`) REFERENCES `bank`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `currency`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerMeetPlan` ADD CONSTRAINT `customerMeetPlan_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerMeetPlan` ADD CONSTRAINT `customerMeetPlan_visitingPersonnelId_fkey` FOREIGN KEY (`visitingPersonnelId`) REFERENCES `personnel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerMeetReport` ADD CONSTRAINT `customerMeetReport_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerMeetReport` ADD CONSTRAINT `customerMeetReport_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `competitorReport` ADD CONSTRAINT `competitorReport_competitorId_fkey` FOREIGN KEY (`competitorId`) REFERENCES `competitor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE `customerComplaint` ADD CONSTRAINT `customerComplaint_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerComplaint` ADD CONSTRAINT `customerComplaint_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerComplaint` ADD CONSTRAINT `customerComplaint_dealingPersonnelId_fkey` FOREIGN KEY (`dealingPersonnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerComplaint` ADD CONSTRAINT `customerComplaint_evaluatingPersonnelId_fkey` FOREIGN KEY (`evaluatingPersonnelId`) REFERENCES `personnel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productFeasibilityForm` ADD CONSTRAINT `productFeasibilityForm_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_accountTypeId_fkey` FOREIGN KEY (`accountTypeId`) REFERENCES `accountType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_productGroupId_fkey` FOREIGN KEY (`productGroupId`) REFERENCES `productGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnStockEntry` ADD CONSTRAINT `yarnStockEntry_yarnTypeId_fkey` FOREIGN KEY (`yarnTypeId`) REFERENCES `yarnType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `machine` ADD CONSTRAINT `machine_machineTypeId_fkey` FOREIGN KEY (`machineTypeId`) REFERENCES `machineType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wrapType` ADD CONSTRAINT `wrapType_wrapGroupId_fkey` FOREIGN KEY (`wrapGroupId`) REFERENCES `wrapGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wrapOrder` ADD CONSTRAINT `wrapOrder_wrapTypeId_fkey` FOREIGN KEY (`wrapTypeId`) REFERENCES `wrapType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wrapOrder` ADD CONSTRAINT `wrapOrder_yarnTypeId_fkey` FOREIGN KEY (`yarnTypeId`) REFERENCES `yarnType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wrapOrder` ADD CONSTRAINT `wrapOrder_machineId_fkey` FOREIGN KEY (`machineId`) REFERENCES `machine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wrapOrder` ADD CONSTRAINT `wrapOrder_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wrapStock` ADD CONSTRAINT `wrapStock_wrapOrderId_fkey` FOREIGN KEY (`wrapOrderId`) REFERENCES `wrapOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wrapStock` ADD CONSTRAINT `wrapStock_productionOrderId_fkey` FOREIGN KEY (`productionOrderId`) REFERENCES `productionOrder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productionOrder` ADD CONSTRAINT `productionOrder_machineId_fkey` FOREIGN KEY (`machineId`) REFERENCES `machine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productionOrder` ADD CONSTRAINT `productionOrder_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productionOrder` ADD CONSTRAINT `productionOrder_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productionOrderWrap` ADD CONSTRAINT `productionOrderWrap_productionOrderId_fkey` FOREIGN KEY (`productionOrderId`) REFERENCES `productionOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productionOrderWrap` ADD CONSTRAINT `productionOrderWrap_wrapStockId_fkey` FOREIGN KEY (`wrapStockId`) REFERENCES `wrapStock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cutStock` ADD CONSTRAINT `cutStock_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cutStock` ADD CONSTRAINT `cutStock_productionOrderId_fkey` FOREIGN KEY (`productionOrderId`) REFERENCES `productionOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rawQualityControlStock` ADD CONSTRAINT `rawQualityControlStock_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rawQualityControlStock` ADD CONSTRAINT `rawQualityControlStock_cutStockId_fkey` FOREIGN KEY (`cutStockId`) REFERENCES `cutStock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rawStock` ADD CONSTRAINT `rawStock_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rawStock` ADD CONSTRAINT `rawStock_rawQualityControlStockId_fkey` FOREIGN KEY (`rawQualityControlStockId`) REFERENCES `rawQualityControlStock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeOrder` ADD CONSTRAINT `dyeOrder_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeOrder` ADD CONSTRAINT `dyeOrder_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeOrder` ADD CONSTRAINT `dyeOrder_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeOrderItem` ADD CONSTRAINT `dyeOrderItem_dyeOrderId_fkey` FOREIGN KEY (`dyeOrderId`) REFERENCES `dyeOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeOrderItem` ADD CONSTRAINT `dyeOrderItem_dyeColorId_fkey` FOREIGN KEY (`dyeColorId`) REFERENCES `dyeColor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeOrderItem` ADD CONSTRAINT `dyeOrderItem_dyeTypeId_fkey` FOREIGN KEY (`dyeTypeId`) REFERENCES `dyeType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeOrderItem` ADD CONSTRAINT `dyeOrderItem_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `currency`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeShipment` ADD CONSTRAINT `dyeShipment_dyeOrderId_fkey` FOREIGN KEY (`dyeOrderId`) REFERENCES `dyeOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeShipmentItem` ADD CONSTRAINT `dyeShipmentItem_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeShipmentItem` ADD CONSTRAINT `dyeShipmentItem_dyeShipmentId_fkey` FOREIGN KEY (`dyeShipmentId`) REFERENCES `dyeShipment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeShipmentItem` ADD CONSTRAINT `dyeShipmentItem_rawStockId_fkey` FOREIGN KEY (`rawStockId`) REFERENCES `rawStock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeReturnStock` ADD CONSTRAINT `dyeReturnStock_dyeOrderItemId_fkey` FOREIGN KEY (`dyeOrderItemId`) REFERENCES `dyeOrderItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeReturnStock` ADD CONSTRAINT `dyeReturnStock_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeReturnStock` ADD CONSTRAINT `dyeReturnStock_dyeColorId_fkey` FOREIGN KEY (`dyeColorId`) REFERENCES `dyeColor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeReturnStock` ADD CONSTRAINT `dyeReturnStock_dyeTypeId_fkey` FOREIGN KEY (`dyeTypeId`) REFERENCES `dyeType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeStock` ADD CONSTRAINT `dyeStock_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeStock` ADD CONSTRAINT `dyeStock_dyeColorId_fkey` FOREIGN KEY (`dyeColorId`) REFERENCES `dyeColor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeStock` ADD CONSTRAINT `dyeStock_outsourceTypeId_fkey` FOREIGN KEY (`outsourceTypeId`) REFERENCES `outsourceType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeStock` ADD CONSTRAINT `dyeStock_laminationColorId_fkey` FOREIGN KEY (`laminationColorId`) REFERENCES `laminationColor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceOrder` ADD CONSTRAINT `outsourceOrder_outsourceTypeId_fkey` FOREIGN KEY (`outsourceTypeId`) REFERENCES `outsourceType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceOrder` ADD CONSTRAINT `outsourceOrder_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceOrderItem` ADD CONSTRAINT `outsourceOrderItem_outsourceOrderId_fkey` FOREIGN KEY (`outsourceOrderId`) REFERENCES `outsourceOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceOrderItem` ADD CONSTRAINT `outsourceOrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceShipment` ADD CONSTRAINT `outsourceShipment_outsourceOrderId_fkey` FOREIGN KEY (`outsourceOrderId`) REFERENCES `outsourceOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceShipmentItem` ADD CONSTRAINT `outsourceShipmentItem_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceShipmentItem` ADD CONSTRAINT `outsourceShipmentItem_dyeStockId_fkey` FOREIGN KEY (`dyeStockId`) REFERENCES `dyeStock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceShipmentItem` ADD CONSTRAINT `outsourceShipmentItem_outsourceShipmentId_fkey` FOREIGN KEY (`outsourceShipmentId`) REFERENCES `outsourceShipment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceReturnStock` ADD CONSTRAINT `outsourceReturnStock_outsourceItemId_fkey` FOREIGN KEY (`outsourceItemId`) REFERENCES `outsourceOrderItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceReturnStock` ADD CONSTRAINT `outsourceReturnStock_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `outsourceReturnStock` ADD CONSTRAINT `outsourceReturnStock_dyeColorId_fkey` FOREIGN KEY (`dyeColorId`) REFERENCES `dyeColor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderItem` ADD CONSTRAINT `orderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderItem` ADD CONSTRAINT `orderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderItem` ADD CONSTRAINT `orderItem_dyeColorId_fkey` FOREIGN KEY (`dyeColorId`) REFERENCES `dyeColor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderItem` ADD CONSTRAINT `orderItem_laminationColorId_fkey` FOREIGN KEY (`laminationColorId`) REFERENCES `laminationColor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderItem` ADD CONSTRAINT `orderItem_outsourceTypeId_fkey` FOREIGN KEY (`outsourceTypeId`) REFERENCES `outsourceType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shippingCarrier` ADD CONSTRAINT `shippingCarrier_shippingCompanyId_fkey` FOREIGN KEY (`shippingCompanyId`) REFERENCES `shippingCompany`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shippingCar` ADD CONSTRAINT `shippingCar_shippingCompanyId_fkey` FOREIGN KEY (`shippingCompanyId`) REFERENCES `shippingCompany`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderShipment` ADD CONSTRAINT `orderShipment_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderShipment` ADD CONSTRAINT `orderShipment_shippingCompanyId_fkey` FOREIGN KEY (`shippingCompanyId`) REFERENCES `shippingCompany`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderShipment` ADD CONSTRAINT `orderShipment_shippingCarrierId_fkey` FOREIGN KEY (`shippingCarrierId`) REFERENCES `shippingCarrier`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderShipment` ADD CONSTRAINT `orderShipment_shippingCarId_fkey` FOREIGN KEY (`shippingCarId`) REFERENCES `shippingCar`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderShipmentItem` ADD CONSTRAINT `orderShipmentItem_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderShipmentItem` ADD CONSTRAINT `orderShipmentItem_orderShipmentId_fkey` FOREIGN KEY (`orderShipmentId`) REFERENCES `orderShipment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderShipmentItem` ADD CONSTRAINT `orderShipmentItem_orderItemId_fkey` FOREIGN KEY (`orderItemId`) REFERENCES `orderItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderShipmentConfirmation` ADD CONSTRAINT `orderShipmentConfirmation_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderShipmentConfirmation` ADD CONSTRAINT `orderShipmentConfirmation_orderShipmentItemId_fkey` FOREIGN KEY (`orderShipmentItemId`) REFERENCES `orderShipmentItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
