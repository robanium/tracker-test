import Tracker from "./Tracker";
import EventsBuffer from "./EventsBuffer";
import TrackerEvent from "./TrackerEvent";
import config from "../config.tracker.json";

export default new Tracker(new EventsBuffer<TrackerEvent>(), config);
