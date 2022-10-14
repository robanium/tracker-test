const typescript = require("@rollup/plugin-typescript");

export default {
  input: "tracker/index.ts",
  output: {
    file: __dirname + "/.build/server/assets/tracker.js",
    name: "tracker",
    format: "iife",
  },
  plugins: [
    typescript({
      tsconfig: __dirname + "/tsconfig.tracker.json",
    }),
  ],
};
