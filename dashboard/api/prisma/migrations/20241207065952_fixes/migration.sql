/*
  Warnings:

  - You are about to drop the column `details` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `productGroupId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `productGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_productGroupId_fkey`;

-- AlterTable
ALTER TABLE `customerMeetPlan` ADD COLUMN `sampleExpense` DOUBLE NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `details`,
    DROP COLUMN `productGroupId`,
    ADD COLUMN `fine` INTEGER NULL,
    ADD COLUMN `ham` INTEGER NULL,
    ADD COLUMN `maxGrA` INTEGER NULL,
    ADD COLUMN `maxGrB` INTEGER NULL,
    ADD COLUMN `mayA` INTEGER NULL,
    ADD COLUMN `mayB` INTEGER NULL,
    ADD COLUMN `minGrA` INTEGER NULL,
    ADD COLUMN `minGrB` INTEGER NULL;

-- DropTable
DROP TABLE `productGroup`;

-- CreateTable
CREATE TABLE `productWrap` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `wrapTypeId` INTEGER NOT NULL,
    `salimMeter` DOUBLE NOT NULL,
    `side` ENUM('HavA', 'HavB', 'ZeminA', 'ZeminB', 'FranceA', 'FranceB') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productPrice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `currencyId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `unit` ENUM('m', 'kg') NOT NULL,
    `personnelId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `productWrap` ADD CONSTRAINT `productWrap_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productWrap` ADD CONSTRAINT `productWrap_wrapTypeId_fkey` FOREIGN KEY (`wrapTypeId`) REFERENCES `wrapType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productPrice` ADD CONSTRAINT `productPrice_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productPrice` ADD CONSTRAINT `productPrice_currencyId_fkey` FOREIGN KEY (`currencyId`) REFERENCES `currency`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productPrice` ADD CONSTRAINT `productPrice_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
