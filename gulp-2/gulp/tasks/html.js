import gulp from 'gulp';
import include from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import config from '../config';

const html = () => (
   gulp.src(config.src.html)
      .pipe(plumber())
      .pipe(include())
   .pipe(gulp.dest(config.build.html))
      .pipe(gulpif(config.isProd, htmlmin({
         collapseWhitespace: true,
         removeComments: true,
      })))
      .pipe(gulpif(config.isProd, rename({
         suffix: '.min',
         extname: '.html',
      })))
   .pipe(gulpif(config.isProd, gulp.dest(config.build.html)))
)

export default html;
