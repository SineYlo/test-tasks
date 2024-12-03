const { src, dest, series, parallel, watch } = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const connect = require('gulp-connect');

function deleteDestinationDirectory() {
  return new Promise((resolve) => {
    del.sync('./dist/');

    resolve();
  });
}

function transferImages() {
  return new Promise((resolve) => {
    src('./src/images/**/*.svg')
      .pipe(dest('./dist/images/'))

    resolve();
  });
}

function transferFontFiles() {
  return new Promise((resolve) => {
    src('./src/fonts/**/*.woff2', { encoding: false })
      .pipe(rename({
        dirname: './'
      }))
      .pipe(dest('./dist/fonts/'));

    resolve();
  });
}

function transferJsFiles() {
  return new Promise((resolve) => {
    src(['./src/js/pages/*.js', './src/js/libs/*.js'])
      .pipe(dest('./dist/js/'))
      .pipe(connect.reload());

    resolve();
  });
}

function transpilePug() {
  return new Promise((resolve) => {
    src('./src/pug/pages/*.pug')
      .pipe(pug())
      .pipe(dest('./dist/'))
      .pipe(connect.reload());

    resolve();
  });
}

function transpileScss() {
  return new Promise((resolve) => {
    src('./src/scss/pages/*.scss')
      .pipe(sass())
      .pipe(dest('./dist/css/'))
      .pipe(connect.reload());

    resolve();
  });
}

function createServer() {
  return new Promise((resolve) => {
    connect.server({
      root: './dist/',
      livereload: true
    });

    resolve();
  })
}

watch('./src/pug/**/*.pug', transpilePug);
watch('./src/scss/**/*.scss', transpileScss);
watch('./src/js/**/*.js', transferJsFiles);

exports.dev = series(
  deleteDestinationDirectory,
  parallel(
    transferFontFiles,
    transferJsFiles,
    transferImages
  ),
  parallel(
    transpilePug,
    transpileScss
  ),
  createServer
);
