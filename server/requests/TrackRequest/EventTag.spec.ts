import { assert } from "chai";
import EventTag from "./EventTag";

describe("EventTag", () => {
  it("Should throw an error if value contain more then 32 charset", () => {
    assert.throw(() => EventTag.create("a".repeat(33)));
  });
  it("Should throw an error if contain less then 4 charset", () => {
    assert.throw(() => EventTag.create("bbb"));
  });
  it("Should convert passed value to lower case", () => {
    const name = EventTag.create("AABBNNMMQQ");
    assert.strictEqual(name.getValue(), "aabbnnmmqq");
  });
  it("Should remove non alphabetic symbols", () => {
    const name = EventTag.create("hello-world!!111");
    assert.strictEqual(name.getValue(), "helloworld");
  });
});
