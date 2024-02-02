import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import { IStoralinker } from "../models/Storalinker";
import { IFolder } from "../models/Folder";

/**
 *
 * this function is used to validate the request body against the schema
 * add the schema to the Schemas object and use it as a middleware
 *
 */

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error: any) {
      console.log(error);
      res.status(422).json({
        error: error.details[0].message,
        message: "Fail schema validation",
      });
    }
  };
};

export const Schemas = {
  storalinker: {
    create: Joi.object<IStoralinker>({
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },

  folder: {
    create: Joi.object<IFolder>({
      // info: regex(/^[0-9a-fA-F]{24}$/) is used to validate the mongoDB ObjectId
      //   creatorId: Joi.string()
      //     .regex(/^[0-9a-fA-F]{24}$/)
      //     .required(),
      folderName: Joi.string().required(),
      folderDescription: Joi.string(),
    }),

    update: Joi.object<IFolder>({
      folderName: Joi.string().required(),
      folderDescription: Joi.string().required(),
    }),
  },
};
