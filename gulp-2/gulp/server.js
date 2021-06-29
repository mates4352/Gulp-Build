import browserSync from 'browser-sync';
import config from './config';

const server = (cb) => {

   browserSync.create().init({
      server: {
         baseDir: config.build.root,
      },
      files: [
         `${config.build.root}/**/*`
      ],
      open: false,
      notify: false,
   })
   cb();
   
}

export default server;
