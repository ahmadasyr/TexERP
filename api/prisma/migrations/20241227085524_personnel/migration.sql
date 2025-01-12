/*
  Warnings:

  - You are about to alter the column `department` on the `personnel` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Enum(EnumId(0))`.
  - A unique constraint covering the columns `[username]` on the table `personnel` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `personnel` MODIFY `department` ENUM('admin', 'yon', 'iys', 'ika', 'kal', 'pln', 'stn', 'sts', 'urt', 'sev', 'dep', 'coz', 'orm', 'kalf', 'kes') NULL;

-- CreateIndex
CREATE UNIQUE INDEX `personnel_username_key` ON `personnel`(`username`);
