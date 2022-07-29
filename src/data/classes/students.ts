import { USER } from "./user";

export class Student extends USER {
  constructor(
    id: string,
    name: string,
    email: string,
    birth_date: string,
    class_id: string,
    private hobby: string[]
  ) {
    super(id, name, email, birth_date, class_id);
  }
  getHobby(): string[] {
    return this.hobby;
  }
}
