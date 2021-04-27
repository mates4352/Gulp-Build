import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import gulpif from 'gulp-if';
import svgSprite from 'gulp-svg-sprite';

import config from '../config';

const iconsNoDisable = (callback) => {
   gulp.src(config.src.iconsNoDisable)
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
               sprite: 'spriteNoDisable.svg',
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
                                 'class', 'data-name', 'fill', 'stroke.*',
                              ],
                           },
                        },
                     ],
                  },
               },
            ],
         },
      }))
      .pipe(gulp.dest(config.build.icons));
   callback();
};

const iconsDisable = (callback) => {
   gulp.src(config.src.iconsDisable)
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
               sprite: 'spriteDisable.svg',
            },
            shape: {
               transform: [
                  {
                     svgo: {
                        plugins: [
                           {
                              removeAttrs: {
                                 attrs: [
                                    'class', 'data-name',
                                 ],
                              },
                              removeUselessStrokeAndFill: true,
                              inlineStyles: true,
                           },
                        ],
                     },
                  },
               ],
            },
         },
      }))
      .pipe(gulp.dest(config.build.icons));
   callback();
};

export default gulp.parallel(iconsDisable, iconsNoDisable);
