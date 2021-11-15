import gulp from 'gulp';
import include from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import config from '../config';

export const html = (cb) => {

   gulp.src(config.src.html)

      .pipe(plumber())
      .pipe(include())
      .pipe(gulpif(config.isMinHtml, htmlmin({
         collapseWhitespace: true,
         removeComments: true,
      })))

   .pipe(gulp.dest(config.build.html))
   cb();

}

export const pageHtml = (cb) => {
   gulp.src(config.src.pageHtml)

   .pipe(plumber())
   .pipe(include())
   .pipe(gulpif(config.isMinHtml, htmlmin({
      collapseWhitespace: true,
      removeComments: true,
   })))

   .pipe(gulp.dest(config.build.pageHtml))
   cb();
}