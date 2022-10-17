import { z } from "zod";

export default class EventURL {
  private value: string;

  static create(value: string) {
    return new EventURL(value);
  }

  private normalize(value: string) {
    return value.toLowerCase();
  }

  private validate(value: string): void {
    let validator = z.string().url();
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
