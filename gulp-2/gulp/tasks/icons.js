import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import gulpif from 'gulp-if';
import svgSprite from 'gulp-svg-sprite';

import config from '../config';

const mutable = () => (
   gulp.src(config.src.iconsMutable)
      .pipe(gulpif(config.isProd, imagemin([
         imagemin.svgo({
            plugins: [
               { removeViewBox: true },
               { cleanupIDs: false },
            ],
         }),
      ],
         {
            verbose: true,
         })))
      .pipe(svgSprite({
         mode: {
            symbol: {
               sprite: 'mutable.svg',
            },
         },
         shape: {
            transform: [
               {
                  svgo: {
                     plugins: [
                        {
                           removeAttrs: {
                              attrs: [
                                 'class', 'data-name', 'fill.*', 'stroke.*',
                              ],
                           },
                        },
                     ],
                  },
               },
            ],
         },
      }))
      .pipe(gulp.dest(config.build.icons))
)

const immutable = () => (
   gulp.src(config.src.iconsImmutable)
      .pipe(gulpif(config.isProd, imagemin([
         imagemin.svgo({
            plugins: [
               { removeViewBox: true },
               { cleanupIDs: false },
            ],
         }),
      ],
         {
            verbose: true,
         })))
      .pipe(svgSprite({
         mode: {
            symbol: {
               sprite: 'immutable.svg',
            },
         },
      }))
      .pipe(gulp.dest(config.build.icons))
)

export default gulp.parallel(mutable, immutable);
