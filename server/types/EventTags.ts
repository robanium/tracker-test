import { z } from "zod";
import EventTag from "./EventTag";

export default class EventTags {
  private value: EventTag[] = [];

  static create(value?: EventTag[]) {
    return new EventTags(value);
  }

  private validate(value: EventTag[]): void {
    if (value.length > 16) throw new Error("Cant contain more then 16 tags");
  }

  public getValue(): EventTag[] {
    return this.value;
  }

  public constructor(value?: EventTag[]) {
    value = value || [];
    this.validate(value);
    this.value = value;
  }
}
