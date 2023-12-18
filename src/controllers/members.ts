import { RequestHandler } from "express";
import { z } from "zod";
import * as members from "../services/members";
import { getMonth } from "../utils/getMonth";

export const getAll: RequestHandler = async (req, res) => {
    const items = await members.getAll();
    if (items) {
        return res.json({ members: items });
    }
    res.json({ error: "Ocorreu um erro" });
};

export const getOne: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const item = await members.getOne(parseInt(id));
    if (item) return res.json({ member: item });
    res.json({ error: "Ocorreu um erro" });
};

export const createMember: RequestHandler = async (req, res) => {
    const createMemberSchema = z.object({
        name: z.string(),
        birthDate: z.string(),
        sex: z.enum(["M", "F"]),
        hasChild: z.boolean(),
        isTeacher: z.boolean(),
    });

    const body = createMemberSchema.safeParse(req.body);
    if (!body.success)
        return res.status(400).json({ error: "Dados inválidos" });

    const birthDate = new Date(body.data.birthDate);
    const birthMonth = getMonth(birthDate);

    const newMember = await members.create({
        ...body.data,
        birthDate,
        birthMonth,
    });

    if (newMember) return res.json({ member: newMember });

    res.json({ error: "Ocorreu um erro" });
};

export const updateMember: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const updateMemberSchema = z.object({
        name: z.string().optional(),
        birthDate: z.string().optional(),
        sex: z.enum(["M", "F"]).optional(),
        hasChild: z.boolean().optional(),
        isTeacher: z.boolean().optional(),
        status: z.boolean().optional(),
    });

    const body = updateMemberSchema.safeParse(req.body);

    if (!body.success)
        return res.status(400).json({ error: "Dados inválidos" });

    const birthDate = body.data.birthDate
        ? new Date(body.data.birthDate)
        : undefined;
    const birthMonth = birthDate ? getMonth(birthDate) : undefined;

    const updatedMember = await members.update(parseInt(id), {
        ...body.data,
        birthMonth,
        birthDate,
    });

    if (updatedMember) return res.json({ member: updatedMember });
    res.json({ error: "Ocorreu um erro" });
};

export const removeMember: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const removedMember = await members.remove(parseInt(id));

    if (removedMember) return res.json({ member: removedMember });
    res.json({ error: "Ocorreu um erro" });
};

export const search: RequestHandler = async (req, res) => {
    const searchMemberSchema = z.object({
        name: z.string().optional(),
        sex: z.enum(["M", "F"]).optional(),
        hasChild: z.string().optional(),
        isTeacher: z.string().optional(),
        birthMonth: z.string().optional(),
    });

    const query = searchMemberSchema.safeParse(req.query);

    if (!query.success)
        return res.status(400).json({ error: "Dados inválidos" });
    const results = await members.search({
        ...query.data,
        hasChild:
            query.data.hasChild === "yes"
                ? true
                : query.data.hasChild === "no"
                ? false
                : undefined,
        isTeacher:
            query.data.isTeacher === "yes"
                ? true
                : query.data.isTeacher === "no"
                ? false
                : undefined,
    });

    if (results) return res.json({ members: results });
    res.json({ error: "Ocorreu um erro" });
};
