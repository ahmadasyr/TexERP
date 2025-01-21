-- AlterTable
ALTER TABLE `purchaseRequest` ADD COLUMN `approvalFromPurchasing` BOOLEAN NULL,
    ADD COLUMN `approvalFromPurchasingDate` DATETIME(3) NULL;
