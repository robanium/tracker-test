import { v4 as uuid } from "uuid";

interface ITracker {
  track(event: string, ...tags: string[]): void;
}

class Tracker implements ITracker {
  private buff: Map<string, object> = new Map();

  private async send(data: object[]) {
    const response = await fetch("http://localhost:8001/track", {
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
    console.log("[tracker] Start sync with server");

    const events = Array.from(this.buff.values());
    const response = await this.send(events);
    console.log(response);
  }

  public track(event: string, ...tags: string[]): void {
    this.buff.set(uuid(), {
      event: event,
      tags: tags,
    });

    // @ts-ignore
    if (!(this.buff.size % 3)) {
      console.log("[tracker] Buffer Size has " + this.buff.size + " items");
      this.sync();
    }
  }
}

export default new Tracker();
