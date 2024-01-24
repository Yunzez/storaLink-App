import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Storalinker from "../models/Storalinker";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import bcrypt from "bcrypt";
import generateRefreshToken from "../library/RefreshTokenGenerator";

// * part of auth route
const createStoralinker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { email, username, password, dob } = req.body;

    const existingUser = await Storalinker.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    if (!dob) {
      dob = new Date();
    }

    // Hash the password
    const saltRounds = 10; // You can adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Generate initial refresh token
    const { refreshToken, expiryDate } = generateRefreshToken(30);
    const storalinker = new Storalinker({
      _id: new mongoose.Types.ObjectId(),
      email,
      username,
      password: hashedPassword,
      dob,
      refreshToken: refreshToken,
      refreshTokenExpiry: expiryDate,
    });

    const savedStoralinker = await storalinker.save();

    // info: Generate JWT token
    const accessToken = jwt.sign(
      { userId: savedStoralinker.id },
      config.auth.jwtSecret,
      { expiresIn: "1h" }
    );

    // Return the new user and token, excluding the hashed password
    res.status(201).json({
      storalinker: {
        _id: savedStoralinker._id,
        email: savedStoralinker.email,
        username: savedStoralinker.username,
        dob: savedStoralinker.dob,
        refreshToken: savedStoralinker.refreshToken,
      },
      accessToken,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// * part of auth route
const loginStoralinker = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  console.log("email", email);
  Storalinker.findOne({ email })
    .exec()
    .then(async (storalinker) => {
      if (!storalinker) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      // Verify the password
      const match = await bcrypt.compare(password, storalinker.password);
      if (!match) {
        return res.status(401).json({ message: "Authentication failed" });
      }
      console.log("pass check");
      // Generate new refresh token
      const { refreshToken, expiryDate } = generateRefreshToken(30);
      // Update user with new refresh token and its expiry date
      storalinker.refreshToken = refreshToken;
      storalinker.refreshTokenExpiry = expiryDate;
      await storalinker.save();

      // Generate JWT token
      const accessToken = jwt.sign(
        { userId: storalinker.id },
        config.auth.jwtSecret,
        { expiresIn: "1h" }
      );

      res.status(200).json({ accessToken, storalinker });
    })
    .catch((err) => res.status(404).json({ message: "Storalinker not found" }));
};

// * part of storalinker route
const updateStoralinker = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  console.log("id", id);
  return Storalinker.findById(id)
    .then((storalinker) => {
      if (!storalinker) {
        return res.status(404).json({ message: "Storalinker not found" });
      }

      storalinker.set(req.body);
      return storalinker
        .save()
        .then((updatedStoralinker) => res.status(200).json(updatedStoralinker));
    })
    .catch((err) => res.status(500).json({ error: err }));
};

// * part of storalinker route
const deleteStoralinker = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  return Storalinker.findByIdAndDelete(id)
    .exec()
    .then(() => res.status(204).json({ message: "Storalinker deleted" }))
    .catch((err) => res.status(500).json({ error: err }));
};

// * part of storalinker route
const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Storalinker.find()
    .exec()
    .then((storalinkers) => res.status(200).json(storalinkers))
    .catch((err) => res.status(500).json({ error: err }));
};

export default {
  createStoralinker,
  loginStoralinker,
  updateStoralinker,
  deleteStoralinker,
  readAll,
};
