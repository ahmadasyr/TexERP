/*
  Warnings:

  - Added the required column `unit` to the `purchaseRequestItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `purchaseRequest` MODIFY `approvalFromSupervisorDate` DATETIME(3) NULL,
    MODIFY `approvalFromManagementDate` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `purchaseRequestItem` ADD COLUMN `unit` ENUM('kg', 'metre', 'adet', 'litre', 'paket', 'kutu', 'ton', 'koli') NOT NULL;
