import gulp from 'gulp';
import config from './gulp/config';
import server from './gulp/tasks/server';
import clean from './gulp/tasks/clean';
import { scriptBuild, scriptWatch } from './gulp/tasks/scripts';

config.setEnv();

export const build = gulp.series(
   clean,
   scriptBuild,
);

export const watch = gulp.series(
   build,
   server,
   scriptWatch,
);
