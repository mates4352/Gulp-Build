
/* -------------------------------------------------------------------------------------------------------------------------------------------

   Gulp Сli

   Команды в консоли - таска флаг.
   Используется на стадии создания проекта.

   1.   gulp            -  Используется для запуска проекта.
   1.1  gulp --minHtml  -  Используется для минимизации html.
   1.2  gulp --minCss   -  Используется для минимизации css.
   1.3  gulp --minImg   -  Используется для оптимизации изображений.

   Команды в консоли - сторонние таски
   Используется на стадии верстки

   2.   gulp clean              -  Используется для удаление файлов.
   2.1  gulp purgeCss           -  Используется для удаление неиспользуемого кода css.
   2.2  gulp fontsFile          -  Используется для создания привил подключения шрифтов font-face, перед использованием добавить шрифты.
   2.3  gulp deploy --"name"    -  Используется для создания deploy файлов.

   Команды в консоли - package.json npm run
   Используется на стадии сборки билда проекта

   3.   npm run prod    -  Используется для создание продакщен версии билда со всеми флагами gulp clean watch --series --minHtml --minCss --minImg.
   3.1  npm run prod_2  -  Используется для создание продакщен версии билда без минимизации изображения gulp clean watch --series --minHtml --minCss.
   3.2  npm run deploy  -  Используется для создание продакщен версии билда без минимизации изображения gulp deploy

--------------------------------------------------------------------------------------------------------------------------------------------*/
//                                                             МЕТОДЫ
/*-------------------------------------------------------------------------------------------------------------------------------------------

   1.   setEnv()        -  Создает основные флаги сборки.
   1.1  addWoff()       -  Используется для создания шрифтов woff, woff2 формата, принимает 2 параметра false, true.
   1.2  addWebp()       -  Используется для создания изображения формата webp, принимает 2 параметра false, true.

--------------------------------------------------------------------------------------------------------------------------------------------*/

config.setEnv();
config.addWoff(false);
config.addWebp(false);

// Главные таски сборки
import gulp from 'gulp';
import config from './gulp/config';
import watchFile from './gulp/watch';
import server from './gulp/server';

// Таски входящие в основной билд сборки
import script from './gulp/tasks/scripts';
import { html, pageHtml } from './gulp/tasks/html';
import { style, pageStyle, } from './gulp/tasks/style';
import fonts from './gulp/tasks/fonts';
import images from './gulp/tasks/images';

// Таски для различных задач
import clean from './gulp/tasks/clean';
import purgeCss from './gulp/tasks/purgeCss'
import fontsFile from './gulp/tasks/fontsFile';
import deploy from './gulp/tasks/deploy';

export const build = gulp.series(
   clean,
   gulp.parallel(
      html,
      pageHtml,
      style,
      pageStyle,
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

exports.clean = clean;
exports.fontsFile = fontsFile
exports.purgeCss = purgeCss;
exports.deploy = deploy
exports.default = watch;