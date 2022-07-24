import { Teacher } from "./../data/classes/teachers";
import { Request, Response } from "express";
import { v4 as generateId } from "uuid";
import { CustomError } from "../data/error/customError";
import { messageStatus } from "../data/error/statusCodes";
import { TeacherDataBase } from "../data/Databases/TeacherDataBase";
import { MailDataBase } from "../data/classes/mailTransporter";

export const postTeacher = async (req: Request, res: Response) => {
  try {
    const { name, email, birthDate, classId, specialties }: any = req.body;
    const newDateSplit = new Date(birthDate).toISOString().split("T");
    const newBirthDate = newDateSplit[0];

    if (!name || !email || !birthDate || !classId || !specialties) {
      throw new CustomError(
        "MISSING PARAMETERS, PLEASE VERIFY DATA´S SENT",
        422
      );
    }
    const newTeacher: Teacher = new Teacher(
      generateId(),
      name,
      email,
      newBirthDate,
      classId,
      specialties
    );
    // AQUI CRIO UMA NOVA INSTÂNCIA DE TEACHER

    const teacherDB = new TeacherDataBase();

    // AQUI ENVIO ESSA NOVA INSTÂNCIA PRA TABELA DE TEACHERS

    await teacherDB.createTeacher(newTeacher);

    // AQUI ENVIO O ARRAY DE ESPECIALIDADES RECEBIDOS NO BODY PRA FUNÇÃO QUE IRÁ FAZER UM LOOP E VERIFICAR SE ALGUMA DESSAS ESPECIALIDADES JÁ EXISTEM NA TABELA DE ESPECIALIDADES, SE ALGUMA EXISTIR BUSCA O ID DELA E JÁ FAZ A INSERÇÃO NA TABELA DE RELAÇÕES DE ESPECIALIDADES E TEACHERS, SE NÃO EXISTIR ELA INSERE NA TABELA DE ESPECIALIDADES INDIVIDUALMENTE E jÁ CRIA UM NOVA RELAÇÃO ENTRE O TEACHER E O ESPECIALIDADES USANDO OS DADOS QUE ACABARAM DE SER CRIADOS
    await teacherDB.createSpecialties(specialties, newTeacher);

    const sendEmail = new MailDataBase();
    sendEmail.sendEmail(newTeacher.getEmail(), newTeacher.getName());

    res.status(200).send(messageStatus.SUCCESS.message);
  } catch (error: any) {
    res.status(error.statusCode).send(error.message);
  }
};
