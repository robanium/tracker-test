export default class EventsBuffer<T> {
  /**
   * List of events
   */
  private buff: T[] = [];

  /**
   * Append event(s) to buff
   * @param event: T[]
   */
  public push(event: T | T[]): void {
    const ev = Array.isArray(event) ? event : [event];
    this.buff = this.buff.concat(event);
  }

  /**
   * @returns total events
   */
  public size(): number {
    return this.buff.length;
  }

  /**
   * Return all contains events and empty buffer
   * @returns all event
   */
  public pops(): T[] {
    const resultBuff = this.buff;
    this.buff = [];
    return resultBuff;
  }
}
