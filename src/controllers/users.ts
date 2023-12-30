import { RequestHandler } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import * as users from "../services/users";

export const createUser: RequestHandler = async (req, res) => {
    const CreateUserSchema = z.object({
        email: z.string().email(),
        password: z.string(),
    });

    const body = CreateUserSchema.safeParse(req.body);

    if (body.success) {
        const { email, password } = body.data;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await users.create({
            email,
            password: hashedPassword,
        });

        if (newUser) {
            return res.status(201).json({
                user: {
                    id: newUser.id,
                    email: newUser.email,
                },
            });
        } else {
            return res.json({ error: "Erro ao cadastrar usuário" });
        }
    }

    return res.status(400).json({ error: "Dados inválidos" });
};
