import gulp from 'gulp';
import config from './gulp/config';
import watchFile from './gulp/watch';
import server from './gulp/tasks/server';
import clean from './gulp/tasks/clean';
import script from './gulp/tasks/scripts';
import html from './gulp/tasks/html';
import style from './gulp/tasks/style';
import library from './gulp/tasks/library';
import { fonts, images, icons } from './gulp/tasks/assets';

config.setEnv();

export const build = gulp.series(
   clean,
   gulp.parallel(
      script,
      html,
      style,
      library,
      fonts,
      images,
      icons,
   ),
);

export const watch = gulp.series(
   build,
   server,
   watchFile,
);
