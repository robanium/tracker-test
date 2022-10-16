export default interface TrackerOptions {
  /**
   * URL address for sync events
   */
  address: string;
  /**
   * Max number of events for force sync
   */
  syncMaxEvents: number;
  /**
   * Time interval sync in ms
   */
  syncTimeInterval: number;
}
