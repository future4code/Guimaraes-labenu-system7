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
    const newDateSplit = new Date(birthDate).toISOString().split("T");
    const newBirthDate = newDateSplit[0];

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
      newBirthDate,
      classId,
      hobbies
    );
    // AQUI CRIO UMA NOVA INSTÂNCIA DE ESTUDANTE

    const studentDB = new StudentDataBase();

    // AQUI ENVIO ESSA NOVA INSTÂNCIA PRA TABELA DE ESTUDANTES

     await studentDB.createStudent(newStudent);

    // AQUI ENVIO O ARRAY DE HOBBIES RECEBIDOS NO BODY PRA FUNÇÃO QUE IRÁ FAZER UM LOOP E VERIFICAR SE ALGUM DESSES HOBBIES JÁ EXISTEM NA TABELA DE HOBBY, SE ALGUM EXISTIR BUSCA O ID DELE E JÁ FAZ A INSERÇÃO NA TABELA DE RELAÇÕES DE HOBBYS E ESTUDANTES, SE NÃO EXISTIR ELA INSERE NA TABELA DE HOBBYS INDIVIDUALMENTE E jÁ CRIA UM NOVA RELAÇÃO ENTRE O ESTUDANTE E O HOBBY USANDO OS DADOS QUE ACABARAM DE SER CRIADOS
    await studentDB.createHobbies(hobbies, newStudent);

    const sendEmail = new MailDataBase();
    sendEmail.sendEmail(newStudent.getEmail(), newStudent.getName());
    
    res.status(200).send(messageStatus.SUCCESS.message);

  } catch (error: any) {
    res.status(error.statusCode).send(error.message);
  }
};