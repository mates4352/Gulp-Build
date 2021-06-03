import gulp from 'gulp';
import config from '../config';

const library = (cb) => {
   gulp.src(config.src.library)
      .pipe(gulp.dest(config.build.library))
   cb();
}

export default library;
