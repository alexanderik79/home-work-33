import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';

const sass = gulpSass(dartSass);
const bs = browserSync.create();

const paths = {
  scss: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css'
  },
  html: {
    src: 'src/**/*.html'
  }
};

// SCSS -> CSS
export function styles() {
  return gulp.src(paths.scss.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(bs.stream());
}

// Live reload
export function serve() {
  bs.init({
    server: {
      baseDir: 'src'
    }
  });

  gulp.watch(paths.scss.src, styles);
  gulp.watch(paths.html.src).on('change', bs.reload);
}

export default gulp.series(styles, serve);
