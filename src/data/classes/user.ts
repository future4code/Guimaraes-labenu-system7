export interface USER_INTERFACE {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly birth_date: string;

  getId(): string;
  getName(): string;
  getEmail(): string;
  getBirthDate(): string;
}

export class USER implements USER_INTERFACE {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly birth_date: string
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
}
