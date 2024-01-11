import { RequestHandler } from "express";
import { ORIGIN_URL } from "../constants/originURL";

export const originInterceptor: RequestHandler = (req, res, next) => {
  if (req.headers.origin && req.headers.origin === ORIGIN_URL) return next();
  console.log("Não autorizado!");
  res.status(401).json({ error: "Acesso não autorizado!" });
};
