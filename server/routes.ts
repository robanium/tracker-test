import express, { Request, Response, Router } from "express";
import Track from "./models/trackModel";
import TrackEventRequest from "./requests/TrackRequest/TrackEventRequet";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/assets/tracker.js");
});

routes.post(
  "/track",
  express.json({ type: ["text/plain", "application/json"] }),
  (req: Request, res: Response) => {
    try {
      req.body = Array.isArray(req.body) ? req.body : [req.body];

      const trackReq = req.body.map((x: object) => {
        const r = new TrackEventRequest(x);
        return r.getValue();
      });

      console.log(trackReq);

      Track.create(trackReq);
      res.status(200).json({ status: 200 });
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: 500 });
    }
  }
);

export default routes;
