import { USER, USER_INTERFACE } from "./user";

export class Student extends USER implements USER_INTERFACE{
    constructor(
        private class_id: string,
        private hobby:string[],
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
    getHobby():string[]{
        return this.hobby
    }
    setHobby(newHobby:string):void{
        this.hobby = [...this.hobby, newHobby ]
    }
}