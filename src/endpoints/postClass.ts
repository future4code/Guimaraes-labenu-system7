import { Request, Response } from "express";
import { v4 as generateId } from "uuid";
import { CLASS } from "../data/classes/class";
import { ClassDataBase } from "../data/Databases/ClassDataBase";
import { CustomError } from "../data/error/customError";
import { messageStatus } from "../data/error/statusCodes";

export const postClass = async (req: Request, res: Response) => {
  try {
    let { name, module }: any = req.body;
    if (!name) {
      throw new CustomError("MISSING PARAMETERS NAME", 422);
    }

    if(!module){
      module = 0
    }

    if(module > 6 ){
      throw new CustomError("NOT IMPLEMENTED, MODULE MUST BE A NUMBER BETWEEN 1 AND 6" , 404)
    }
    
    const newClass = new CLASS(generateId(), name, module);

    const newObjectClass: { id: string; name: string; module: number } = {
      id: newClass.getId(),
      name: newClass.getName(),
      module: newClass.getModule(),
    };

    const classDB = new ClassDataBase();

    await classDB.createClass(newObjectClass);

    res.status(200).send(messageStatus.SUCCESS.message);
  } catch (error: any) {
    res.status(error.statusCode).send(error.message);
  }
};
