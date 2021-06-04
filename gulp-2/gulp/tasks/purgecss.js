import gulp from 'gulp'
import purgecsss from 'gulp-purgecss'

const purgecss = (cb) => {
   gulp.src('./dist/css/style.min.css')
      .pipe(purgecsss(
         {
            content: [
               'src/**/*.html',
               'src/**/*.js',
               'src/scss/base/nullstyle.scss'
            ]
         }
      ))
      .pipe(gulp.dest('./dist/css'))
   cb()
}

export default purgecss;
