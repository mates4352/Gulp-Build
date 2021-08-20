const srcPath = 'src';
const destPath = 'dist';

const config = {

   build: {

      root:    destPath,
      html:    `${destPath}`,
      js:      `${destPath}/js`,
      css:     `${destPath}/css`,
      fonts:   `${destPath}/assets/fonts`,
      images:  `${destPath}/assets/images`,

   },

   src: {

      root:            srcPath,
      html:            `${srcPath}/*.html`,
      js:              `${srcPath}/js/**/*.js`,
      style:           `${srcPath}/scss/style.scss`,
      fonts:           `${srcPath}/assets/fonts/*.{ttf,eot,svg,woff,woff2}`,
      images:          `${srcPath}/assets/images/**/*.{jpg,png,svg,gif,ico,webp}`,

   },

   watch: {

      html:    `${srcPath}/**/*.html`,
      js:      `${srcPath}/js/**/*.js`,
      style:   `${srcPath}/scss/**/*.scss`,
      images:  `${srcPath}/assets/images/**/*.{jpg,png,svg,gif,ico,webp}`,

   },

   concatJs(path) {
      this.concat = path
   },

   setEnv() {

      this.isMinCss       =   process.argv.includes('--minCss');
      this.isMinHtml      =   process.argv.includes('--minHtml');
      this.isMinScripts   =   process.argv.includes('--minJs');
      this.isMinImages    =   process.argv.includes('--minImg');
      this.isProd         =   process.argv.includes('--prod');
      this.isDev          =   !this.isProd && !this.isMinCss && !this.isMinScripts;

   },

   addWoff(woff) {
      this.isWoff = woff
   },

   addWebp(webp) {
      this.isWebp = webp
   }

};

export default config;