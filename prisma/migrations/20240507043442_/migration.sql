/*
  Warnings:

  - You are about to drop the column `image` on the `Imoveis` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Imoveis" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "imovelId" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "Imoveis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
