import { Request, Response, Router } from "express";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/assets/tracker.js");
});

export default routes;
