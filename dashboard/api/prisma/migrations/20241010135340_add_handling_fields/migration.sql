-- CreateTable
CREATE TABLE `personnel` (
    `personnelid` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(50) NOT NULL,
    `lastname` VARCHAR(50) NOT NULL,
    `position` VARCHAR(50) NULL,
    `department` VARCHAR(50) NULL,
    `dateofhire` DATETIME(3) NULL,
    `email` VARCHAR(100) NULL,
    `phone` VARCHAR(15) NULL,
    `handleComplaints` BOOLEAN NULL,
    `handleSales` BOOLEAN NULL,

    PRIMARY KEY (`personnelid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
