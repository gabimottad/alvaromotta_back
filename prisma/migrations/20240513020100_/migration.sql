/*
  Warnings:

  - Added the required column `area` to the `Imoveis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `areaTotal` to the `Imoveis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bathrooms` to the `Imoveis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bedrooms` to the `Imoveis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suites` to the `Imoveis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Imoveis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Imoveis" ADD COLUMN     "area" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "areaTotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "bathrooms" INTEGER NOT NULL,
ADD COLUMN     "bedrooms" INTEGER NOT NULL,
ADD COLUMN     "suites" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
