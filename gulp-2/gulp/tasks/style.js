import gulp from 'gulp';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import cleanСss from 'gulp-clean-css';
import sassGlob from 'gulp-sass-glob';
import scss from 'gulp-sass';
import postcss from 'gulp-postcss';
import mqpacker from 'css-mqpacker';
import autoprefixer from 'autoprefixer';
import pxtorem from 'postcss-pxtorem';

import config from '../config';

const style = (cb) => {

   gulp.src(config.src.style, { sourcemaps: config.isDev })
      .pipe(plumber())
      .pipe(sassGlob())
      .pipe(scss(
         {
            includePaths: ['./node_modules/'],
         },
      ))
      .pipe(gulpif(config.isDev, cleanСss({
         format: 'beautify',
         level: { specialComments: true },
      })))
      .pipe(gulpif(config.isProd, postcss(
         [
            mqpacker(),
            autoprefixer([
               '> 0.1%',
               'IE 11',
            ]),
            pxtorem({
               propList: ['*'],
               mediaQuery: true,
            }),
         ],
      )))
      .pipe(gulpif(config.isProd, rename({
         suffix: '.min',
         extname: '.css',
      })))
      .pipe(gulpif(config.isProd, cleanСss({
         level: { 2: { specialComments: 0 } },
      })))
      .pipe(gulp.dest(config.build.css, { sourcemaps: config.isDev }))
   cb();

}

export default style;
