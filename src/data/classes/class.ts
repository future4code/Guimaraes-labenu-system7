export class CLASS {
  constructor(
    protected id: string,
    protected name: string,
    protected module: number = 0,
    protected teachers?: [],
    protected students?: [],
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
  getTeachers():[] | undefined{
    return this.teachers
  }
  getStudents():[] | undefined{
    return this.students
  }
  setModule(newModule:number):void{
    this.module = newModule
  }
}
