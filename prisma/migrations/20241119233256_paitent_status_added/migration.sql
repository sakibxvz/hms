-- CreateEnum
CREATE TYPE "PatientStatus" AS ENUM ('Critical', 'Good', 'Bad', 'Emergency');

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "status" "PatientStatus" NOT NULL DEFAULT 'Good';
