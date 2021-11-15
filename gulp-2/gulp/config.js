const srcPath = 'src';
const destPath = 'dist';
const deploy = 'deploy'

const config = {

   build: {

      root:          destPath,
      html:          `${destPath}`,
      pageHtml:      `${destPath}`,
      js:            `${destPath}/js`,
      css:           `${destPath}/css`,
      pageCss:       `${destPath}/css`,
      fonts:         `${destPath}/fonts`,
      images:        `${destPath}/images`,

   },

   src: {

      root:       srcPath,
      html:       `${srcPath}/*.html`,
      pageHtml:   `${srcPath}/html/page/*.html`,
      js:         `${srcPath}/js/**/*.js`,
      style:      `${srcPath}/scss/style.scss`,
      pageStyle:  `${srcPath}/scss/page/*.scss`,
      fonts:      `${srcPath}/assets/fonts/*.{ttf,eot,svg,woff,woff2}`,
      fontsFile:  `${srcPath}/scss/base/_fonts.scss`,
      fontsPath:  `${srcPath}/assets/fonts`,
      images:     `${srcPath}/assets/images/**/*.{jpg,png,svg,gif,ico,webp}`,

   },

   watch: {

      html:       `${srcPath}/**/*.html`,
      pageHtml:   `${srcPath}/html/page/*.html`,
      js:         `${srcPath}/js/**/*.js`,
      style:      `${srcPath}/scss/**/*.scss`,
      images:     `${srcPath}/assets/images/**/*.{jpg,png,svg,gif,ico,webp}`,

   },

   prod: {
      root:           deploy,
      src:            `${srcPath}/**/*`,
      srcProd:        `${deploy}/${srcPath}`,
      dist:           `${destPath}/**/*`,
      distProd:       `${deploy}/${destPath}`,
      distProdPath:   `${deploy}/${destPath}/**/*`,
   },

   setEnv() {

      this.isMinCss       =   process.argv.includes('--minCss');
      this.isMinHtml      =   process.argv.includes('--minHtml');
      this.isMinScripts   =   process.argv.includes('--minJs');
      this.isMinImages    =   process.argv.includes('--minImg');
      this.isProd         =   process.argv.includes('--prod');
      this.isDev          =   !this.isProd && !this.isMinCss && !this.isMinScripts;

   },

   projectName(projectName) {
      this.name = projectName
   },

   concatJs(path) {
      this.concat = path
   },

   addWoff(woff) {
      this.isWoff = woff
   },

   addWebp(webp) {
      this.isWebp = webp
   }

};

export default config;