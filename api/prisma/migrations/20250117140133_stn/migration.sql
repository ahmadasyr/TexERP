-- AlterTable
ALTER TABLE `personnel` ADD COLUMN `supervisorId` INTEGER NULL,
    MODIFY `department` ENUM('admin', 'yon', 'iys', 'ika', 'kal', 'pln', 'stn', 'sts', 'urt', 'sev', 'dep', 'coz', 'orm', 'dok', 'kalf', 'kes', 'muh') NULL;

-- CreateTable
CREATE TABLE `reportIssue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `personnelId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` ENUM('Open', 'InProgress', 'Closed') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supplier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `accountId` INTEGER NOT NULL,
    `materials` VARCHAR(191) NOT NULL,
    `foreign` BOOLEAN NOT NULL DEFAULT false,
    `suitable` BOOLEAN NOT NULL DEFAULT false,
    `supplierScore` INTEGER NOT NULL,
    `approved` BOOLEAN NOT NULL DEFAULT false,
    `evaluationDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `entryScore` INTEGER NULL,
    `maxApprovalDate` DATETIME(3) NULL,
    `contractType` VARCHAR(191) NULL,
    `contractDate` DATETIME(3) NULL,
    `contractValidityPeriod` INTEGER NULL,
    `selfPickup` BOOLEAN NOT NULL DEFAULT false,
    `address` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `authorizedPerson` VARCHAR(191) NULL,
    `authorizedPersonPhone` VARCHAR(191) NULL,
    `authorizedPersonEmail` VARCHAR(191) NULL,
    `taxOfficeId` INTEGER NULL,
    `taxNumber` VARCHAR(191) NULL,
    `vade` INTEGER NULL,
    `iso9001Status` BOOLEAN NOT NULL DEFAULT false,
    `iso14001Status` BOOLEAN NOT NULL DEFAULT false,
    `iso45001Status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supplierEvaluation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `supplierId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `personnelId` INTEGER NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `locationScore` INTEGER NOT NULL DEFAULT 0,
    `pricing` VARCHAR(191) NOT NULL,
    `pricingScore` INTEGER NOT NULL DEFAULT 0,
    `payment` VARCHAR(191) NOT NULL,
    `paymentScore` INTEGER NOT NULL DEFAULT 0,
    `packaging` VARCHAR(191) NOT NULL,
    `packagingScore` INTEGER NOT NULL DEFAULT 0,
    `skill` VARCHAR(191) NOT NULL,
    `skillScore` INTEGER NOT NULL DEFAULT 0,
    `financial` VARCHAR(191) NOT NULL,
    `financialScore` INTEGER NOT NULL DEFAULT 0,
    `flexibilityDescription` VARCHAR(191) NOT NULL,
    `flexibilityScore` INTEGER NOT NULL DEFAULT 0,
    `legalRequirements` VARCHAR(191) NOT NULL,
    `legalRequirementsScore` INTEGER NOT NULL DEFAULT 0,
    `afterSalesService` VARCHAR(191) NULL,
    `afterSalesServiceScore` INTEGER NOT NULL DEFAULT 0,
    `qualitySystemDocument` VARCHAR(191) NULL,
    `qualitySystemDocumentScore` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `materialCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `material` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `unit` ENUM('kg', 'metre', 'adet', 'litre', 'paket', 'kutu', 'ton', 'koli') NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `materialPrice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `materialId` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `vade` INTEGER NULL,
    `vatIncluded` BOOLEAN NOT NULL DEFAULT false,
    `currencyId` INTEGER NOT NULL,
    `supplierId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `warehouse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `personnelId` INTEGER NOT NULL,
    `parentWarehouseId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `materialStock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `materialId` INTEGER NOT NULL,
    `warehouseId` INTEGER NULL,
    `amount` DOUBLE NOT NULL,
    `unit` ENUM('kg', 'metre', 'adet', 'litre', 'paket', 'kutu', 'ton', 'koli') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `purchaseOrderItemId` INTEGER NULL,
    `personnelId` INTEGER NOT NULL,
    `movedFromStockId` INTEGER NULL,
    `movedPersonnelId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchaseRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `department` ENUM('admin', 'yon', 'iys', 'ika', 'kal', 'pln', 'stn', 'sts', 'urt', 'sev', 'dep', 'coz', 'orm', 'dok', 'kalf', 'kes', 'muh') NOT NULL,
    `personnelId` INTEGER NOT NULL,
    `approvalFromSupervisor` BOOLEAN NOT NULL DEFAULT false,
    `approvalFromSupervisorDate` DATETIME(3) NOT NULL,
    `approvalFromManagement` BOOLEAN NOT NULL DEFAULT false,
    `approvalFromManagementDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchaseRequestItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `purchaseRequestId` INTEGER NOT NULL,
    `material` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `requestedDate` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchaseOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `personnelId` INTEGER NOT NULL,
    `supplierId` INTEGER NOT NULL,
    `purchaseRequestId` INTEGER NOT NULL,
    `purchaseType` VARCHAR(191) NOT NULL,
    `vade` INTEGER NULL,
    `shippingType` VARCHAR(191) NULL,
    `deadline` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `packagingType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchaseOrderItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `purchaseOrderId` INTEGER NOT NULL,
    `materialId` INTEGER NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `personnelId` INTEGER NOT NULL,
    `unit` ENUM('kg', 'metre', 'adet', 'litre', 'paket', 'kutu', 'ton', 'koli') NOT NULL,
    `pricePerUnit` DOUBLE NOT NULL,
    `currencyId` INTEGER NOT NULL,
    `vat` DOUBLE NOT NULL,
    `packagingTypeId` INTEGER NULL,
    `specification` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchaseOrderReturn` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchaseOrderReturnItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchaseDelivery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `purchaseOrderId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `personnelId` INTEGER NOT NULL,
    `deliveryNo` VARCHAR(191) NULL,
    `freightType` VARCHAR(191) NULL,
    `deliveryType` VARCHAR(191) NULL,
    `CarId` INTEGER NULL,
    `shippingCarrierId` INTEGER NULL,
    `shippingCompanyId` INTEGER NULL,
    `km` INTEGER NULL,
    `kmPrice` DOUBLE NULL,
    `cost` DOUBLE NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchaseDeliveryItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `purchaseDeliveryId` INTEGER NOT NULL,
    `purchaseOrderItemId` INTEGER NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `personnelId` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `personnel` ADD CONSTRAINT `personnel_supervisorId_fkey` FOREIGN KEY (`supervisorId`) REFERENCES `personnel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reportIssue` ADD CONSTRAINT `reportIssue_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier` ADD CONSTRAINT `supplier_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier` ADD CONSTRAINT `supplier_taxOfficeId_fkey` FOREIGN KEY (`taxOfficeId`) REFERENCES `taxOffice`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplierEvaluation` ADD CONSTRAINT `supplierEvaluation_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `supplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplierEvaluation` ADD CONSTRAINT `supplierEvaluation_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `material` ADD CONSTRAINT `material_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `materialCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materialPrice` ADD CONSTRAINT `materialPrice_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `material`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materialPrice` ADD CONSTRAINT `materialPrice_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `currency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materialPrice` ADD CONSTRAINT `materialPrice_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `supplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `warehouse` ADD CONSTRAINT `warehouse_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `warehouse` ADD CONSTRAINT `warehouse_parentWarehouseId_fkey` FOREIGN KEY (`parentWarehouseId`) REFERENCES `warehouse`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materialStock` ADD CONSTRAINT `materialStock_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `material`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materialStock` ADD CONSTRAINT `materialStock_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `warehouse`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materialStock` ADD CONSTRAINT `materialStock_purchaseOrderItemId_fkey` FOREIGN KEY (`purchaseOrderItemId`) REFERENCES `purchaseOrderItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materialStock` ADD CONSTRAINT `materialStock_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materialStock` ADD CONSTRAINT `materialStock_movedFromStockId_fkey` FOREIGN KEY (`movedFromStockId`) REFERENCES `materialStock`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materialStock` ADD CONSTRAINT `materialStock_movedPersonnelId_fkey` FOREIGN KEY (`movedPersonnelId`) REFERENCES `personnel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchaseRequest` ADD CONSTRAINT `purchaseRequest_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchaseRequestItem` ADD CONSTRAINT `purchaseRequestItem_purchaseRequestId_fkey` FOREIGN KEY (`purchaseRequestId`) REFERENCES `purchaseRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchaseOrder` ADD CONSTRAINT `purchaseOrder_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchaseOrder` ADD CONSTRAINT `purchaseOrder_purchaseRequestId_fkey` FOREIGN KEY (`purchaseRequestId`) REFERENCES `purchaseRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchaseOrder` ADD CONSTRAINT `purchaseOrder_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `supplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchaseOrderItem` ADD CONSTRAINT `purchaseOrderItem_purchaseOrderId_fkey` FOREIGN KEY (`purchaseOrderId`) REFERENCES `purchaseOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchaseOrderItem` ADD CONSTRAINT `purchaseOrderItem_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `material`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchaseOrderItem` ADD CONSTRAINT `purchaseOrderItem_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchaseOrderItem` ADD CONSTRAINT `purchaseOrderItem_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `currency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchaseOrderItem` ADD CONSTRAINT `purchaseOrderItem_packagingTypeId_fkey` FOREIGN KEY (`packagingTypeId`) REFERENCES `packagingType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchaseDelivery` ADD CONSTRAINT `purchaseDelivery_purchaseOrderId_fkey` FOREIGN KEY (`purchaseOrderId`) REFERENCES `purchaseOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchaseDelivery` ADD CONSTRAINT `purchaseDelivery_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchaseDelivery` ADD CONSTRAINT `purchaseDelivery_shippingCarrierId_fkey` FOREIGN KEY (`shippingCarrierId`) REFERENCES `shippingCarrier`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchaseDelivery` ADD CONSTRAINT `purchaseDelivery_CarId_fkey` FOREIGN KEY (`CarId`) REFERENCES `shippingCar`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchaseDelivery` ADD CONSTRAINT `purchaseDelivery_shippingCompanyId_fkey` FOREIGN KEY (`shippingCompanyId`) REFERENCES `shippingCompany`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchaseDeliveryItem` ADD CONSTRAINT `purchaseDeliveryItem_purchaseDeliveryId_fkey` FOREIGN KEY (`purchaseDeliveryId`) REFERENCES `purchaseDelivery`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchaseDeliveryItem` ADD CONSTRAINT `purchaseDeliveryItem_purchaseOrderItemId_fkey` FOREIGN KEY (`purchaseOrderItemId`) REFERENCES `purchaseOrderItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchaseDeliveryItem` ADD CONSTRAINT `purchaseDeliveryItem_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
