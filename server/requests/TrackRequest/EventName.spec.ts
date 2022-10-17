import { assert } from "chai";
import EventName from "./EventName";

describe("EventName", () => {
  it("Should throw an error if value contain more then 32 charset", () => {
    assert.throw(() =>
      EventName.create("opqwepoqwepklsaksaldksaldlmlkfdslkdsf")
    );
  });
  it("Should throw an error if contain less then 4 charset", () => {
    assert.throw(() => EventName.create("wer"));
  });
  it("Should convert passed value to lower case", () => {
    const name = EventName.create("AABBNNMMQQ");
    assert.strictEqual(name.getValue(), "aabbnnmmqq");
  });
});
