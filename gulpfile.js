var run = require('run-sequence');
var gulp = require('gulp');
var copy = require('gulp-copy');
var sass = require('gulp-sass');
var util = require('gulp-util');
var watch = require('gulp-watch');
var bower = require('gulp-bower');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var rimraf = require('rimraf');
var mincss = require('gulp-minify-css');
var gulpif = require('gulp-if');

var paths = {
  allsrc: ['./client/**/*'],
  htmlsrc: ['./client/**/*.html'],
  imgsrc: ['./client/images/**/*'],
  jssrc: ['./client/**/*.js'],
  sasssrc: ['./client/**/*.scss'],
  destination: './public'
};

// --> TASKS ********************************** //

gulp.task('default', ['clean:public'], function(cb){
  run('bower', 'prod:build', 'prod:watch', cb);
});

gulp.task('dev', ['clean:public'], function(cb){
  run('bower', 'dev:build', 'dev:watch', cb);
});

gulp.task('vagrant', ['clean:public'], function(cb){
  run('bower', 'dev:build', 'vagrant:watch', cb);
});

gulp.task('prod:build', function(cb){
  run('copy:html', 'copy:images', 'prod:js', 'prod:sass', cb);
});

gulp.task('dev:build', function(cb){
  run('copy:html', 'copy:images', 'dev:js', 'dev:sass', cb);
});

// --> TASKS ********************************** //

gulp.task('clean:public', function(cb){
  rimraf(paths.destination, cb);
});

gulp.task('bower', function(){
  return bower();
});

gulp.task('prod:js', function(){
  return gulp.src(paths.jssrc)
    .pipe(concat('index.js'))
    .pipe(rename({suffix: '.min'}))
    //.pipe(uglify())
    .pipe(gulp.dest(paths.destination))
    .on('error', util.log);
});

gulp.task('prod:sass', function(){
  return gulp.src(paths.sasssrc)
      .pipe(sass())
      .pipe(mincss())
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest(paths.destination))
      .on('error', util.log);
});

gulp.task('dev:js', function(){
  return gulp.src(paths.jssrc)
    .pipe(concat('index.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.destination))
    .on('error', util.log);
});

gulp.task('dev:sass', function(){
  return gulp.src(paths.sasssrc)
      .pipe(sass())
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest(paths.destination))
      .on('error', util.log);
});

gulp.task('copy:html', function(){
  return gulp.src(paths.htmlsrc)
    .pipe(copy(paths.destination, {prefix: 1}))
    .on('error', util.log);
});

gulp.task('copy:images', function(){
  return gulp.src(paths.imgsrc)
    .pipe(copy(paths.destination, {prefix: 1}))
    .on('error', util.log);
});

gulp.task('prod:watch', function(){
  return watch(paths.allsrc, function(){
    gulp.start('prod:build');
  });
});

gulp.task('dev:watch', function(){
  return watch(paths.allsrc, function(){
    gulp.start('dev:build');
  });
});

gulp.task('vagrant:watch', function(){
  return watch(paths.allsrc, {usePolling: true, interval: 1000}, function(){
    gulp.start('dev:build');
  });
});
