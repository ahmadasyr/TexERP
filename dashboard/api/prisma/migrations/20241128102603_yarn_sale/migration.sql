-- CreateTable
CREATE TABLE `yarnOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `accountId` INTEGER NOT NULL,
    `sale` BOOLEAN NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `yarnOrderItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `yarnOrderId` INTEGER NOT NULL,
    `yarnTypeId` INTEGER NOT NULL,
    `kg` DOUBLE NOT NULL,
    `price` DOUBLE NOT NULL,
    `currencyId` INTEGER NOT NULL,
    `personnelId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `yarnOrderShippment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `yarnOrderId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sentDate` DATETIME(3) NOT NULL,
    `closed` BOOLEAN NOT NULL DEFAULT false,
    `shippingCompanyId` INTEGER NULL,
    `shippingCarrierId` INTEGER NULL,
    `shippingCarId` INTEGER NULL,
    `personnelId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `yarnOrderShippmentItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `personnelId` INTEGER NOT NULL,
    `yarnOrderShippmentId` INTEGER NOT NULL,
    `yarnOrderItemId` INTEGER NOT NULL,
    `sentKg` DOUBLE NOT NULL,
    `sentCount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `yarnOrderItem` ADD CONSTRAINT `yarnOrderItem_yarnOrderId_fkey` FOREIGN KEY (`yarnOrderId`) REFERENCES `yarnOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrderItem` ADD CONSTRAINT `yarnOrderItem_yarnTypeId_fkey` FOREIGN KEY (`yarnTypeId`) REFERENCES `yarnType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrderItem` ADD CONSTRAINT `yarnOrderItem_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `currency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrderItem` ADD CONSTRAINT `yarnOrderItem_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrderShippment` ADD CONSTRAINT `yarnOrderShippment_yarnOrderId_fkey` FOREIGN KEY (`yarnOrderId`) REFERENCES `yarnOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrderShippment` ADD CONSTRAINT `yarnOrderShippment_shippingCompanyId_fkey` FOREIGN KEY (`shippingCompanyId`) REFERENCES `shippingCompany`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrderShippment` ADD CONSTRAINT `yarnOrderShippment_shippingCarrierId_fkey` FOREIGN KEY (`shippingCarrierId`) REFERENCES `shippingCarrier`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrderShippment` ADD CONSTRAINT `yarnOrderShippment_shippingCarId_fkey` FOREIGN KEY (`shippingCarId`) REFERENCES `shippingCar`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrderShippment` ADD CONSTRAINT `yarnOrderShippment_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrderShippmentItem` ADD CONSTRAINT `yarnOrderShippmentItem_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrderShippmentItem` ADD CONSTRAINT `yarnOrderShippmentItem_yarnOrderShippmentId_fkey` FOREIGN KEY (`yarnOrderShippmentId`) REFERENCES `yarnOrderShippment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `yarnOrderShippmentItem` ADD CONSTRAINT `yarnOrderShippmentItem_yarnOrderItemId_fkey` FOREIGN KEY (`yarnOrderItemId`) REFERENCES `yarnOrderItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
