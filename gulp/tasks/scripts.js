import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import gulpif from 'gulp-if';
import config from '../config';
import webpack from 'webpack-stream';

const script = (cb) => {

  gulp.src(config.src.js)

      .pipe(gulpif(config.isDev, sourcemaps.init({ loadMaps: true })))
      .pipe(webpack())
      .pipe(gulpif(config.isDev, sourcemaps.write()))

   .pipe(gulp.dest(config.build.js))
   cb();

}

export default script;
