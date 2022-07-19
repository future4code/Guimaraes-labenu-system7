import { CLASS } from "../classes/class";
import { CustomError } from "../error/customError";
import { BaseDatabase } from "./BaseDatabase";

export class ClassDataBase extends BaseDatabase {

    //AQUI NAO ACEITA O "Class" com letra minuscula, nao sei porque.... "
    public createClass = async (Class:CLASS) => {
        try {
            await BaseDatabase.connection("CLASS")
            .insert(Class)       
        } catch (error:any) {
           throw new CustomError(error.sqlMessage || error.message, 500)
        }     
    }
}