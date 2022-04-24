/*
  Warnings:

  - You are about to drop the column `roasterDescrption` on the `Coffee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Coffee" DROP COLUMN "roasterDescrption",
ADD COLUMN     "roasterDescription" TEXT;
