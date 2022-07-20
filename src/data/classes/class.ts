export class CLASS {
  constructor(
    protected id: string,
    protected name: string,
    protected module: number
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
}
