const execSync = require("child_process").execSync;
const gulp = require("gulp");
const del = require("delete");
const nodemon = require("nodemon");

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

exports.clean = ClientAndServer_clean;
exports.build = gulp.series(
  ClientAndServer_clean,
  ClientAndServer_compile,
  Tracker_compile,
  Client_CopyView
);
exports.develop = gulp.series(
  exports.build,
  Tracker_WatchCompile,
  ClientAndServer_WatchCompile,
  All_TestWatch,
  ClientAndServer_nodemon
);
exports.test = All_test;

exports.default = function (done) {
  console.log("Default Build");
  done();
};
