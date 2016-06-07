'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var paths = {
  scss: './src/**/*.scss',
  html: './src/**/*.html',
  dist: './dist'
};

gulp.task('sass', function () {
  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('sass:watch', function () {
  gulp.watch(paths.scss, ['sass']);
});

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.dist))
});

gulp.task('serve', ['sass', 'html'], function() {
  browserSync.init({
    server: paths.dist
  });

  gulp.watch(paths.scss, ['sass']);
  gulp.watch(paths.html, ['html'])
  gulp.watch(paths.dist).on('change', browserSync.reload);
});

gulp.task('build', ['sass', 'html'])
