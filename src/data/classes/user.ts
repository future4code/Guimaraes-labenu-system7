export class USER {
  constructor(
    protected id: string,
    protected name: string,
    protected email: string,
    protected birth_date: string,
    protected class_id: string
  ) {}
  public getId(): string {
    return this.id;
  }
  public getName(): string {
    return this.name;
  }
  public getEmail(): string {
    return this.email;
  }
  public getBirthDate(): string {
    return this.birth_date;
  }
  public getClassId():string{
    return this.class_id
  }
}
