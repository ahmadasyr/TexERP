/*
  Warnings:

  - Added the required column `productTypeId` to the `customerPrice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productTypeId` to the `productPrice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customerPrice` ADD COLUMN `outsourceTypeId` INTEGER NULL,
    ADD COLUMN `productTypeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `productPrice` ADD COLUMN `outsourceTypeId` INTEGER NULL,
    ADD COLUMN `productTypeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `customerPrice` ADD CONSTRAINT `customerPrice_productTypeId_fkey` FOREIGN KEY (`productTypeId`) REFERENCES `productType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customerPrice` ADD CONSTRAINT `customerPrice_outsourceTypeId_fkey` FOREIGN KEY (`outsourceTypeId`) REFERENCES `outsourceType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productPrice` ADD CONSTRAINT `productPrice_productTypeId_fkey` FOREIGN KEY (`productTypeId`) REFERENCES `productType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productPrice` ADD CONSTRAINT `productPrice_outsourceTypeId_fkey` FOREIGN KEY (`outsourceTypeId`) REFERENCES `outsourceType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
