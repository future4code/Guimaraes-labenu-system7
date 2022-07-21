import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { CustomError } from "../error/customError";

dotenv.config();

export class MailDataBase {
  protected static mailTransporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
    tls: { ciphers: "SSLv3" },
  });
  
  public sendEmail = async (email: string, name: string): Promise<void> => {
    try {
      await MailDataBase.mailTransporter.sendMail({
        from: "<submit-backend-crhis@hotmail.com>",
        to: email,
        subject: "Cadastro Efetuado",
        text: "BOAS VINDAS !!!!",
        html: `<p> " Olá ${name}, Seu Cadastro Foi concluído com Sucesso"</p>`,
      });
    } catch (error: any) {
      throw new CustomError("NODE_MAILER_ERROR", 404);
    }
  };
}
