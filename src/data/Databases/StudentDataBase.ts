import { Student } from './../classes/students';
import { BaseDatabase } from "./BaseDatabase";
import { v4 as generateId } from "uuid";


export class StudentDataBase extends BaseDatabase{

public create = async (student: Student) =>{
    try {
        await BaseDatabase.connection("STUDENTS")
        .insert(student)
        
    } catch (error:any) {
        console.log("ERROR =>", error.message)  
    }
}

}