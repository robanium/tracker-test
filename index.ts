import config from "./config.node.json";
import runClient from "./client";
import runServer from "./server";

// @ts-ignore
runClient(config.client);
// @ts-ignore
runServer(config.server);
