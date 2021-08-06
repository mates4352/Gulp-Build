import gulp from 'gulp';
import config from './gulp/config';
import watchFile from './gulp/watch';
import server from './gulp/server';

import clean from './gulp/tasks/clean';
import script from './gulp/tasks/scripts';
import html from './gulp/tasks/html';
import style from './gulp/tasks/style';
import fonts from './gulp/tasks/fonts';
import fontsFile from './gulp/tasks/fontsFile';
import images from './gulp/tasks/images';
import icons from './gulp/tasks/icons';
import purgecss from './gulp/tasks/purgecss'

config.setEnv();

export const build = gulp.series(
   gulp.parallel(
      script,
      html,
      style,
      icons,
      fonts,
   ),
   fontsFile
);

export const watch = gulp.series(
   build,
   gulp.parallel(
      server,
      watchFile,
   )
);

// Перед запуском 1-gulp(для быстрой работы) 2-gulp --prod(для продакшена)

// gulp clean - для очистки
exports.clean = clean;

// gulp images - для оптимизации изображения, gulp images --prod для оптимизации изображения + создание webp формата изображения
exports.images = images;

// gulp clean - для неиспользуемого css кода
exports.purgecss = purgecss;

exports.default = watch;
