/*
  Warnings:

  - You are about to drop the column `read` on the `UserBook` table. All the data in the column will be lost.
  - You are about to drop the column `review` on the `UserBook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserBook" DROP COLUMN "read",
DROP COLUMN "review",
ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reviewId" TEXT;

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" INTEGER,
    "externalBookId" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserBook" ADD CONSTRAINT "UserBook_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
