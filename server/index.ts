import express, { Request, Response } from "express";
import routes from "./routes";
import cors from "cors";

export default function (config: any) {
  const app = express();

  app.disable("etag");
  app.disable("x-powered-by");
  app.use(cors(config.cors || {}));
  app.use(routes);

  app.listen(config.port, config.address, () => {
    console.log(
      "Backend Server Started at http://" +
        config.address +
        ":" +
        config.port +
        "/"
    );
  });
}
