/*
  Warnings:

  - You are about to alter the column `additionalTerms` on the `offer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `offer` MODIFY `date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `proformaNo` INTEGER NULL,
    MODIFY `requestDeadline` DATETIME(3) NULL,
    MODIFY `specification` VARCHAR(191) NULL,
    MODIFY `detail` VARCHAR(191) NULL,
    MODIFY `specialRequirement` VARCHAR(191) NULL,
    MODIFY `proformaDetails` VARCHAR(191) NULL,
    MODIFY `packingListNo` INTEGER NULL,
    MODIFY `additionalTerms` JSON NULL,
    MODIFY `conditions` JSON NULL,
    MODIFY `acceptanceDate` DATETIME(3) NULL,
    MODIFY `rejectionDate` DATETIME(3) NULL,
    MODIFY `meetNote` VARCHAR(191) NULL,
    MODIFY `lastMeetDate` DATETIME(3) NULL,
    MODIFY `meetStatement` VARCHAR(191) NULL;
