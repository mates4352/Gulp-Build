import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import gulpif from 'gulp-if';
import config from '../config';
import rename from 'gulp-rename';

const script = () => (
   browserify(config.src.js, { debug: true })
      .transform('babelify', { presets: ['@babel/preset-env'] })
      .bundle()
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(gulpif(config.isDev, sourcemaps.init({ loadMaps: true })))
      .pipe(gulpif(config.isProd, uglify()))
      .pipe(gulpif(config.isProd, rename({
         suffix: '.min',
         extname: '.js',
      })))
      .pipe(gulpif(config.isDev, sourcemaps.write()))
   .pipe(gulp.dest(config.build.js))
)

export default script;
