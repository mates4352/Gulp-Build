import gulp from 'gulp'
import purge from 'gulp-purgecss'

const purgeCss = (cb) => {
   gulp.src('./dist/css/style.css')
      .pipe(purge(
         {
            content: [
               'src/**/*.html',
               'src/**/*.js',
            ]
         }
      ))
      .pipe(gulp.dest('./dist/css'))
   cb();
}

export default purgeCss;
