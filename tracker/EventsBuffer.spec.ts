import { assert } from "chai";
import TrackerEvent from "./TrackerEvent";
import EventsBuffer from "./EventsBuffer";

describe("EventsBuffer", function () {
  describe("push()", () => {
    describe("If buff is empty", () => {
      it("Should push an event", () => {
        const buff = new EventsBuffer<TrackerEvent>();
        const event1 = new TrackerEvent("click1");
        buff.push(event1);

        assert.strictEqual(buff.size(), 1);
        assert.deepStrictEqual(event1, buff.pops()[0]);
      });
      it("Should push array of events", () => {
        const buff = new EventsBuffer<TrackerEvent>();
        const event1 = new TrackerEvent("click1");
        const event2 = new TrackerEvent("click2");
        const event3 = new TrackerEvent("click3");
        const events = [event1, event2, event3];
        buff.push(events);

        assert.strictEqual(buff.size(), 3);
        assert.deepStrictEqual(events, buff.pops());
      });
    });
    describe("If buff is not empty", () => {
      it("Should append an event", () => {
        const buff = new EventsBuffer<TrackerEvent>();
        const event1 = new TrackerEvent("click1");
        buff.push(event1);

        // Append a new event
        const event2 = new TrackerEvent("click2");
        buff.push(event2);

        assert.strictEqual(buff.size(), 2);
        assert.deepStrictEqual([event1, event2], buff.pops());
      });
      it("Should append an array of events", () => {
        const buff = new EventsBuffer<TrackerEvent>();

        const event0 = new TrackerEvent("click0");
        buff.push(event0);

        const event1 = new TrackerEvent("click1");
        const event2 = new TrackerEvent("click2");
        const event3 = new TrackerEvent("click3");
        const events = [event1, event2, event3];
        buff.push(events);

        assert.strictEqual(buff.size(), 4);
        assert.deepStrictEqual([event0, ...events], buff.pops());
      });
    });
  });
  describe("pops()", () => {
    it("After call, should empty a buffer", () => {
      const buff = new EventsBuffer<TrackerEvent>();
      const event1 = new TrackerEvent("click1");
      const event2 = new TrackerEvent("click2");
      const event3 = new TrackerEvent("click3");
      const events = [event1, event2, event3];
      buff.push(events);
      buff.pops();

      assert.strictEqual(buff.size(), 0);
    });
    it("Should not append new events to returned list of events", () => {
      const buff = new EventsBuffer<TrackerEvent>();
      const event1 = new TrackerEvent("click1");
      const event2 = new TrackerEvent("click2");
      const event3 = new TrackerEvent("click3");
      const events = [event1, event2, event3];
      buff.push(events);

      const extractedEvents = buff.pops();
      assert.deepStrictEqual(events, extractedEvents);
      assert.strictEqual(buff.size(), 0);

      const event4 = new TrackerEvent("pageview");
      buff.push(event4);

      assert.strictEqual(buff.size(), 1);
      assert.strictEqual(extractedEvents.length, 3);
    });
  });
});
