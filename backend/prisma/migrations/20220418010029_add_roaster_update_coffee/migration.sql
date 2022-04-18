/*
  Warnings:

  - Added the required column `acidity` to the `Coffee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `body` to the `Coffee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Coffee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `process` to the `Coffee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `producer` to the `Coffee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roasterId` to the `Coffee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sweetness` to the `Coffee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coffee" ADD COLUMN     "acidity" TEXT NOT NULL,
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "flavorCategories" TEXT[],
ADD COLUMN     "location" TEXT,
ADD COLUMN     "ourTastingNotes" TEXT[],
ADD COLUMN     "photos" JSONB[],
ADD COLUMN     "process" TEXT NOT NULL,
ADD COLUMN     "producer" TEXT NOT NULL,
ADD COLUMN     "roasterId" INTEGER NOT NULL,
ADD COLUMN     "roasterTastingNotes" TEXT[],
ADD COLUMN     "sweetness" TEXT NOT NULL,
ADD COLUMN     "varietals" TEXT[];

-- CreateTable
CREATE TABLE "Roaster" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT,
    "logoPhoto" JSONB NOT NULL,

    CONSTRAINT "Roaster_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Coffee" ADD CONSTRAINT "Coffee_roasterId_fkey" FOREIGN KEY ("roasterId") REFERENCES "Roaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
