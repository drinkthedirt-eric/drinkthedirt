-- CreateEnum
CREATE TYPE "RecipeName" AS ENUM ('TwoPour', 'ThreePour');

-- CreateEnum
CREATE TYPE "BrewMethod" AS ENUM ('V60', 'Aeropress');

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coffeeId" INTEGER NOT NULL,
    "method" "BrewMethod" NOT NULL,
    "name" "RecipeName" NOT NULL,
    "coffeeWeightGrams" INTEGER NOT NULL,
    "waterWeightGrams" INTEGER NOT NULL,
    "grindSizeMicrons" INTEGER NOT NULL,
    "waterTempC" INTEGER NOT NULL,
    "steps" JSONB[],

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_coffeeId_fkey" FOREIGN KEY ("coffeeId") REFERENCES "Coffee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
