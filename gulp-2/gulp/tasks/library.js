import gulp from 'gulp';
import config from '../config';

const library = (callback) => {
   gulp.src(config.src.library)
      .pipe(gulp.dest(config.build.library));
   callback();
};

export default library;
