import gulp from 'gulp';
import config from './gulp/config';
import server from './gulp/tasks/server';
import clean from './gulp/tasks/clean';
import script from './gulp/tasks/scripts';
import html from './gulp/tasks/html';
import style from './gulp/tasks/style';
import fonts from './gulp/tasks/fonts';

config.setEnv();

export const build = gulp.series(
   clean,
   gulp.parallel(
      script,
      html,
      style,
      fonts,
   ),
);

export const watch = gulp.series(
   build,
   server,
);
