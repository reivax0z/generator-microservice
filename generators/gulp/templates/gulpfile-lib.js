var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var merge = require('merge2');

// config for Typescript
var tsProject = ts.createProject('tsconfig.json', {
  declaration: true
});

gulp.task('clean', () => {
  return del(['lib']);
});

gulp.task('lint', () => {
  return gulp.src('src/**/*.ts')
    .pipe(tslint({
      formatter: 'verbose'
    }))
    .pipe(tslint.report())
});

gulp.task('compile', ['clean', 'lint'], () => {
  var tsResult = tsProject.src()
    .pipe(tsProject())
    .once("error", function () {
      this.once("finish", () => process.exit(1));
    });

  return merge([
    tsResult.dts.pipe(gulp.dest('lib/definitions')),
    tsResult.js.pipe(gulp.dest('lib/js'))
  ]);
});

gulp.task('default', ['compile']);
