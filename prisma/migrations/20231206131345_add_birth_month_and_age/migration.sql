/*
  Warnings:

  - Added the required column `age` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthMonth` to the `members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "members" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "birthMonth" TEXT NOT NULL;
