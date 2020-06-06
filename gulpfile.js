"use strict";

// modules:
var gulp = require("gulp");
var pug = require("gulp-pug");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var autoprefixer = require("gulp-autoprefixer");
var browsersync = require("browser-sync").create();

// sources:
var pug_src = "src/index.pug";
var sass_src = "src/styles/style.scss";
var script_src = "src/scripts/*.js";

// tasks:
gulp.task("pug", function () {
  return gulp
    .src("src/index.pug")
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest("build"))
    .on("end", browsersync.reload);
});

gulp.task("sass", function () {
  return gulp
    .src("src/styles/style.scss")
    .pipe(sass({ outputStyle: "normal" }).on("error", sass.logError))
    .pipe(autoprefixer(["last 10 versions"]))
    .pipe(gulp.dest("build"))
    .pipe(
      browsersync.reload({
        stream: true,
      })
    );
});

gulp.task("script", function () {
  return gulp.src(script_src).pipe(gulp.dest("build/"));
});

gulp.task("serve", function () {
  browsersync.init({
    server: "build",
    notify: false,
  });
});

gulp.task("watch", function () {
  gulp.watch(pug_src, gulp.series("pug"));
  gulp.watch(script_src, gulp.series("script"));
  gulp.watch("src/styles/style.scss", gulp.series("sass"));
});

gulp.task(
  "default",
  gulp.series(
    gulp.parallel("pug", "sass", "script"),
    gulp.parallel("serve", "watch")
  )
);
