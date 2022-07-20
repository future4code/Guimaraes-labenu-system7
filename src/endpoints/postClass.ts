import { Request, Response } from "express";
import { v4 as generateId } from "uuid";
import { CLASS } from "../data/classes/class";
import { ClassDataBase } from "../data/Databases/ClassDataBase";
import { CustomError } from "../data/error/customError";
import { messageStatus } from "../data/error/statusCodes";

export const postClass = async (req: Request, res: Response) => {
  try {
    const { name, module }: any = req.body;
    if (!name) {
      throw new CustomError("MISSING PARAMETERS NAME", 422);
    }
    if (!module) {
      throw new CustomError("MISSING PARAMETERS MODULE", 422);
    }
    const newClass: CLASS = new CLASS(generateId(), name, module);

    const classDB = new ClassDataBase();

    await classDB.createClass(newClass);

    res.status(200).send(messageStatus.SUCCESS.message);
  } catch (error: any) {
    res.status(error.statusCode).send(error.message);
  }
};
