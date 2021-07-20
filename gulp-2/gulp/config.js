const srcPath = 'src';
const destPath = 'dist';

const config = {

   build: {

      root: destPath,
      html: `${destPath}`,
      js: `${destPath}/js`,
      css: `${destPath}/css`,
      fonts: `${destPath}/assets/fonts/`,
      images: `${destPath}/assets/images`,
      icons: `${destPath}/assets/icons`,

   },

   src: {

      root: srcPath,
      html: `${srcPath}/*.html`,
      js: `${srcPath}/js/main.js`,
      style: `${srcPath}/scss/style.scss`,
      fontsCss: `${srcPath}/scss/base/fontsCss.scss`,
      fonts: `${srcPath}/assets/fonts/*.{ttf,eot,svg,woff,woff2}`,
      images: `${srcPath}/assets/images/**/*.{jpg,png,svg,gif,ico,webp}`,
      iconsMutable: `${srcPath}/assets/icons/mutable/*.{png,svg}`,
      iconsImmutable: `${srcPath}/assets/icons/immutable/*.{png,svg}`,

   },

   watch: {

      html: `${srcPath}/**/*.html`,
      js: `${srcPath}/js/**/*.js`,
      style: `${srcPath}/scss/**/*.scss`,
      images: `${srcPath}/assets/images/**/*.{jpg,png,svg,webp}`,
      icons: `${srcPath}/assets/icons/**/*.{png,svg}`,

   },

   concat: [

      `${srcPath}/js/main.js`,
      // `${srcPath}/js/components/.js`,
      // `${srcPath}/js/library/.js`,

   ],

   setEnv() {

      this.isProd = process.argv.includes('--prod');
      this.isDev = !this.isProd;

   },

};
export default config;
