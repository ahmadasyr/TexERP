-- AlterTable
ALTER TABLE `orderItem` MODIFY `itemType` ENUM('PRE_CUT', 'RAW_PRE_QUALITY', 'RAW_QUALITY', 'DYE_HOUSE', 'DYE_PRE_QUALITY', 'DYE_QUALITY', 'OUTSOURCING', 'LAMINATED_PRE_QUALITY', 'LAMINATED_QUALITY', 'COVER_QUALITY') NOT NULL;

-- AlterTable
ALTER TABLE `reportIssue` ADD COLUMN `closedDate` DATETIME(3) NULL,
    ADD COLUMN `response` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `stock` MODIFY `status` ENUM('PRE_CUT', 'RAW_PRE_QUALITY', 'RAW_QUALITY', 'DYE_HOUSE', 'DYE_PRE_QUALITY', 'DYE_QUALITY', 'OUTSOURCING', 'LAMINATED_PRE_QUALITY', 'LAMINATED_QUALITY', 'COVER_QUALITY') NOT NULL;
