import { assert } from "chai";
import { JSDOM } from "jsdom";
import sinon from "sinon";

import EventsBuffer from "./EventsBuffer";
import TrackerEvent from "./TrackerEvent";
import Tracker from "./Tracker";
import nock from "nock";

describe("Tracker", () => {
  before(function () {
    this.consLog = sinon.stub(console, "log");
    this.consErr = sinon.stub(console, "error");
  });
  after(function () {
    this.consLog.restore();
    this.consErr.restore();
  });
  beforeEach(function () {
    const dom = new JSDOM(
      `
        <!DOCTYPE html>
          <html>
            <head><title>My Title</title></head>
            <body>
              <a href="/1.html" onclick="tracker.track('click1')">Link 1</a>
              <a href="/2.html" onclick="tracker.track('click2')">Link 2</a>
              <a href="/3.html" onclick="tracker.track('click3')">Link 3</a>  
            </body>
        </html>`,
      { url: "http://mywebsite.com/" }
    );

    //@ts-ignore
    global.window = dom.window;
    global.document = dom.window.document;

    //@ts-ignore
    global.clock = sinon.useFakeTimers();
  });
  afterEach(function () {
    //@ts-ignore
    global.clock.restore();
  });

  describe("Event of unload tab/windows", function () {
    it("Should sync event with the server", () => {
      const buffer = new EventsBuffer<TrackerEvent>();
      let tracker = new Tracker(buffer, {
        address: "http://localhost",
        syncMaxEvents: 3,
        syncTimeInterval: 1000,
      });

      window.dispatchEvent(new window.CustomEvent("beforeunload"));
      window.dispatchEvent(new window.CustomEvent("unload"));
    });
  });

  describe("Timer event", function () {
    it("Should sent events by timer interval", async () => {
      const buffer = new EventsBuffer<TrackerEvent>();
      let tracker = new Tracker(buffer, {
        address: "http://localhost",
        syncMaxEvents: 3,
        syncTimeInterval: 1000,
      });

      const stub = sinon
        //@ts-ignore
        .stub(tracker, "send")
        .callsFake(() => Promise.resolve({ status: 200 }));

      tracker.track("pageview");
      //@ts-ignore
      await clock.tickAsync(1250);

      tracker.track("button-click");
      //@ts-ignore
      await clock.tickAsync(1250);

      assert.strictEqual(buffer.size(), 0);

      stub.restore();
    });
  });

  describe("track()", () => {
    it("Should send all events, if buff.size() equal or greater of options.syncMaxEvents", () => {
      const buffer = new EventsBuffer<TrackerEvent>();
      let tracker = new Tracker(buffer, {
        address: "http://localhost",
        syncMaxEvents: 3,
        syncTimeInterval: 1000,
      });

      const stub = sinon
        //@ts-ignore
        .stub(tracker, "send")
        .callsFake(() => Promise.resolve({ status: 200 }));

      tracker.track("pageview");
      tracker.track("click", "test", "test2");
      tracker.track("button", "auth");

      tracker.track("pageview-mob");

      assert.strictEqual(stub.callCount, 1);
      assert.strictEqual(buffer.size(), 1);

      stub.restore();
    });
    it("Should restore buffer if an error occurs", async () => {
      const buffer = new EventsBuffer<TrackerEvent>();
      let tracker = new Tracker(buffer, {
        address: "http://localhost",
        syncMaxEvents: 3,
        syncTimeInterval: 1000,
      });

      //@ts-ignore
      // Simulate network or server error
      const stub = sinon.stub(tracker, "send").callsFake(() => {
        throw new Error("");
      });

      tracker.track("pageview");
      tracker.track("click", "test", "test2");
      await tracker.track("button", "auth");

      stub.restore();

      assert.strictEqual(stub.callCount, 1);
      assert.strictEqual(buffer.size(), 3);
    });
  });
});
