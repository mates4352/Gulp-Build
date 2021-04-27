const srcPath = 'src';
const destPath = 'dist';

const config = {
   build: {
      root: destPath,
      html: `${destPath}`,
      js: `${destPath}/js`,
      css: `${destPath}/css`,
      fonts: `${destPath}/assets/fonts`,
      library: `${destPath}/library`,
      images: `${destPath}/assets/images`,
      iconsDisable: `${destPath}/assets/icons/disable`,
      iconsNoDisable: `${destPath}/assets/icons/noDisable`,
   },
   src: {
      root: srcPath,
      html: `${srcPath}/*.html`,
      js: `${srcPath}/js/main.js`,
      library: `${srcPath}/library/**`,
      style: `${srcPath}/scss/style.scss`,
      fonts: `${srcPath}/assets/fonts/*.{ttf,eot,svg,woff,woff2}`,
      images: `${srcPath}/assets/images/**/*.{jpg,png,svg,gif,ico,webp}`,
      iconsDisable: `${srcPath}/assets/icons/disable/**/*.{png,svg,webp}`,
      iconsNoDisable: `${srcPath}/assets/icons/noDisable/**/*.{png,svg,webp}`,
   },
   watch: {
      html: `${srcPath}/**/*.html`,
      js: `${srcPath}/js/**/*.js`,
      library: `${srcPath}/library/**`,
      style: `${srcPath}/scss/**/*.scss`,
      images: `${srcPath}/assets/images/**/*.{jpg,png,svg,webp}`,
      icons: `${srcPath}/assets/icons/**/*.{png,svg,webp}`,
   },

   setEnv() {
      this.isProd = process.argv.includes('--prod');
      this.isDev = !this.isProd;
   },
};
export default config;