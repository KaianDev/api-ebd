import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();
export const getAll = async () => {
    try {
        return await prisma.member.findMany({ orderBy: { name: "asc" } });
    } catch (err) {
        return false;
    }
};

export const getOne = async (id: number) => {
    try {
        return await prisma.member.findFirst({ where: { id } });
    } catch (err) {
        return false;
    }
};

type CreateData = Prisma.Args<typeof prisma.member, "create">["data"];
export const create = async (data: CreateData) => {
    try {
        return prisma.member.create({ data });
    } catch (err) {
        return false;
    }
};

type UpdateData = Prisma.Args<typeof prisma.member, "update">["data"];
export const update = async (id: number, data: UpdateData) => {
    try {
        return prisma.member.update({ where: { id }, data });
    } catch (err) {
        return false;
    }
};

export const remove = async (id: number) => {
    try {
        return prisma.member.delete({ where: { id } });
    } catch (err) {
        return false;
    }
};

type Filter = {
    sex?: "M" | "F";
    birthMonth?: string;
    hasChild?: boolean;
    isTeacher?: boolean;
    name?: string;
};
export const search = async (filter: Filter) => {
    try {
        return await prisma.member.findMany({
            where: {
                ...filter,
                name: {
                    contains: filter.name,
                    mode: "insensitive",
                },
            },
            orderBy: {
                birthDate: "asc",
            },
        });
    } catch (err) {
        return false;
    }
};
