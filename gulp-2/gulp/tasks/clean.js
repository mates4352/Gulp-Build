import del from 'del';
import config from '../config';

const clean = (cb) => {
   del(config.build.root);
   cb();
}

export default clean;
