/*
  Warnings:

  - You are about to drop the column `itemTypeId` on the `orderItem` table. All the data in the column will be lost.
  - The values [Depoda,CikisYapildi] on the enum `orderItem_itemType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `itemType` to the `orderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `orderItem` DROP FOREIGN KEY `orderItem_itemTypeId_fkey`;

-- AlterTable
ALTER TABLE `orderItem` DROP COLUMN `itemTypeId`,
    ADD COLUMN `itemType` ENUM('PRE_CUT', 'RAW_PRE_QUALITY', 'RAW_QUALITY', 'DYE_HOUSE', 'DYE_PRE_QUALITY', 'DYE_QUALITY', 'OUTSOURCING', 'LAMINATED_PRE_QUALITY', 'LAMINATED_QUALITY') NOT NULL;

-- AlterTable
ALTER TABLE `stock` ADD COLUMN `sold` BOOLEAN NULL DEFAULT false,
    MODIFY `status` ENUM('PRE_CUT', 'RAW_PRE_QUALITY', 'RAW_QUALITY', 'DYE_HOUSE', 'DYE_PRE_QUALITY', 'DYE_QUALITY', 'OUTSOURCING', 'LAMINATED_PRE_QUALITY', 'LAMINATED_QUALITY') NOT NULL;
