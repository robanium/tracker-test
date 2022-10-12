import express, { Request, Response } from "express";
import routes from "./routes";

export default function (config: { port: number; address: string }) {
  const app = express();

  app.use(routes);

  app.listen(config.port, config.address, () => {
    console.log(
      "Client Server Started at http://" +
        config.address +
        ":" +
        config.port +
        "/"
    );
  });
}
