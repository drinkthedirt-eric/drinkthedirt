/*
  Warnings:

  - The `flavorCategories` column on the `Coffee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `acidity` on the `Coffee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `body` on the `Coffee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sweetness` on the `Coffee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FlavorCategory" AS ENUM ('Spices', 'NutsChocolate', 'Candy', 'Floral', 'Fruity', 'Acidic', 'FerementationFunk');

-- CreateEnum
CREATE TYPE "FlavorProfileLevel" AS ENUM ('Low', 'Medium', 'High');

-- AlterTable
ALTER TABLE "Coffee" DROP COLUMN "acidity",
ADD COLUMN     "acidity" "FlavorProfileLevel" NOT NULL,
DROP COLUMN "body",
ADD COLUMN     "body" "FlavorProfileLevel" NOT NULL,
DROP COLUMN "flavorCategories",
ADD COLUMN     "flavorCategories" "FlavorCategory"[],
DROP COLUMN "sweetness",
ADD COLUMN     "sweetness" "FlavorProfileLevel" NOT NULL;
