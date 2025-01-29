-- CreateTable
CREATE TABLE `stockSpecifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stockId` INTEGER NOT NULL,
    `outsourceId` INTEGER NOT NULL,

    UNIQUE INDEX `stockSpecifications_stockId_outsourceId_key`(`stockId`, `outsourceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `stockSpecifications` ADD CONSTRAINT `stockSpecifications_stockId_fkey` FOREIGN KEY (`stockId`) REFERENCES `stock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stockSpecifications` ADD CONSTRAINT `stockSpecifications_outsourceId_fkey` FOREIGN KEY (`outsourceId`) REFERENCES `outsourceType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
