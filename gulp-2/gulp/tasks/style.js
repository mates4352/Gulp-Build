import gulp from 'gulp';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import cleanСss from 'gulp-clean-css';
import scss from 'gulp-sass';
import postcss from 'gulp-postcss';
import mqpacker from 'css-mqpacker';
import varcss from 'postcss-css-variables';
import autoprefixer from 'autoprefixer';
import media from 'postcss-media-variables';

import config from '../config';

const style = (callback) => {
   gulp.src(config.src.style, { sourcemaps: config.isDev })
      .pipe(plumber())
      .pipe(scss(
         {
            includePaths: ['./node_modules/'],
         },
      ))
      .pipe(cleanСss({
         format: 'beautify',
         level: { specialComments: true },
      }))
      .pipe(gulp.dest(config.build.css, { sourcemaps: config.isDev }))
      .pipe(gulpif(config.isProd, postcss(
         [
            mqpacker(),
            media(),
            autoprefixer([
               '> 0.1%',
               'IE 10',
            ]),
            varcss({
               preserve: true,
            }),
            media(),
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
