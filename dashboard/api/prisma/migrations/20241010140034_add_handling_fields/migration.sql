/*
  Warnings:

  - The primary key for the `personnel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `personnelid` on the `personnel` table. All the data in the column will be lost.
  - Added the required column `id` to the `personnel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `personnel` DROP PRIMARY KEY,
    DROP COLUMN `personnelid`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
