import gulp from 'gulp';
import scss from 'gulp-sass';
import config from '../config';

const fontsCss = (cb) => {

   gulp.src(config.src.fontsCss)
   .pipe(scss(
      {
         includePaths: ['./node_modules/'],
      },
   ))
   .pipe(gulp.dest(config.build.css))
   cb()

}

export default fontsCss;
