-- CreateTable
CREATE TABLE `dofiRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `reason` VARCHAR(191) NOT NULL,
    `from` INTEGER NOT NULL,
    `to` INTEGER NOT NULL,
    `followedBy` INTEGER NULL,
    `date` DATETIME(3) NOT NULL,
    `nonconformityDescription` VARCHAR(191) NOT NULL,
    `plannedCorrectiveActions` VARCHAR(191) NULL,
    `dueDate` DATETIME(3) NULL,
    `resultsAndComments` VARCHAR(191) NULL,
    `closureDate` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dofiRequest` ADD CONSTRAINT `dofiRequest_from_fkey` FOREIGN KEY (`from`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dofiRequest` ADD CONSTRAINT `dofiRequest_to_fkey` FOREIGN KEY (`to`) REFERENCES `personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dofiRequest` ADD CONSTRAINT `dofiRequest_followedBy_fkey` FOREIGN KEY (`followedBy`) REFERENCES `personnel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
