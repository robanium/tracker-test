const execSync = require("child_process").execSync;
const gulp = require("gulp");
const del = require("delete");

function clean(done) {
  del("./.build/", done);
}

function copyClientView() {
  return gulp
    .src("./client/views/*.html")
    .pipe(gulp.dest("./.build/client/views/"));
}

function compileTypescript(done) {
  execSync("npx tsc --project tsconfig.json", { stdio: "inherit" });
  done();
}

exports.clean = clean;
exports.build = gulp.series(clean, compileTypescript, copyClientView);

exports.default = function (done) {
  console.log("Default Build");
  done();
};
