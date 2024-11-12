-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `customer_bankId_fkey`;

-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `customer_currencyId_fkey`;

-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `customer_taxOfficeId_fkey`;

-- DropForeignKey
ALTER TABLE `customerComplaint` DROP FOREIGN KEY `customerComplaint_evaluatingPersonnelId_fkey`;

-- DropForeignKey
ALTER TABLE `customerComplaint` DROP FOREIGN KEY `customerComplaint_productId_fkey`;

-- DropForeignKey
ALTER TABLE `customerMeetPlan` DROP FOREIGN KEY `customerMeetPlan_visitingPersonnelId_fkey`;

-- AlterTable
ALTER TABLE `currency` MODIFY `exchangePercent` DOUBLE NULL;

-- AlterTable
ALTER TABLE `customer` MODIFY `relatedPerson` VARCHAR(191) NULL,
    MODIFY `title` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `phoneNumber` VARCHAR(191) NULL,
    MODIFY `firstRegisterDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `returnDate` DATETIME(3) NULL,
    MODIFY `salesOpinion` VARCHAR(191) NULL,
    MODIFY `creditNote` VARCHAR(191) NULL,
    MODIFY `shippingMethod` ENUM('Fabrikadan', 'Depodan', 'Limana', 'EXW', 'FCA', 'CPT', 'CIP', 'DAT', 'DAP', 'DDP', 'FAS', 'FOB', 'CFR', 'CIF') NULL,
    MODIFY `meterLimit` DOUBLE NULL,
    MODIFY `address` VARCHAR(191) NULL,
    MODIFY `taxOfficeId` INTEGER NULL,
    MODIFY `taxNumber` VARCHAR(191) NULL,
    MODIFY `paymentKind` VARCHAR(191) NULL,
    MODIFY `note` VARCHAR(191) NULL,
    MODIFY `bankId` INTEGER NULL,
    MODIFY `currencyId` INTEGER NULL,
    MODIFY `iban` VARCHAR(191) NULL,
    MODIFY `swift` VARCHAR(191) NULL,
    MODIFY `firstOfferDate` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `customerComplaint` MODIFY `date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `productId` INTEGER NULL,
    MODIFY `packagingDate` DATETIME(3) NULL,
    MODIFY `evaluatingPersonnelId` INTEGER NULL,
    MODIFY `actionTaken` VARCHAR(191) NULL,
    MODIFY `dofNo` INTEGER NULL,
    MODIFY `result` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `customerMeetPlan` MODIFY `realDate` DATETIME(3) NULL,
    MODIFY `visitingPersonnelId` INTEGER NULL,
    MODIFY `result` VARCHAR(191) NULL,
    MODIFY `accuracyRate` DOUBLE NULL,
    MODIFY `note` VARCHAR(191) NULL,
    MODIFY `travelExpense` DOUBLE NULL,
    MODIFY `accommodationExpense` DOUBLE NULL,
    MODIFY `foodExpense` DOUBLE NULL,
    MODIFY `giftExpense` DOUBLE NULL,
    MODIFY `officeExpense` DOUBLE NULL;

-- AlterTable
ALTER TABLE `customerMeetReport` MODIFY `customerNote` VARCHAR(191) NULL,
    MODIFY `responseToCustomer` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `customerPrice` MODIFY `date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_taxOfficeId_fkey` FOREIGN KEY (`taxOfficeId`) REFERENCES `taxOffice`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_bankId_fkey` FOREIGN KEY (`bankId`) REFERENCES `bank`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `currency`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerMeetPlan` ADD CONSTRAINT `customerMeetPlan_visitingPersonnelId_fkey` FOREIGN KEY (`visitingPersonnelId`) REFERENCES `personnel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerComplaint` ADD CONSTRAINT `customerComplaint_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerComplaint` ADD CONSTRAINT `customerComplaint_evaluatingPersonnelId_fkey` FOREIGN KEY (`evaluatingPersonnelId`) REFERENCES `personnel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
