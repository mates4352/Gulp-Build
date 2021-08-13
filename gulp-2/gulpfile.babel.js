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
config.addWoff(false);
config.addWebp(false);

export const build = gulp.series(
   gulp.parallel(
      script,
      html,
      style,
      images,
      icons,
      fonts,
   ),
);

export const watch = gulp.series(
   build,
   gulp.parallel(
      server,
      watchFile,
   )
);

exports.clean = clean;
exports.fontsFile = fontsFile
exports.purgecss = purgecss;
exports.default = watch;
