import { USER } from "./user";

export class Teacher extends USER {
  constructor(
    id: string,
    name: string,
    email: string,
    birth_date: string,
    class_id: string,
    private specialties: string[]
  ) {
    super(id, name, email, birth_date, class_id);
  }
  getSpecialties(): string[] {
    return this.specialties;
  }
}
