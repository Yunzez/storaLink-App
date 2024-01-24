import e, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import Storalinker from "../models/Storalinker";
import generateRefreshToken from "../library/RefreshTokenGenerator";
const validateRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken, email } = req.body;
  const userRefreshToken = refreshToken;
  console.log(userRefreshToken, email);
  if (!refreshToken || !email) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const user = await Storalinker.findOne({
      email: email,
      refreshToken: userRefreshToken,
    });

    if (!user || !user.refreshTokenExpiry) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Verify if the refresh token is expired
    if (user.refreshTokenExpiry < new Date()) {
      return res.status(403).json({ message: "Refresh token expired" });
    }
    const { refreshToken, expiryDate } = generateRefreshToken(1);
    console.log(new Date(), expiryDate);
    // If valid, issue a new access token
    const newAccessToken = jwt.sign(
      { userId: user._id },
      config.auth.jwtSecret,
      { expiresIn: "1h" }
    );

    res.json({ accessToken: newAccessToken, refreshToken: refreshToken });
  } catch (err) {
    res.status(404).json({ message: "cannot find user" });
  }
};

export default {
  validateRefreshToken,
};
