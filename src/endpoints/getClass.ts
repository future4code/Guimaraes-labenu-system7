import { StudentDataBase } from "./../data/Databases/StudentDataBase";
import { CLASS } from "../data/classes/class";
import { Request, Response } from "express";
import { CustomError } from "../data/error/customError";
import { ClassDataBase } from "../data/Databases/ClassDataBase";
import { messageStatus } from "../data/error/statusCodes";
import { v4 as generateId } from "uuid";
import { TeacherDataBase } from "../data/Databases/TeacherDataBase";

export const getClass = async (req: Request, res: Response) => {
  try {
    const classDB = new ClassDataBase();

    const allClass = await classDB.getAllClass();
    if (!allClass) {
      throw new CustomError("NOT FOUND CLASS", 404);
    }

    res.status(200).send(allClass);
  } catch (error: any) {
    res.status(error.statusCode).send(error.message);
  }
};
