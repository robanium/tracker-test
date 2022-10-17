import { assert } from "chai";
import EventTime from "./EventTime";

describe("EventTime", () => {
  it("Should throw an error if value is empty", () => {
    assert.throw(() => EventTime.create(""));
  });
});
