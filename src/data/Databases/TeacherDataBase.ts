import { Teacher } from "./../classes/teachers";
import { BaseDatabase } from "./BaseDatabase";
import { CustomError } from "../error/customError";
import { v4 as generateId } from "uuid";

export class TeacherDataBase extends BaseDatabase {
  public createStudent = async (teacher: Teacher): Promise<void> => {
    try {
      await BaseDatabase.connection("STUDENTS").insert({
        id: teacher.getId(),
        name: teacher.getName(),
        email: teacher.getEmail(),
        birth_date: teacher.getBirthDate(),
        class_id: teacher.getClassId(),
      });
    } catch (error: any) {
      throw new CustomError(error.sqlMessage || error.message, 500);
    }
  }

  public getTeachersList = async (classId: string): Promise<any[]> => {
    try {
      const result: any = await BaseDatabase.connection("TEACHERS")
        .select("*")
        .where("class_id", classId);
      return result;
    } catch (error: any) {
      throw new CustomError(error.sqlMessage || error.message, 500);
    }
  };
};



