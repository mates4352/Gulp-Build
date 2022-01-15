import gulp from 'gulp';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import cleanСss from 'gulp-clean-css';
import sassGlob from 'gulp-sass-glob';
import scss from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import media from 'gulp-group-css-media-queries';

import config from '../config';

export const style = (cb) => {

   gulp.src(config.src.style)

      .pipe(plumber())
      .pipe(sassGlob())
      .pipe(scss(
         {
            includePaths: ['./node_modules/'],
         },
      ))
      .pipe(media())
      .pipe(postcss(
         [
            autoprefixer(
               [
                  '> 0.1%',
                  'IE 11',
               ]
            ),
         ],
      ))

      .pipe(cleanСss(gulpif(

         !config.isMinCss,
         {
            format: 'beautify',
            level: { 1: {specialComments: 0}},
         },

         {
            level: { 2: { specialComments: 0 } },
         }

      )))
   .pipe(gulp.dest(config.build.css))
   cb();

}

export const pageStyle = (cb) => {

   gulp.src(config.src.pageStyle)

      .pipe(plumber())
      .pipe(scss(
         {
            includePaths: ['./node_modules/'],
         },
      ))
      .pipe(media())
      .pipe(postcss(
         [
            autoprefixer(
               [
                  '> 0.1%',
                  'IE 11',
               ]
            ),
         ],
      ))

      .pipe(cleanСss(gulpif(

         !config.isMinCss,
         {
            format: 'beautify',
            level: { 1: {specialComments: 0}},
         },

         {
            level: { 2: { specialComments: 0 } },
         }

      )))
   .pipe(gulp.dest(config.build.pageCss))
   cb();
}
