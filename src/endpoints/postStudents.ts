import { Student } from "./../data/classes/students";
import { Request, Response } from "express";
import { v4 as generateId } from "uuid";
import { CustomError } from "../data/error/customError";
import { messageStatus } from "../data/error/statusCodes";
import { StudentDataBase } from "../data/Databases/StudentDataBase";

export const postStudents = async (req: Request, res: Response) => {
  try {
    const { name, email, birthDate, classId, hobbies }: any = req.body;
    console.log("body", req.body)

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

// AQUI CRIO UM NOVO HOBBY COM A LISTA DE HOBBIES RECEBIDOS NO BODY  

    const newHobby:any = {
      id: generateId(),
      name: hobbies
    }
// AQUI ENVIO ESSE NOVO HOBBY A PRA TABELA DE HOBBYS
    await studentDB.createHobbies(newHobby);

    // AQUI CRIO UM NOVA RELAÇÃO ENTRE O ESTUDANTE E O HOBBY USANDO OS DADOS QUE ACABARAM DE SER CRIADOS

    const newStudentHobby = {
      id: generateId(),
      student_id: newStudent.getId(),
      hobby_id: newHobby.id,
    };

    // AQUI ENVIO ESSA NOVA RELAÇÃO PRA TABELA DE RELAÇÕES ENTRE OS ESTUDANTES E OS HOBBIES
    await studentDB.createStudentHobbies(newStudentHobby);

    res.status(200).send(messageStatus.SUCCESS.message);
  } catch (error: any) {
    res.status(error.statusCode).send(error.message);
  }
};
