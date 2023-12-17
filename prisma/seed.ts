import { Prisma, PrismaClient } from "@prisma/client";
import { getMonth } from "../src/utils/getMonth";

const prisma = new PrismaClient();
type CreateMembers = Prisma.Args<typeof prisma.member, "create">["data"];
const data: CreateMembers[] = [];

const main = async () => {
    return await prisma.member.createMany({ data });
};

main();
