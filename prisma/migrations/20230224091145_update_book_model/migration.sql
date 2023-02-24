/*
  Warnings:

  - You are about to drop the column `completed` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Book` table. All the data in the column will be lost.
  - Added the required column `author` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisher` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `read` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "completed",
DROP COLUMN "name",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "publisher" TEXT NOT NULL,
ADD COLUMN     "read" BOOLEAN NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
