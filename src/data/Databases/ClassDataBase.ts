import { StudentDataBase } from "./StudentDataBase";
import { CLASS } from "../classes/class";
import { CustomError } from "../error/customError";
import { BaseDatabase } from "./BaseDatabase";
import { TeacherDataBase } from "./TeacherDataBase";

export class ClassDataBase extends BaseDatabase {
  public createClass = async (newObject: {}): Promise<void> => {
    try {
      await BaseDatabase.connection("CLASS").insert(newObject);
    } catch (error: any) {
      throw new CustomError(error.sqlMessage || error.message, 500);
    }
  };

  public getAllClass = async (): Promise<CLASS[]> => {
    try {
      let teachers: any = [];
      let students: any = [];
      let newArrayData: any = [];

      const result: any = await BaseDatabase.connection
        .select("c.id as classId", "c.name as class_Name", "c.module")
        .from("CLASS as c")
        .orderBy("name");
      for (let element of result) {
        const StudentDB = new StudentDataBase();

        students = await StudentDB.getStudentsList(element.classId);

        const TeachersDB = new TeacherDataBase();
        teachers = await TeachersDB.getTeachersList(element.classId);

        for (const student of students) {
          let newDateSplit = new Date(student.birthDate)
            .toISOString()
            .split("T");
          let newBirthDate = newDateSplit[0].split("-").reverse().join("/");
          student.birthDate = newBirthDate;
        }

        for (const teacher of teachers) {
          let newDateSplit = new Date(teacher.teacherBirthDate)
            .toISOString()
            .split("T");
          let newBirthDateTeacher = newDateSplit[0]
            .split("-")
            .reverse()
            .join("/");
          teacher.birth_date = newBirthDateTeacher;
        }

        let Class: CLASS = new CLASS(
          element.classId,
          element.class_Name,
          element.module,
          teachers,
          students
        );

        newArrayData.push({
          Class,
        });
      }
      return newArrayData;
    } catch (error: any) {
      throw new CustomError(error.sqlMessage || error.message, 500);
    }
  };
}
