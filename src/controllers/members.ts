import { RequestHandler } from "express";
import { z } from "zod";
import * as members from "../models/members";
import { getMonth } from "../utils/getMonth";
import { toBoolean } from "../utils/toBoolean";

export const getAll: RequestHandler = async (req, res) => {
    const items = await members.getAll();
    if (items) {
        return res.json(items);
    }
    res.json({ error: "Ocorreu um erro" });
};

export const getOne: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const item = await members.getOne(parseInt(id));
    if (item) return res.json(item);
    res.json({ error: "Ocorreu um erro" });
};

export const createMember: RequestHandler = async (req, res) => {
    const createMemberSchema = z.object({
        name: z.string(),
        birthDate: z.string(),
        sex: z.enum(["M", "F"]),
        hasChild: z.enum(["yes", "no"]).transform((data) => toBoolean(data)),
        isTeacher: z.enum(["yes", "no"]).transform((data) => toBoolean(data)),
        isMarried: z.enum(["yes", "no"]).transform((data) => toBoolean(data)),
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

    if (newMember) return res.json(newMember);

    res.json({ error: "Ocorreu um erro" });
};

export const updateMember: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const updateMemberSchema = z.object({
        name: z.string().optional(),
        birthDate: z.string().optional(),
        sex: z.enum(["M", "F"]).optional(),
        hasChild: z
            .enum(["yes", "no"])
            .transform((data) => toBoolean(data))
            .optional(),
        isTeacher: z
            .enum(["yes", "no"])
            .transform((data) => toBoolean(data))
            .optional(),
        isMarried: z
            .enum(["yes", "no"])
            .transform((data) => toBoolean(data))
            .optional(),
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
        hasChild: z
            .enum(["yes", "no"])
            .transform((data) => toBoolean(data))
            .optional(),
        isTeacher: z
            .enum(["yes", "no"])
            .transform((data) => toBoolean(data))
            .optional(),
        birthMonth: z.string().optional(),
    });

    const query = searchMemberSchema.safeParse(req.query);

    if (!query.success)
        return res.status(400).json({ error: "Dados inválidos" });
    const results = await members.search({
        ...query.data,
    });

    if (results) return res.json(results);
    res.json({ error: "Ocorreu um erro" });
};
