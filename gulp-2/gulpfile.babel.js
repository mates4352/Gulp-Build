import config from './gulp/config';

config.setEnv();

exports.test = () => {
   console.log(config.isProd);
};
