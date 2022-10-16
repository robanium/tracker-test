import { v4 as uuid } from "uuid";
import config from "../config.tracker.json";

class TrackerEvent {
  /**
   * Event name
   */
  public event: string;

  /**
   * List of event tags
   */
  public tags: string[];

  /**
   * Title of page (document.title)
   */
  public title: string;

  /**
   * Browser time in ISO format
   */
  public ts: string;

  public constructor(event: string, tags: string[]) {
    this.event = event;
    this.tags = tags || [];
    this.title = document.title;
    this.ts = new Date().toISOString();
  }
}

interface ITracker {
  track(event: string, ...tags: string[]): void;
}

class Tracker implements ITracker {
  private buff: Map<string, object> = new Map();

  private options: TrackerOptions = config;

  public constructor() {
    //setInterval(this.sync.bind(this), this.options.syncTimeInterval)
  }

  private async send(data: object[]): Promise<any | undefined> {
    const response = await fetch(this.options.address + "/track", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  }

  private async sync() {
    if (!this.buff.size) {
      console.log("[tracker] No events for sync");
      return;
    }

    console.log("[tracker] Start sync with server");
    const events = Array.from(this.buff.values());
    const response = await this.send(events);

    if (typeof response === "undefined") {
      console.error("[tracker] Unknown sync error ");
    } else if (response.status == 200) {
      console.log("[tracker] Stop sync with server");
      this.buff = new Map();
    }
  }

  public track(event: string, ...tags: string[]): void {
    this.buff.set(uuid(), new TrackerEvent(event, tags));

    // @ts-ignore
    if (!(this.buff.size % 3)) {
      console.log("[tracker] Buffer Size has " + this.buff.size + " items");
      this.sync();
    }
  }
}

export default new Tracker();
