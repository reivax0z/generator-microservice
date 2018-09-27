var gulp = require("gulp");
var del = require('del');
var ts = require("gulp-typescript");
var addsrc = require('gulp-add-src');
var tslint = require('gulp-tslint');

// config for Typescript
var tsProject = ts.createProject("tsconfig.json");

gulp.task("clean", () => {
  return del(['dist']);
});

gulp.task("lint", function() {
    return gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
});

gulp.task("compile", ["clean", "lint"], () => {
    return tsProject.src()
        .pipe(tsProject())
        .once("error", function () {
          this.once("finish", () => process.exit(1));
        })
        .js
        .pipe(addsrc('src/**/*.txt'))
        .pipe(gulp.dest("dist"));
});

gulp.task("default", ["compile"]);
