import { z } from "zod";

export default class EventTime {
  private value: string;

  static create(value: string) {
    return new EventTime(value);
  }

  private validate(value: string): void {
    z.string().nonempty().parse(value);
  }

  public getValue(): string {
    return this.value;
  }

  public constructor(value: string) {
    this.validate(value);
    this.value = value;
  }
}
