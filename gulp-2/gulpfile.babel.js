import gulp from 'gulp';
import config from './gulp/config';
import server from './gulp/tasks/server';
import clean from './gulp/tasks/clean';
import { scriptBuild, scriptWatch } from './gulp/tasks/scripts';
import html from './gulp/tasks/html';

config.setEnv();

export const build = gulp.series(
   clean,
   scriptBuild,
   html,
);

export const watch = gulp.series(
   build,
   server,
   scriptWatch,
);
