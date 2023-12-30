import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type CreateUser = Prisma.Args<typeof prisma.user, "create">["data"];
export const create = async (data: CreateUser) => {
    try {
        return await prisma.user.create({ data });
    } catch (error) {
        return false;
    }
};

export const getUserByEmail = async (email: string) => {
    try {
        return await prisma.user.findFirst({ where: { email } });
    } catch (error) {
        return false;
    }
};
