/*
  Warnings:

  - Added the required column `personnelId` to the `dyeShipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dyeShipment` ADD COLUMN `personnelId` INTEGER NOT NULL,
    ADD COLUMN `shippingCarId` INTEGER NULL,
    ADD COLUMN `shippingCarrierId` INTEGER NULL,
    ADD COLUMN `shippingCompanyId` INTEGER NULL,
    MODIFY `sentDate` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `dyeShipment` ADD CONSTRAINT `dyeShipment_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeShipment` ADD CONSTRAINT `dyeShipment_shippingCompanyId_fkey` FOREIGN KEY (`shippingCompanyId`) REFERENCES `shippingCompany`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeShipment` ADD CONSTRAINT `dyeShipment_shippingCarrierId_fkey` FOREIGN KEY (`shippingCarrierId`) REFERENCES `shippingCarrier`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dyeShipment` ADD CONSTRAINT `dyeShipment_shippingCarId_fkey` FOREIGN KEY (`shippingCarId`) REFERENCES `shippingCar`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
