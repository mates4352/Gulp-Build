/* -------------------------------------------------------------------------------------------------------------------------------------------

   Команды в консоли - таска флаг

   1.   gulp            -  Используется для разработки проекта.
   1.2  gulp --prod     -  Используется для создание проакшен билда, без менификации кода.
   1.3  gulp --minHtml  -  Используется для минификации html.
   1.4  gulp --minCss   -  Используется для минификации css.
   1.5  gulp --minJs    -  Используется для минификации js кода и оптимизации через babel.
   1.6  gulp --minImg   -  Используется для оптимизации изображений.

   Команды в консоли - сторонние таски

   2.   gulp clean      -  Используется для удаленеие файлов.
   2.1  gulp purgecss   -  Используется для удаленеие неиспользуемого кода css.
   2.2  gulp fontsFile  -  Используется для создания привил подключения шрифтов font-face, перед использованием добавить шрифты.

   Команды в консоли - package.json npm run

   3.   npm run prod  -  Используется для создание продакщен версии билда со всеми флагами gulp prod --prod --minHtml --minCss --minJs --minImg.
   3.1  npm run min   -  Используется для создание продакщен версии билда без минификации изображения gulp prod --prod --minHtml --minCss --minJs.

--------------------------------------------------------------------------------------------------------------------------------------------*/
//                                                             МЕТОДЫ
/*-------------------------------------------------------------------------------------------------------------------------------------------

   1.   setEnv()    -  Создает основные флаги сборки.
   1.1  addWoff()   -  Используется для создания шрифтов woff, woff2 формата для активации передается аргумент true.
   1.2  addWebp()   -  Используется для создания изображения формата webp для активации передается аргумент true.
   1.3  concatJs()  -  Используется для конкатинирования файлов js в заданном порядке.

--------------------------------------------------------------------------------------------------------------------------------------------*/

config.setEnv();
config.addWoff(false);
config.addWebp(false);
config.concatJs([

   'src/js/main.js',

])

// Главные таски сборки
import gulp from 'gulp';
import config from './gulp/config';
import watchFile from './gulp/watch';
import server from './gulp/server';

// Таски входящие в основной билд сборки
import script from './gulp/tasks/scripts';
import html from './gulp/tasks/html';
import style from './gulp/tasks/style';
import fonts from './gulp/tasks/fonts';
import images from './gulp/tasks/images';

// Таски для различных задач
import clean from './gulp/tasks/clean';
import purgecss from './gulp/tasks/purgecss'
import fontsFile from './gulp/tasks/fontsFile';

export const build = gulp.series(
   gulp.parallel(
      html,
      style,
      script,
      images,
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

export const prod = gulp.series(
   clean,
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