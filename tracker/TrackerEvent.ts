export default class TrackerEvent {
  /**
   * Event name
   */
  public event: string;

  /**
   * List of event tags
   */
  public tags: string[];

  /**
   * URL address of page
   */
  public url: string;

  /**
   * Title of page (document.title)
   */
  public title: string;

  /**
   * Browser time in ISO format
   */
  public ts: string;

  /**
   * @param event Event name
   * @param tags List of tags
   */
  public constructor(event: string, tags?: string[]) {
    if (event.length === 0) {
      throw new Error("Event name should not be empty string");
    }
    this.event = event;
    this.tags = tags || [];
    this.url = document.URL;
    this.title = document.title;
    this.ts = new Date().toISOString();
  }
}
