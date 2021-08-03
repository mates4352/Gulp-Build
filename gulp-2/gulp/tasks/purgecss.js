import gulp from 'gulp'
import purgecsss from 'gulp-purgecss'

const purgecss = (cb) => {
   gulp.src('./dist/css/style.css')
      .pipe(purgecsss(
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

export default purgecss;
