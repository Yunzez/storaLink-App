import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Storalinker from "../models/Storalinker";
const createStoralinker = (req: Request, res: Response, next: NextFunction) => {
  let { email, username, password, dob } = req.body;

  if (!dob) {
    dob = new Date();
  }

  const storalinker = new Storalinker({
    _id: new mongoose.Types.ObjectId(),
    email,
    username,
    password,
    dob,
  });

  return storalinker
    .save()
    .then((storalinker) => res.status(201).json(storalinker))
    .catch((err) => res.status(500).json({ error: err }));
};

const readStoralinker = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  return Storalinker.findById(id)
    .exec()
    .then((storalinker) =>
      storalinker
        ? res.status(200).json(storalinker)
        : res.status(404).json({ message: "Storalinker not found" })
    )
    .catch((err) => res.status(500).json({ error: err }));
};

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

const deleteStoralinker = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  return Storalinker.findByIdAndDelete(id)
    .exec()
    .then(() => res.status(204).json({ message: "Storalinker deleted" }))
    .catch((err) => res.status(500).json({ error: err }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Storalinker.find()
    .exec()
    .then((storalinkers) => res.status(200).json(storalinkers))
    .catch((err) => res.status(500).json({ error: err }));
};

export default {
  createStoralinker,
  readStoralinker,
  updateStoralinker,
  deleteStoralinker,
  readAll,
};
