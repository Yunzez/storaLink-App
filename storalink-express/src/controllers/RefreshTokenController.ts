import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import Storalinker from "../models/Storalinker";
const validateRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken, userId } = req.body;

  try {
    const user = await Storalinker.findOne({
      _id: userId,
      refreshToken: refreshToken,
    });

    if (!user || !user.refreshTokenExpiry) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Verify if the refresh token is expired
    if (user.refreshTokenExpiry < new Date()) {
      return res.status(403).json({ message: "Refresh token expired" });
    }

    // If valid, issue a new access token
    const newAccessToken = jwt.sign(
      { userId: user._id },
      config.auth.jwtSecret,
      { expiresIn: "1h" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(404).json({ message: "cannot find user" });
  }
};

export default {
  validateRefreshToken,
};
