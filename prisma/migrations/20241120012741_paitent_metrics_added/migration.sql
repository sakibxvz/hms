-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "BMI" DOUBLE PRECISION NOT NULL DEFAULT 22.4,
ADD COLUMN     "BP" INTEGER NOT NULL DEFAULT 124,
ADD COLUMN     "Height" INTEGER NOT NULL DEFAULT 175,
ADD COLUMN     "Weight" INTEGER NOT NULL DEFAULT 92;
