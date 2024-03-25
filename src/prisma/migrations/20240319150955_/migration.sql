/*
  Warnings:

  - You are about to drop the column `favoritesId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `favoritesId` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `favoritesId` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the `Favorites` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[artistId]` on the table `Album` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[artistId]` on the table `Track` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[albumId]` on the table `Track` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_favoritesId_fkey";

-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_favoritesId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_favoritesId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "favoritesId",
ADD COLUMN     "isFavorite" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "favoritesId",
ADD COLUMN     "isFavorite" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "favoritesId",
ADD COLUMN     "isFavorite" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- DropTable
DROP TABLE "Favorites";

-- CreateIndex
CREATE UNIQUE INDEX "Album_artistId_key" ON "Album"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "Track_artistId_key" ON "Track"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "Track_albumId_key" ON "Track"("albumId");
