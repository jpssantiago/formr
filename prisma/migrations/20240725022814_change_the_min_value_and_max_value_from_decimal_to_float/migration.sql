/*
  Warnings:

  - You are about to alter the column `minValue` on the `Question` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `maxValue` on the `Question` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "minValue" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "maxValue" SET DATA TYPE DOUBLE PRECISION;
