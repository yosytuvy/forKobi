import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../auth/model/jwt/jwt";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers["authorization"];

  if (!authToken) return res.status(401).json({ error: "Unauthorized" });
  if (!verifyToken(authToken)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};
