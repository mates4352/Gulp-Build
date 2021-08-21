import gulp from 'gulp'
import config from '../config'
import zip from 'gulp-zip'
const deploy = (cb) => {
   gulp.src(config.prod.src)
   .pipe(gulp.dest(config.prod.srcProd))

   gulp.src(config.prod.dist)
   .pipe(gulp.dest(config.prod.distProd))

   gulp.src(config.prod.dist)
   .pipe(zip(`${config.name}.zip`))
   .pipe(gulp.dest(config.prod.root))

   cb()
}

export default deploy