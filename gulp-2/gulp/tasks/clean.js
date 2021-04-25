import del from 'del';
import config from '../config';

const clean = () => del(config.build.root);

export default clean;
