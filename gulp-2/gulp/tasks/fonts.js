import gulp from 'gulp';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';

import config from '../config';

export const fonts = () => (
   gulp.src(config.src.fonts)
      .pipe(ttf2woff2())
      .pipe(gulp.dest(config.build.fonts))

   .pipe(gulp.src(config.src.fonts))
      .pipe(ttf2woff())
      .pipe(gulp.dest(config.build.fonts))
)

export default fonts

