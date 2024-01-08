import { RequestHandler } from "express";

export const originInterceptor: RequestHandler = (req, res, next) => {
  if (req.headers.origin) return next();
  res.status(401).json({ error: "Acesso não autorizado!" });
};
