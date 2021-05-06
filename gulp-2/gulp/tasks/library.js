import gulp from 'gulp';
import config from '../config';

const library = () => (
   gulp.src(config.src.library)
      .pipe(gulp.dest(config.build.library))
)

export default library;
