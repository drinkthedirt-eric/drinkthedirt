-- CreateEnum
CREATE TYPE "Grind" AS ENUM ('VeryFine', 'Fine', 'MediumFine', 'Medium', 'CoarseMedium', 'Coarse');

-- AlterEnum
ALTER TYPE "RecipeName" ADD VALUE 'Standard';

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "grind" "Grind",
ADD COLUMN     "grind_odessp" DOUBLE PRECISION;
