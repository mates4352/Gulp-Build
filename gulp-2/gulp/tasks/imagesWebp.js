import gulp from 'gulp';
import webp from 'gulp-webp';

import config from '../config';


const imagesWebp = () => (
   gulp.src(config.src.images)
   .pipe( webp({
      quality: 70,
   }))
   .pipe(gulp.dest(config.build.images))
)

export default imagesWebp;