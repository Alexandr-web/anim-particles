const {
  dest,
  src,
  watch,
  parallel
} = require('gulp');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const webpack = require('webpack-stream');
const browserSync = require('browser-sync').create();
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');

const paths = {
  scss: {
    from: './src/scss/style.scss',
    to: './docs/css/'
  },
  html: {
    from: './src/*.html',
    to: './docs/'
  },
  js: {
    from: './src/js/script.js',
    to: './docs/js/'
  }
}

const styles = () => {
  return src(paths.scss.from)
    .pipe(plumber())
    .pipe(scss({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer({
      cascade: false,
      overrideBrowserslist: ['last 5 versions']
    }))
    .pipe(cleanCss({
      level: {
        1: {
          specialComments: 0
        }
      }
    }))
    .pipe(concat('main.css'))
    .pipe(dest(paths.scss.to))
    .pipe(browserSync.stream());
}

const js = () => {
  return src(paths.js.from)
    .pipe(plumber())
    .pipe(webpack())
    .pipe(concat('main.js'))
    .pipe(dest(paths.js.to))
    .pipe(browserSync.stream());
}

const html = () => {
  return src(paths.html.from)
    .pipe(dest(paths.html.to))
    .pipe(browserSync.stream());
}

const server = () => {
  browserSync.init({
    server: {
      baseDir: './docs/'
    }
  });
}

const watching = () => {
  watch(paths.js.from, parallel(js));
  watch(paths.scss.from, parallel(styles));
  watch(paths.html.from, parallel(html));
}

exports.build = parallel(styles, html, js);
exports.default = parallel(exports.build, server, watching);