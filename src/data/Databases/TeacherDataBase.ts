import { Teacher } from "./../classes/teachers";
import { BaseDatabase } from "./BaseDatabase";
import { CustomError } from "../error/customError";
import { v4 as generateId } from "uuid";

export class TeacherDataBase extends BaseDatabase {
  public createTeacher = async (teacher: Teacher): Promise<void> => {
    try {
      await BaseDatabase.connection("TEACHERS").insert({
        id: teacher.getId(),
        name: teacher.getName(),
        email: teacher.getEmail(),
        birth_date: teacher.getBirthDate(),
        class_id: teacher.getClassId(),
      });
    } catch (error: any) {
      throw new CustomError(error.sqlMessage || error.message, 500);
    }
  };

  public createSpecialties = async (
    specialties: string[],
    teacher: Teacher
  ): Promise<void> => {
    try {
      specialties.forEach(async (specialty: string) => {
        const hobbies = await BaseDatabase.connection("SPECIALTY")
          .select("id", "name")
          .where("name", specialty);
        if (hobbies.length) {
          for (const element of hobbies) {
            if (element.name === specialty) {
              let newTeacherSpecialty = {
                id: generateId(),
                teacher_id: teacher.getId(),
                specialty_id: element.id,
              };
              await BaseDatabase.connection("TEACHER_SPECIALTY").insert(
                newTeacherSpecialty
              );
              return;
            }
            let newSpecialty: any = {
              id: generateId(),
              name: specialty,
            };
            let newTeacherSpecialty = {
              id: generateId(),
              teacher_id: teacher.getId(),
              specialty_id: newSpecialty.id,
            };
            await BaseDatabase.connection("SPECIALTY").insert(newSpecialty);
            await BaseDatabase.connection("TEACHER_SPECIALTY").insert(
              newTeacherSpecialty
            );
          }
        }
        let newSpecialty: any = {
          id: generateId(),
          name: specialty,
        };
        let newTeacherSpecialty = {
          id: generateId(),
          teacher_id: teacher.getId(),
          specialty_id: newSpecialty.id,
        };
        await BaseDatabase.connection("SPECIALTY").insert(newSpecialty);
        await BaseDatabase.connection("TEACHER_SPECIALTY").insert(
          newTeacherSpecialty
        );
      });
    } catch (error: any) {
      throw new CustomError(error.sqlMessage || error.message, 500);
    }
  };

  public getTeachersList = async (classId: string): Promise<any[]> => {
    try {
      const result: any = await BaseDatabase.connection("TEACHERS as t")
        .select("t.id", "t.name", "t.email", "t.birth_date as birthDate")
        .where("class_id", classId);
      return result;
    } catch (error: any) {
      throw new CustomError(error.sqlMessage || error.message, 500);
    }
  };
}
