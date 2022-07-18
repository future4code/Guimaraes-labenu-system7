export class CLASS{
    constructor(
        public readonly id: string,
        public readonly name: string,
        private readonly teachers: string,
        private readonly students: string,
        private module: number = 0
    ){}
    getId():string{
        return this.id
    }
    getName():string{
        return this.name
    }
    getTeachers():string{
        return this.teachers
    }
    getStudents():string{
        return this.students
    }
    getModule():number{
        return this.module
    }
    setModule(value:number):void{
        this.module = value
    }
} 
