import { Student } from "./../classes/students";
import { BaseDatabase } from "./BaseDatabase";
import { CustomError } from "../error/customError";
import { v4 as generateId } from "uuid";

export class StudentDataBase extends BaseDatabase {
  public createStudent  = async (student: Student): Promise<void> => {

    try {
      await BaseDatabase.connection("STUDENTS").insert({
        id: student.getId(),
        name:student.getName(),
        email: student.getEmail(),
        birth_date:student.getBirthDate(),
        class_id: student.getClassId()
      });

  
    } catch (error: any) {
      throw new CustomError(error.sqlMessage || error.message, 500);
    }
  };
  
  public getAllStudents = async (): Promise<Student[]> => {
    try {
      const result: Student[] = await BaseDatabase.connection("STUDENTS").orderBy(
        "name"
      );
      return result;
    } catch (error: any) {
      throw new CustomError(error.sqlMessage || error.message, 500);
    }
  };

  public createHobbies = async (hobby:string[], student:Student):Promise<void>=>{
    try {
      hobby.forEach(async (item:any)=>{
        let newHobby:any = {
          id: generateId(),
          name: item
        }
        let newStudentHobby = {
          id: generateId(),
          student_id: student.getId(),
          hobby_id: newHobby.id
        }
        await BaseDatabase.connection("HOBBY").insert(newHobby)
        await BaseDatabase.connection("STUDENTS_HOBBY").insert(newStudentHobby)

      })

    
    } catch (error: any) {
      throw new CustomError(error.sqlMessage || error.message, 500);
    }
  }

  public createStudentHobbies = async (data:{}, student: Student):Promise<void>=>{
    try {
      let newStudentHobby = {
        id: generateId(),
        student_id: student.getId()
      }
      await BaseDatabase.connection("STUDENTS_HOBBY").insert(data)

    } catch (error: any) {
      throw new CustomError(error.sqlMessage || error.message, 500);
    }
  }
  
  public getIdHobby = async (hobby:string): Promise<string> => {
    try {
      const result:any = await BaseDatabase.connection("HOBBY")
      .select("id")
      .where("name", hobby);
      return result;
    } catch (error: any) {
      throw new CustomError(error.sqlMessage || error.message, 500);
    }
  };
}
