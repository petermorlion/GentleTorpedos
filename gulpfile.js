'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var ftp = require('gulp-ftp');
var prompt = require('gulp-prompt');

var paths = {
  scss: './src/**/*.scss',
  html: './src/**/*.html',
  img: './src/**/*.png',
  fonts: './src/fonts/*.*',
  dist: './dist'
};

gulp.task('sass', function () {
  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
});

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
});

gulp.task('img', function() {
  return gulp.src(paths.img)
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['sass', 'html', 'img', 'fonts'], function() {
  browserSync.init({
    server: paths.dist
  });

  gulp.watch(paths.scss, ['sass']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.img, ['img']);
  gulp.watch(paths.fonts, ['fonts']);
});

gulp.task('build', ['sass', 'html', 'img', 'fonts'])

gulp.task('deploy', ['build'], function() {
  return gulp.src(paths.dist)
    .pipe(prompt.prompt({
      type: 'password',
      name: 'pass',
      message: 'Please enter the FTP password'
    }, function(res){
      gulp.src(paths.dist + '/**/*.*')
        .pipe(ftp({
          host: 'windowsftp.easyhost.be',
          user: 'torpedosbe@torpedos.be',
          remotePath: 'subsites/torpedos',
          pass: res.pass
        }));
    }));
});
