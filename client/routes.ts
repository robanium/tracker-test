import { Request, Response, Router } from "express";

const routes = Router();

routes.get("/*", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/views/index.html");
});

export default routes;
