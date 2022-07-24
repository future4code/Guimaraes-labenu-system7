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
<<<<<<< HEAD

=======
>>>>>>> 8920edd51dfdd3850ad56818d54df88f6897dc83
  public createSpecialties = async (
    specialties: string[],
    teacher: Teacher
  ): Promise<void> => {
<<<<<<< HEAD
=======
    let newSpecialty: any = {};
    let newTeacherSpecialty: any = {};

>>>>>>> 8920edd51dfdd3850ad56818d54df88f6897dc83
    try {
      specialties.forEach(async (specialty: string) => {
        const hobbies = await BaseDatabase.connection("SPECIALTY")
          .select("id", "name")
          .where("name", specialty);
<<<<<<< HEAD
        if (hobbies.length) {
=======
        if (specialties.length) {
>>>>>>> 8920edd51dfdd3850ad56818d54df88f6897dc83
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
<<<<<<< HEAD
            let newSpecialty: any = {
              id: generateId(),
              name: specialty,
            };
            let newTeacherSpecialty = {
              id: generateId(),
              teacher_id: teacher.getId(),
              specialty_id: newSpecialty.id,
=======
            newSpecialty = {
              id: generateId(),
              name: specialty,
            };
            newTeacherSpecialty = {
              id: generateId(),
              student_id: teacher.getId(),
              hobby_id: newSpecialty.id,
>>>>>>> 8920edd51dfdd3850ad56818d54df88f6897dc83
            };
            await BaseDatabase.connection("SPECIALTY").insert(newSpecialty);
            await BaseDatabase.connection("TEACHER_SPECIALTY").insert(
              newTeacherSpecialty
            );
          }
        }
<<<<<<< HEAD
        let newSpecialty: any = {
          id: generateId(),
          name: specialty,
        };
        let newTeacherSpecialty = {
          id: generateId(),
          teacher_id: teacher.getId(),
          specialty_id: newSpecialty.id,
=======
        newSpecialty = {
          id: generateId(),
          name: specialty,
        };
        newTeacherSpecialty = {
          id: generateId(),
          student_id: teacher.getId(),
          hobby_id: newSpecialty.id,
>>>>>>> 8920edd51dfdd3850ad56818d54df88f6897dc83
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
