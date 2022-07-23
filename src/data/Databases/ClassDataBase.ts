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
      const result: CLASS[] = await BaseDatabase.connection("CLASS").orderBy(
        "name"
      );
      return result;
    } catch (error: any) {
      throw new CustomError(error.sqlMessage || error.message, 500);
    }
  };


}
