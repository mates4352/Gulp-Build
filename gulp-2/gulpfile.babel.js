import gulp from 'gulp';
import config from './gulp/config';
import watchFile from './gulp/watch';
import server from './gulp/server';
import clean from './gulp/tasks/clean';
import script from './gulp/tasks/scripts';
import html from './gulp/tasks/html';
import style from './gulp/tasks/style';
import library from './gulp/tasks/library';
import { fonts, fontsFile } from './gulp/tasks/fonts';
import images from './gulp/tasks/images';
import icons from './gulp/tasks/icons';

config.setEnv();

export const build = gulp.series(
   gulp.parallel(
      script,
      html,
      style,
      library,
      images,
      icons,
      fonts,
   ),
   fontsFile,
);

export const watch = gulp.series(
   build,
   server,
   watchFile,
);

// Перед запуском 1-gulp(для быстрой работы) 2-gulp --prod(для продакшена) используем gulp clean(для очистки)
exports.clean = clean;
exports.default = watch;
