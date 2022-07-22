import { StudentDataBase } from './../data/Databases/StudentDataBase';
import { CLASS } from "../data/classes/class";
import { Request, Response } from "express";
import { CustomError } from "../data/error/customError";
import { ClassDataBase } from "../data/Databases/ClassDataBase";
import { messageStatus } from "../data/error/statusCodes";


export const getClass = async (req: Request, res: Response) => {
  try {
    const ClassDB = new ClassDataBase()

    const result = await ClassDB.getAllClass()
    

    if (!result) {
      throw new CustomError("NOT FOUND CLASS", 404);
    }

    const novaInstancia = new StudentDataBase()
    const studentList = novaInstancia.getStudentsList("015")
    const NovaNovaXCLasse =  new CLASS()
    //novo metodo teacherdatabase copia getStudentsList 

    res.status(200).send(result);
} catch (error: any) {
    res.status(error.statusCode).send(error.message);
  }
};
