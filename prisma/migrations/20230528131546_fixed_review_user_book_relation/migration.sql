/*
  Warnings:

  - You are about to drop the column `reviewId` on the `UserBook` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userBookId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userBookId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserBook" DROP CONSTRAINT "UserBook_reviewId_fkey";

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "userBookId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserBook" DROP COLUMN "reviewId";

-- CreateIndex
CREATE UNIQUE INDEX "Review_userBookId_key" ON "Review"("userBookId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userBookId_fkey" FOREIGN KEY ("userBookId") REFERENCES "UserBook"("id") ON DELETE CASCADE ON UPDATE CASCADE;
