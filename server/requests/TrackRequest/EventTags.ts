import { z } from "zod";
import EventTag from "./EventTag";

export default class EventTags {
  private value: EventTag[] = [];

  static create(value?: string[]) {
    return new EventTags(value);
  }

  private validate(value: EventTag[]): void {
    if (value.length > 16) throw new Error("Cant contain more then 16 tags");
  }

  public getValue(): string[] {
    return this.value.map((x) => x.getValue());
  }

  public constructor(value?: string[]) {
    value = value || [];
    const tags = value.map((x) => EventTag.create(x));
    this.validate(tags);
    this.value = tags;
  }
}
