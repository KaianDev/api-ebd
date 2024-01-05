/*
  Warnings:

  - Added the required column `isMarried` to the `members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "members" ADD COLUMN     "isMarried" BOOLEAN NOT NULL;
