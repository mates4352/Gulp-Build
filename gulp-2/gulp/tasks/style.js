import gulp from 'gulp';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import cleanСss from 'gulp-clean-css';
import scss from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import mqpacker from 'css-mqpacker';
import varcss from 'postcss-custom-properties';
import autoprefixer from 'autoprefixer';

import config from '../config';

const style = (callback) => {
   gulp.src(config.src.style)
      .pipe(plumber())
      .pipe(gulpif(config.isDev, sourcemaps.init()))
      .pipe(scss())
      .pipe(cleanСss({
         format: 'beautify',
         level: { specialComments: true },
      }))
      .pipe(gulpif(config.isDev, sourcemaps.write()))
      .pipe(gulp.dest(config.build.css))
      .pipe(gulpif(config.isProd, postcss(
         [
            autoprefixer([
               '> 0.1%',
               'IE 10',
            ]),
            varcss(),
            mqpacker(),
         ],
      )))
      .pipe(gulpif(config.isProd, rename({
         suffix: '.min',
         extname: '.css',
      })))
      .pipe(gulpif(config.isProd, cleanСss({
         level: { 2: { specialComments: 0 } },
      })))
      .pipe(gulpif(config.isProd, gulp.dest(config.build.css)));
   callback();
};

export default style;
