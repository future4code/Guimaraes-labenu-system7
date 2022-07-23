import { CLASS } from "../classes/class";
import { CustomError } from "../error/customError";
import { BaseDatabase } from "./BaseDatabase";

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
      let students;
      let newArrayData: any = [];
      const result: any = await BaseDatabase.connection
        .select("c.id as classId", "c.name as class_Name", "c.module")
        .from("CLASS as c")
        .orderBy("name");
      for (let element of result) {
        students = await BaseDatabase.connection("STUDENTS as s")
          .select(
            "s.id as studentId",
            "s.name",
            "s.email",
            "s.birth_date as birthDate",
            "s.class_id"
          )
          .where("s.class_id", element.classId);

        for (const student of students) {
          let newDateSplit = new Date(student.birthDate)
            .toISOString()
            .split("T");
          let newBirthDate = newDateSplit[0].split("-").reverse().join("/");
          student.birthDate = newBirthDate;
        }

        newArrayData.push({
          id: element.classId,
          name: element.class_Name,
          module: element.module,
          teachers: element.teachers,
          students,
        });
      }
      return newArrayData;
    } catch (error: any) {
      throw new CustomError(error.sqlMessage || error.message, 500);
    }
  };
}
