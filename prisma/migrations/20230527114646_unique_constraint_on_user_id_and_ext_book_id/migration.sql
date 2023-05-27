/*
  Warnings:

  - A unique constraint covering the columns `[userId,externalBookId]` on the table `UserBook` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserBook_externalBookId_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserBook_userId_externalBookId_key" ON "UserBook"("userId", "externalBookId");
