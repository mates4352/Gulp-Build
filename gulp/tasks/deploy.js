import gulp from 'gulp'
import config from '../config'

const deploy = (cb) => {
   gulp.src(config.prod.src)
   .pipe(gulp.dest(config.prod.srcProd))

   gulp.src(config.prod.dist)
   .pipe(gulp.dest(config.prod.distProd))

   cb()
}

export default deploy