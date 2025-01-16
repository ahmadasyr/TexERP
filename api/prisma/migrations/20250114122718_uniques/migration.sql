/*
  Warnings:

  - A unique constraint covering the columns `[customerMeetPlanId,personnelId]` on the table `customerMeetPlanAttendee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[customerId,customerMeetPlanId]` on the table `customerMeetPlanCustomer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `customerMeetPlanAttendee_customerMeetPlanId_personnelId_key` ON `customerMeetPlanAttendee`(`customerMeetPlanId`, `personnelId`);

-- CreateIndex
CREATE UNIQUE INDEX `customerMeetPlanCustomer_customerId_customerMeetPlanId_key` ON `customerMeetPlanCustomer`(`customerId`, `customerMeetPlanId`);
