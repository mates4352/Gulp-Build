import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import gulpif from 'gulp-if';
import config from '../config';
import rename from 'gulp-rename';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
const script = () => (

  gulp.src(config.concat)
      .pipe(gulpif(config.isDev, sourcemaps.init({ loadMaps: true })))
      .pipe(babel({
         presets: ["@babel/preset-env"]
      }))
      .pipe(concat('main.js'))
      .pipe(gulpif(config.isProd, uglify()))
      .pipe(gulpif(config.isProd, rename({
         suffix: '.min',
         extname: '.js',
      })))
      .pipe(gulpif(config.isDev, sourcemaps.write()))
      .pipe(gulp.dest(config.build.js))

)

export default script;
