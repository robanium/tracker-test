import { assert } from "chai";
import { JSDOM } from "jsdom";
import sinon from "sinon";
import TrackerEvent from "./TrackerEvent";

const dom = new JSDOM(
  `
<!DOCTYPE html>
  <html>
    <head><title>My Title</title></head>
    <body></body>
 </html>`,
  { url: "http://mywebsite.com/" }
);

//@ts-ignore
global.window = dom.window;
global.document = dom.window.document;

describe("TrackerEvent", () => {
  describe("constructor()", () => {
    it("Should set title as document.title", () => {
      const event = new TrackerEvent("pageview", []);
      assert.strictEqual(event.title, "My Title");
    });
    it("Should set Date in ISO format", () => {
      const now = new Date();
      const clock = sinon.useFakeTimers(now.getTime());

      const currentTime = new Date().toISOString();

      const event = new TrackerEvent("pageview", []);
      assert.strictEqual(currentTime, event.ts);

      clock.restore();
    });
    it("Should set url from document.URL", function () {
      const event = new TrackerEvent("pageview", []);
      assert.strictEqual(event.url, "http://mywebsite.com/");
    });
    it("Should set tags if was passed", () => {
      const tags = ["one", "two", "etc"];
      const event = new TrackerEvent("pageview", tags);
      assert.isArray(event.tags);
      assert.deepStrictEqual(event.tags, ["one", "two", "etc"]);
    });
    it("If tags was not passed, should set as []", () => {
      const event = new TrackerEvent("pageview");
      assert.isArray(event.tags);
      assert.strictEqual(event.tags.length, 0);
    });
    it("If event name is empty, should throw an Error", () => {
      assert.throw(() => new TrackerEvent(""));
    });
  });
});
