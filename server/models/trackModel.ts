import mongoose, { Schema } from "mongoose";

const TrackScheme: Schema = new Schema({
  event: { type: String, required: true },
  tags: { type: [String], required: true },
  url: { type: String, required: true },
  title: { type: String, required: true },
  ts: { type: Date, required: true },
});

export default mongoose.model("Track", TrackScheme);
