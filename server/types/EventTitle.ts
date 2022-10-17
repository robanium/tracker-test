import { z } from "zod";

export default class EventTitle {
  private value: string;

  static create(value: string) {
    return new EventTitle(value);
  }

  private validate(value: string): void {
    let validator = z.string().max(512);
    validator.parse(value);
  }

  public getValue(): string {
    return this.value;
  }

  public constructor(value: string) {
    this.validate(value);
    this.value = value;
  }
}
