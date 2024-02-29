import { RequestHandler } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import * as users from "../models/users";
import JWT from "jsonwebtoken";
import { JWT_SECRET } from "../constants";

export const login: RequestHandler = async (req, res) => {
  const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });
  const body = LoginSchema.safeParse(req.body);

  if (body.success) {
    const { email, password } = body.data;
    const hasUser = await users.getUserByEmail(email);

    if (!hasUser) return res.status(400).json({ error: "Usuário não existe" });

    const matchedPassword = await bcrypt.compare(password, hasUser.password);

    const code = matchedPassword ? 200 : 400;
    const { password: hashedPassword, ...user } = hasUser;
    const accessToken = JWT.sign(user, JWT_SECRET as string, {
      expiresIn: 3 * 24 * 60 * 60, // 3 days
    });

    return res
      .status(code)
      .json(
        matchedPassword
          ? { user, accessToken }
          : { error: "Acesso não autorizado" }
      );
  }
  res.status(400).json({ error: "Ocorreu um erro" });
};
