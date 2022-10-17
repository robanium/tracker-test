import { assert } from "chai";
import EventTags from "./EventTags";
import EventTag from "./EventTag";

describe("EventTags", () => {
  it("Should pass an empty array", () => {
    assert.doesNotThrow(() => EventTags.create());
  });
  it("If do not pass argument, should set it as empty array", () => {
    const tags = EventTags.create();
    assert.deepStrictEqual(tags.getValue(), []);
  });
  it("Cant has more then 16 items", () => {
    const tags = Array(17).fill(EventTag.create("tagname"));
    assert.throw(() => EventTags.create(tags));
  });
});
