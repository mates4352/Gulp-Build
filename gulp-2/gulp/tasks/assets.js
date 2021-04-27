import gulp from 'gulp';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';

import config from '../config';

export const fonts = (callback) => {
   gulp.src(config.src.fonts)
      .pipe(ttf2woff2())
      .pipe(gulp.dest(config.build.fonts));
   gulp.src(config.src.fonts)
      .pipe(ttf2woff())
      .pipe(gulp.dest(config.build.fonts));
   callback();
};

export const images = (callback) => {
   gulp.src(config.src.images)
      .pipe(gulp.dest(config.build.images));
   callback();
};

export const icons = (callback) => {
   gulp.src([config.src.iconsDisable, config.src.iconsNoDisable])
      .pipe(gulp.dest(config.build.icons));
   callback();
};
