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
    let newClass: any;
    let arrayStudents: any = [];
    let newStudent: any = [];

    const classDB = new ClassDataBase();

    const allClass = await classDB.getAllClass();

    if (!allClass) {
      throw new CustomError("NOT FOUND CLASS", 404);
    }

    const studentDB = new StudentDataBase();
    const teacherDB = new TeacherDataBase();

    const studentsList: any = await studentDB.getStudentsList(
      "e5d4cefc-521c-4be7-ae1f-517e89b4339e"
    );
    studentsList.forEach((student: any) => {
      let newDateSplit = new Date(student.birth_date).toISOString().split("T");

      let newBirthDate = newDateSplit[0].split("-").reverse().join("/");
      let newStudent: any = {
        id: student.id,
        name: student.name,
        email: student.email,
        birthDate: newBirthDate,
      };
      arrayStudents.push(newStudent);
      return arrayStudents;
    });

    allClass.forEach(async (element: any) => {
      const teachersList: any = await teacherDB.getTeachersList(
        "e5d4cefc-521c-4be7-ae1f-517e89b4339e"
      );

      for (let i = 0; i < studentsList.length; i++) {
        const student = studentsList[i];
        if (student.class_id === element.id) {
          newClass = new CLASS(
            element.id,
            element.name,
            element.module,
            teachersList,
            arrayStudents
          );
          console.log(" newClass == > ", newClass);
          return newClass;
        }
      }
    });
    res.status(200).send(newClass);
  } catch (error: any) {
    res.status(error.statusCode).send(error.message);
  }
};
