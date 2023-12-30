import { RequestHandler } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import * as users from "../services/users";

export const login: RequestHandler = async (req, res) => {
    const LoginSchema = z.object({
        email: z.string().email(),
        password: z.string(),
    });

    const body = LoginSchema.safeParse(req.body);
    if (body.success) {
        const { email, password } = body.data;
        const hasUser = await users.getUserByEmail(email);

        if (!hasUser) return res.json({ error: "Usuário não existe" });

        const matchedPassword = await bcrypt.compare(
            password,
            hasUser.password
        );

        if (matchedPassword) {
            return res.json({ message: "Acesso autorizado" });
        } else {
            return res.json({ error: "Acesso negado" });
        }
    }

    res.json({ error: "Ocorreu um erro" });
};

export const validate: RequestHandler = (req, res, next) => {};
