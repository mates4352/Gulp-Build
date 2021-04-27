import gulp from 'gulp';
import webp from 'gulp-webp';
import newer from 'gulp-newer';
import imagemin from 'gulp-imagemin';
import imageminOptipng from 'imagemin-pngquant';
import gulpif from 'gulp-if';

import config from '../config';

const images = (callback) => {
   gulpif(config.isProd, gulp.src(config.src.images))
      .pipe(gulpif(config.isProd, newer(`${config.build.images}/**/*`)))
      .pipe(gulpif(config.isProd, webp({
         quality: 70,
      })))
      .pipe(gulpif(config.isProd, gulp.dest(config.build.images)));
   gulp.src(config.src.images)
      .pipe(gulpif(config.isProd, imagemin([
         imagemin.mozjpeg({ quality: 75 }),
         imageminOptipng({ quality: [0.8, 0.9] }),
         imagemin.svgo({
            plugins: [
               { removeViewBox: true },
               { cleanupIDs: false },
            ],
         }),
      ],
      {
         verbose: true,
      })))
      .pipe(gulp.dest(config.build.images));
   callback();
};

export default images;
