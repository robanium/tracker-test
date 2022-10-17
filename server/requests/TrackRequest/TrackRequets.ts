import EventName from "./EventName";
import EventTags from "./EventTags";
import EventTag from "./EventTag";
import EventTitle from "./EventTitle";
import EventURL from "./EventURL";
import EventTime from "./EventTime";

interface ITrackEventRequest {
  event: EventName;
  tags: EventTags;
  title: EventTitle;
  url: EventURL;
  ts: EventTime;
}

export default class TrackEventRequest {
  //@ts-ignore
  private prop: ITrackEventRequest;

  set event(event: string) {
    this.prop.event = EventName.create(event);
  }

  get event() {
    return this.prop.event.getValue();
  }

  set tags(tags: string[]) {
    this.prop.tags = EventTags.create(
      tags.map((tag: string) => EventTag.create(tag))
    );
  }

  get tags() {
    return this.prop.tags.getValue();
  }

  set title(title: string) {
    this.prop.title = EventTitle.create(title);
  }

  get title() {
    return this.prop.title.getValue();
  }

  set url(url: string) {
    this.prop.url = EventURL.create(url);
  }

  get url() {
    return this.prop.url.getValue();
  }

  set ts(ts: string) {
    this.prop.ts = EventTime.create(ts);
  }

  get ts() {
    return this.prop.ts.getValue();
  }

  public constructor(prop: any) {
    prop.tags = prop.tags || [];

    this.event = prop.event;
    this.tags = prop.tags;
    this.title = prop.title;
    this.url = prop.url;
    this.ts = prop.ts;
  }
}
