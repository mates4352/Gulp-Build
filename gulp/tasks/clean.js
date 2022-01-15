import del from 'del';
import config from '../config';

const clean = () => {

   return del(config.build.root)

}

export default clean;