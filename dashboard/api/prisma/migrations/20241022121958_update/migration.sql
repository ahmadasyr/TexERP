/*
  Warnings:

  - The values [Fabricadan] on the enum `offer_shippingMethod` will be removed. If these variants are still used in the database, this will fail.
  - The values [Fabricadan] on the enum `offer_shippingMethod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `customer` MODIFY `shippingMethod` ENUM('Fabrikadan', 'Depodan', 'Limana', 'EXW', 'FCA', 'CPT', 'CIP', 'DAT', 'DAP', 'DDP', 'FAS', 'FOB', 'CFR', 'CIF') NOT NULL;

-- AlterTable
ALTER TABLE `offer` MODIFY `shippingMethod` ENUM('Fabrikadan', 'Depodan', 'Limana', 'EXW', 'FCA', 'CPT', 'CIP', 'DAT', 'DAP', 'DDP', 'FAS', 'FOB', 'CFR', 'CIF') NOT NULL;
