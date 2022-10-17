import EventsBuffer from "./EventsBuffer";
import TrackerEvent from "./TrackerEvent";
import TrackerOptions from "./TrackerOptions";

interface ITracker {
  track(event: string, ...tags: string[]): void;
}

export default class Tracker implements ITracker {
  /**
   * Buffer
   */
  private buff: EventsBuffer<TrackerEvent>;

  /**
   * List of options
   */
  private options: TrackerOptions;

  public constructor(buff: EventsBuffer<TrackerEvent>, config: TrackerOptions) {
    this.buff = buff;
    this.options = config;
    // Handle time interval
    setInterval(this.sync.bind(this), this.options.syncTimeInterval);
    window.addEventListener("DOMContentLoaded", this.onload.bind(this));
  }

  /**
   * Handler of DOMContentLoaded
   */
  private onload() {
    console.log("[tracker] Onload page");

    // Handle close tab/window
    window.addEventListener("beforeunload", this.sync.bind(this));
    window.addEventListener("unload", this.sync.bind(this));

    // A clicks handlers
    let aTags = document.querySelectorAll("a");
    aTags.forEach((element) =>
      element.addEventListener("click", (e: MouseEvent) => this.handleClick(e))
    );
  }

  /**
   * Handle click on link.
   * Force prevent jump to another location and start sync with the server, after
   * sync jump to link location.
   * @param event: MouseEvent
   */
  private async handleClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    console.log(this.buff.size());

    await this.sync();

    // Get url address
    const aElement = event.target as HTMLAnchorElement;
    const url = aElement.href;

    // After sync go to url from a link
    //@ts-ignore
    window.location = url;
  }

  /**
   * Send data to server as simple request to prevent preflight request.
   * @param data data to send
   */
  private async send(data: object[]): Promise<any | undefined> {
    const response = await fetch(this.options.address + "/track", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      // Use text/plain header for disable preflight request
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(data),
    });
    const jsonResponse = await response.json();

    if (jsonResponse.status !== 200) {
      throw new Error("Invalid Request");
    }
  }

  private async sync(): Promise<any> {
    if (this.buff.size() === 0) {
      console.log("[tracker] Buffer has not events to send");
      return;
    }

    // Get all events
    const events = this.buff.pops();

    try {
      // Try to send
      console.log("[tracker] Start sync events with the server");
      await this.send(events);
    } catch (e) {
      // Push all unsended events back to buffer
      console.error("[tracker] Unknown error during synchronization");
      console.log("[tracker] Adding unsent events back to the buffer");
      this.buff.push(events);
    }

    console.log("[tracker] Sync with the server is complete");
  }

  public track(event: string, ...tags: string[]): void {
    this.buff.push(new TrackerEvent(event, tags));
    if (this.buff.size() >= this.options.syncMaxEvents) {
      console.log("[tracker] Buff has " + this.buff.size() + " event(s)");
      this.sync();
    }
  }
}
