import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../constants";

export const authValidation: RequestHandler = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const [tokenType, tokenValue] = req.headers.authorization.split(" ");

    if (tokenType === "Bearer") {
      try {
        verify(tokenValue, JWT_SECRET as string);
        return next();
      } catch (error) {
        return res
          .status(403)
          .json(JSON.stringify(new Error("Não autorizado")));
      }
    }
  }

  return res.status(403).json(JSON.stringify(new Error("Não autorizado")));
};
