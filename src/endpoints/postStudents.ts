import { Student } from "./../data/classes/students";
import { Request, Response } from "express";
import { v4 as generateId } from "uuid";
import { CustomError } from "../data/error/customError";
import { messageStatus } from "../data/error/statusCodes";
import { StudentDataBase } from "../data/Databases/StudentDataBase";
import { MailDataBase } from "../data/classes/mailTransporter";

export const postStudents = async (req: Request, res: Response) => {
  try {
    const { name, email, birthDate, classId, hobbies }: any = req.body;

    if (!name || !email || !birthDate || !classId || !hobbies) {
      throw new CustomError(
        "MISSING PARAMETERS, PLEASE VERIFY DATA´S SENT",
        422
      );
    }
    const newStudent: Student = new Student(
      generateId(),
      name,
      email,
      birthDate,
      classId,
      hobbies
    );
    // AQUI CRIO UMA NOVA INSTÂNCIA DE USUÁRIO

    const studentDB = new StudentDataBase();

    // AQUI ENVIO ESSA NOVA INSTÂNCIA PRA TABELA DE USUÁRIOS

    await studentDB.createStudent(newStudent);

    // AQUI ENVIO ESSE O ARRAY DE HOBBIES PRA FUNÇÃO QUE IRÁ FAZER UM LOOP E INSERIR NA TABELA DE HOBBYS INDIVIDUALMENTE E jÁ CRIO UM NOVA RELAÇÃO ENTRE O ESTUDANTE E O HOBBY USANDO OS DADOS QUE ACABARAM DE SER CRIADOS
    await studentDB.createHobbies(hobbies, newStudent);
    const sendEmail = new MailDataBase();
    sendEmail.sendEmail(newStudent.getEmail(), newStudent.getName());
  } catch (error: any) {
    res.status(error.statusCode).send(error.message);
  } finally {
    res.status(200).send(messageStatus.SUCCESS.message);
  }
};
