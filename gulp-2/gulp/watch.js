import gulp from 'gulp';
import script from './tasks/scripts';
import html from './tasks/html';
import { style, smartGridBuild } from './tasks/style';
import library from './tasks/library';
import images from './tasks/fonts';
import icons from './tasks/icons';
import config from './config';

const watchFile = (callback) => {
   gulp.watch(config.watch.html, html);
   gulp.watch(`gulp/tasks/${config.SMART_GRID_NAME}`, smartGridBuild);
   gulp.watch(`gulp/tasks/${config.SMART_GRID_NAME}`, style);
   gulp.watch(config.watch.style, style);
   gulp.watch(config.watch.js, script);
   gulp.watch(config.watch.library, library);
   gulp.watch(config.watch.images, images);
   gulp.watch(config.watch.icons, icons);
   callback();
};

export default watchFile;
