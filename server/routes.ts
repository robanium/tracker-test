import express, { Request, Response, Router } from "express";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/assets/tracker.js");
});

routes.post(
  "/track",
  express.json({ type: ["text/plain", "application/json"] }),
  (req: Request, res: Response) => {
    console.log(req.body);
    res.status(200).json({ status: 200 });
  }
);

export default routes;
