import gulp from 'gulp';
import webp from 'gulp-webp';
import newer from 'gulp-newer';
import imagemin from 'gulp-imagemin';
import imageminOptipng from 'imagemin-pngquant';
import gulpif from 'gulp-if';

import config from '../config';

const images = (cb) => {
   gulp.src(config.src.images)
      .pipe(newer(config.build.images))
      .pipe(gulpif(config.isMinImages, imagemin(
         [
            imagemin.mozjpeg({ quality: 75 }),
            imageminOptipng({ quality: [0.8, 0.9] }),
         ],
         {
            verbose: true,
         })))
      .pipe(gulp.dest(config.build.images))

   gulpif(config.isWebp, gulp.src(config.src.images))
      .pipe(gulpif(config.isWebp, webp({
         quality: 70,
      })))
      .pipe(gulpif(config.isWebp, gulp.dest(config.build.images)))
   cb()
}

export default images;
