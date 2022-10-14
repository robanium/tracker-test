interface ITracker {
  track(event: string, ...tags: string[]): void;
}

class Tracker implements ITracker {
  public track(event: string, ...tags: string[]): void {
    console.log(event, tags);
  }
}

export default new Tracker();
