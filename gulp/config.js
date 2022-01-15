const srcPath = 'src';
const destPath = 'dist';
const deploy = `deploy/${process.argv[process.argv.length - 1].slice(2)}`;

const config = {

   build: {

      root:          destPath,
      html:          `${destPath}`,
      js:            `${destPath}/js`,
      css:           `${destPath}/css`,
      pageHtml:      `${destPath}`,
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

      root:           `${deploy}`,
      src:            `${srcPath}/**/*`,
      srcProd:        `${deploy}/${srcPath}`,
      dist:           `${destPath}/**/*`,
      distProd:       `${deploy}/${destPath}`,

   },

   setEnv() {

      this.isMinCss       =   process.argv.includes('--minCss');
      this.isMinHtml      =   process.argv.includes('--minHtml');
      this.isMinImages    =   process.argv.includes('--minImg');
      this.isDeploy       =   process.argv.includes('--deploy');
      this.isDev          =   !this.isMinCss;
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