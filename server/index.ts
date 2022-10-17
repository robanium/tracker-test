import express, { Request, Response } from "express";
import mongoose from "mongoose";
import routes from "./routes";
import cors from "cors";

export default async function (config: any) {
  const app = express();

  app.disable("etag");
  app.disable("x-powered-by");
  app.use(cors(config.cors || {}));
  app.use(routes);

  try {
    // Connect to mongodb
    const uri =
      "mongodb://" + config.mongodb.address + ":" + config.mongodb.port;
    await mongoose.connect(uri, {
      dbName: config.mongodb.dbname,
      user: config.mongodb.user,
      pass: config.mongodb.pass,
    });

    // Start server
    app.listen(config.port, config.address, () => {
      console.log(
        "Backend Server Started at http://" +
          config.address +
          ":" +
          config.port +
          "/"
      );
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
