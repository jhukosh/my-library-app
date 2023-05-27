/*
  Warnings:

  - A unique constraint covering the columns `[externalBookId]` on the table `UserBook` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserBook" ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "review" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserBook_externalBookId_key" ON "UserBook"("externalBookId");
