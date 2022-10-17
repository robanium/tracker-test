import EventName from "./EventName";
import EventTags from "./EventTags";
import EventTag from "./EventTag";
import EventTitle from "./EventTitle";
import EventURL from "./EventURL";
import EventTime from "./EventTime";

export default class TrackEventRequest {
  private event: EventName;
  private tags: EventTags;
  private title: EventTitle;
  private url: EventURL;
  private ts: EventTime;

  public getValue() {
    return {
      event: this.event.getValue(),
      title: this.title.getValue(),
      tags: this.tags.getValue(),
      url: this.url.getValue(),
      ts: this.ts.getValue(),
    };
  }

  public constructor(prop: any) {
    this.event = EventName.create(prop.event);
    this.tags = EventTags.create(prop.tags || []);
    this.title = EventTitle.create(prop.title);
    this.url = EventURL.create(prop.url);
    this.ts = EventTime.create(prop.ts);
  }
}
