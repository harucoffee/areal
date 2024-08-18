-- CreateEnum
CREATE TYPE "Color" AS ENUM ('Yellow', 'Blue', 'Green', 'Kappa');

-- CreateTable
CREATE TABLE "Poster" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" VARCHAR(300) NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "boardId" INTEGER NOT NULL,

    CONSTRAINT "Poster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opinion" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Opinion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Board_name_key" ON "Board"("name");

-- AddForeignKey
ALTER TABLE "Poster" ADD CONSTRAINT "Poster_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
