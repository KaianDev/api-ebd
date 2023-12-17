-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('M', 'F');

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "sex" "Sex" NOT NULL,
    "hasChild" BOOLEAN NOT NULL,
    "isTeacher" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);
