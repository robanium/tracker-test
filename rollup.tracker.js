const typescript = require("@rollup/plugin-typescript");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const json = require("@rollup/plugin-json");

export default {
  input: "tracker/index.ts",
  output: {
    file: __dirname + "/.build/server/assets/tracker.js",
    name: "tracker",
    format: "iife",
  },
  plugins: [
    json(),
    nodeResolve(),
    typescript({
      tsconfig: __dirname + "/tsconfig.tracker.json",
    }),
  ],
};
