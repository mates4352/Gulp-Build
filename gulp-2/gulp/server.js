import browserSync from 'browser-sync';
import config from './config';

const server = (сb) => {
   browserSync.create().init({
      server: {
         baseDir: config.build.root,
      },
      files: [
         config.watch.html,
         config.watch.style,
         config.watch.js,
         config.watch.images,
         config.watch.icons,
      ],
      open: false,
      notify: false,
   });
   сb();
};

export default server;
