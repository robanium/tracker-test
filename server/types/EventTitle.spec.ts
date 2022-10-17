import { assert } from "chai";
import EventTitle from "./EventTitle";

describe("EventTitle", () => {
  it("Should throw an error if value contain more then 512 charset", () => {
    assert.throw(() => EventTitle.create("a".repeat(513)));
  });
});
