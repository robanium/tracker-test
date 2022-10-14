const execSync = require("child_process").execSync;
const gulp = require("gulp");
const del = require("delete");
const nodemon = require("nodemon");

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
  gulp.watch("./tracker/**/*", Tracker_compile);
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
  ClientAndServer_nodemon
);

exports.default = function (done) {
  console.log("Default Build");
  done();
};
