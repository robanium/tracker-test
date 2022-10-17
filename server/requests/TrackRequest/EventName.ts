import { z } from "zod";

export default class EventName {
  private value: string;

  static create(value: string) {
    return new EventName(value);
  }

  private normalize(value: string) {
    return value.toLowerCase();
  }

  private validate(value: string): void {
    let validator = z.string().min(4).max(32);
    validator.parse(value);
  }

  public getValue(): string {
    return this.value;
  }

  public constructor(value: string) {
    const result = this.normalize(value);
    this.validate(result);
    this.value = result;
  }
}
