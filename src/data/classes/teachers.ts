import { USER, USER_INTERFACE } from "./user";

export class Teacher extends USER implements USER_INTERFACE{
    constructor(
        private class_id: string,
        private specialties:string,
        id:string, 
        name:string, 
        email:string, 
        birth_date:string
        ){
        super(id, name, email, birth_date)
    }
    getClassId(): string{
        return this.class_id
    }
    getSpecialties(): string{
        return this.specialties
    }
    setSpecialties(newSpecialtie: string):void{
        this.specialties = newSpecialtie
    }
}