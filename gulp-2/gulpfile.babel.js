import gulp from 'gulp';
import config from './gulp/config';
import watchFile from './gulp/watch';
import server from './gulp/tasks/server';
import clean from './gulp/tasks/clean';
import script from './gulp/tasks/scripts';
import html from './gulp/tasks/html';
import style from './gulp/tasks/style';
import library from './gulp/tasks/library';
import fonts from './gulp/tasks/fonts';
import images from './gulp/tasks/images';
import icons from './gulp/tasks/icons';

config.setEnv();

export const build = gulp.series(
   clean,
   gulp.parallel(
      script,
      html,
      style,
      library,
      images,
      icons,
      fonts,
   ),
);

export const watch = gulp.series(
   build,
   server,
   watchFile,
);
