import { z } from "zod";

export default class EventTag {
  private value: string;

  static create(value: string) {
    return new EventTag(value);
  }

  private normalize(value: string) {
    return value.toLowerCase().replace(/[^a-z]/g, "");
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
