const execSync = require("child_process").execSync;
const gulp = require("gulp");
const del = require("delete");
const nodemon = require("nodemon");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");
const config = require("./config.node.json");

function All_test(done) {
  /**
   * See: https://www.npmjs.com/package/ts-node#import-statements
   * You may need tsconfig.json compiler options for module to be something other than commonjs.
   * You can still set it to commonjs only for testing. The workaround is to set the environment variable
   * TS_NODE_COMPILER_OPTIONS when executing mocha to give ts-node a module setting of commonjs.
   * For example, in package.json:
   */
  execSync(
    'env TS_NODE_COMPILER_OPTIONS=\'{"module": "commonjs" }\' npx mocha --config .mocharc.json',
    { stdio: "inherit" }
  );
  done();
}

async function Server_StartMongodbInMemory() {
  // This will create an new instance of "MongoMemoryServer" and automatically start it
  const mongodbServer = await MongoMemoryServer.create({
    instance: {
      ip: config.server.mongodb.address,
      port: config.server.mongodb.port,
      dbName: config.server.mongodb.dbname,
    },
  });

  // Create a track collection
  const uri = mongodbServer.getUri() + "/" + config.server.mongodb.dbname;
  const con = await MongoClient.connect(uri);
  const db = con.db(config.server.mongodb.dbname);
  db.createCollection("tracks");
}

function All_TestWatch(done) {
  gulp.watch(["**/*.spec.ts"], All_test);
  done();
}

function ClientAndServer_clean(done) {
  del("./.build/", done);
}

function Client_CopyView() {
  return gulp
    .src("./client/views/*.html")
    .pipe(gulp.dest("./.build/client/views/"));
}

function ClientAndServer_compile(done) {
  execSync("npx tsc --project tsconfig.node.json", { stdio: "inherit" });
  done();
}

function Tracker_compile(done) {
  execSync("npx rollup --config rollup.tracker.js --bundleConfigAsCjs", {
    stdio: "inherit",
  });
  done();
}

function Tracker_WatchCompile(done) {
  gulp.watch(
    ["./tracker/**/*.ts", "config.tracker.json", "!./tracker/**/*.spec.ts"],
    Tracker_compile
  );
  done();
}

function ClientAndServer_WatchCompile(done) {
  gulp.watch(["./server/**/*", "./client/**/*"], ClientAndServer_compile);
  done();
}

function ClientAndServer_nodemon() {
  nodemon({
    watch: ["./.build/server/**/*", "./.build/client/**/*"],
    ignore: ["./.build/server/assets/*"],
    script: "./.build/index.js",
    ext: "js json",
  });
}

function ClientAndServer_Run(done) {
  execSync("node ./.build/index.js", { stdio: "inherit" });
  done();
}

exports.clean = ClientAndServer_clean;
exports.build = gulp.series(
  ClientAndServer_clean,
  ClientAndServer_compile,
  Tracker_compile,
  Client_CopyView
);
exports.develop = gulp.series(
  exports.build,
  Server_StartMongodbInMemory,
  Tracker_WatchCompile,
  ClientAndServer_WatchCompile,
  All_TestWatch,
  ClientAndServer_nodemon
);
exports.start = gulp.series(
  exports.build,
  Server_StartMongodbInMemory,
  ClientAndServer_Run
);
exports.test = All_test;

exports.default = exports.develop;
