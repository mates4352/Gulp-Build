import gulp from 'gulp'
import purgecsss from 'gulp-purgecss'

const purgecss = () => (
   gulp.src('./dist/css/style.min.css')
      .pipe(purgecsss(
         {
            content: [
               'src/**/*.html',
               'src/**/*.js',
            ]
         }
      ))
      .pipe(gulp.dest('./dist/css'))
)

export default purgecss;
