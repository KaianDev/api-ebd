/*
  Warnings:

  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Member";

-- CreateTable
CREATE TABLE "members" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "sex" "Sex" NOT NULL,
    "hasChild" BOOLEAN NOT NULL,
    "isTeacher" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);
