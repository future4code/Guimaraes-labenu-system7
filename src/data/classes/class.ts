export class CLASS {
  constructor(
    protected id: string,
    protected name: string,
    protected module: number = 0,
    protected teachers?: string[],
    protected students?: string[],
  ) {}
  getId(): string {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getModule(): number {
    return this.module;
  }
  getTeachers():string[] | undefined{
    return this.teachers
  }
  getStudents():string[] | undefined{
    return this.students
  }
  setModule(newModule:number):void{
    this.module = newModule
  }
}
