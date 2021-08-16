import gulp from 'gulp';
import gulpIf from 'gulp-if';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';

import config from '../config';

const fonts = (cb) => {

   gulp.src(config.src.fonts)

      .pipe(gulpIf(config.isWoff, ttf2woff2()))
      .pipe(gulpIf(config.isWoff, gulp.dest(config.build.fonts)))

   .pipe(gulpIf(config.isWoff, gulp.src(config.src.fonts)))

      .pipe(gulpIf(config.isWoff, ttf2woff()))

   .pipe(gulp.dest(config.build.fonts))
   cb()

}

export default fonts

