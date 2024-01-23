import { Request, Response, NextFunction } from "express";
import { config } from "../config/config";
import jwt from "jsonwebtoken";
import { IStoralinker } from "../models/Storalinker";

export interface UserRequest extends Request {
  userId?: string;
}

export const ValidateJWTToken = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // No token

  jwt.verify(token, config.auth.jwtSecret, (err: any, payload: any) => {
    if (err) return res.sendStatus(403).json({ message: "Invalid Token" }); // Invalid token
    req.userId = payload.userId;
    next();
  });
};
