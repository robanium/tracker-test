import { assert } from "chai";
import EventURL from "./EventURL";

describe("EventURL", () => {
  it("Should throw an error if value is not URL", () => {
    assert.throw(() => EventURL.create("test@test.ru"));
    assert.throw(() => EventURL.create("sadasdasdsad"));
  });
  it("Should throw an error if value is empty", () => {
    assert.throw(() => EventURL.create(""));
  });
  it("Should not throw an error if value is URL", () => {
    assert.doesNotThrow(() =>
      EventURL.create("http://hello.com:8585/page/?dr=1&rt=7")
    );
  });
});
