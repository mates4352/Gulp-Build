# Gulp-Build

* [Node](#node)
  + [Npm](#Npm)
* [Gulp](#gulp)
  + [Installation](#Installation)
  + [Syntax](#syntax)
    + [1 - Gulp: tasks](#gulp.tasks)
    + [2 - Gulp: function](#gulp.const)
    + [3 - Gulp: es6](#gulp.es6)
* [Package.json](#package.json)
* [Editorconfig](#editorconfig)
* [Eslintrc](#eslintrc)
* [Babelrc](#babelrc)
* [Stylelintrc](#stylelintrc)
* [Husky](#Husky)
* [Build](#build)

<a name="node"></a> 
## Node
<a name="Npm"></a> 
### Npm
<a name="gulp"></a> 
## Gulp
<a name="Installation"></a> 
### Installation
<a name="syntax"></a> 
### Syntax
<a name="gulp.tasks"></a> 
#### Gulp:tasks
<a name="gulp.const"></a> 
#### Gulp:function
<a name="gulp.es6"></a> 
#### Gulp:es6
<a name="package.json"></a> 
## Package.json
```
"devDependencies": {
      "@babel/core": "^7.13.16",                             Док -- https://www.npmjs.com/package/babel-core
      "@babel/preset-env": "^7.13.15",                       Док -- https://www.npmjs.com/package/babel-preset-env
      "@babel/register": "^7.13.16",                         Док -- https://www.npmjs.com/package/babel-register
      "autoprefixer": "^10.2.5",                             Док -- https://www.npmjs.com/package/autoprefixer
      "babelify": "^10.0.0",                                 Док -- https://www.npmjs.com/package/babelify
      "browser-sync": "^2.26.14",                            Док -- https://www.npmjs.com/package/browser-sync
      "browserify": "^17.0.0",                               Док -- https://www.npmjs.com/package/browserify
      "css-mqpacker": "^7.0.0",                              Док -- https://www.npmjs.com/package/css-mquery-packer
      "del": "^6.0.0",                                       Док -- https://www.npmjs.com/package/del
      "eslint": "^7.25.0",                                   Док -- https://www.npmjs.com/package/eslint
      "eslint-config-airbnb-base": "^14.2.1",                Док -- https://www.npmjs.com/package/eslint-config-airbnb-base
      "eslint-plugin-import": "^2.22.1",                     Док -- https://www.npmjs.com/package/eslint-plugin-import
      "gulp": "^4.0.2",                                      Док -- https://www.npmjs.com/package/gulp
      "gulp-clean-css": "^4.3.0",                            Док -- https://www.npmjs.com/package/gulp-clean-css
      "gulp-file-include": "^2.3.0",                         Док -- https://www.npmjs.com/package/gulp-file-include
      "gulp-htmlmin": "^5.0.1",                              Док -- https://www.npmjs.com/package/gulp-htmlmin
      "gulp-if": "^3.0.0",                                   Док -- https://www.npmjs.com/package/gulp-if
      "gulp-imagemin": "^7.1.0",                             Док -- https://www.npmjs.com/package/gulp-imagemin
      "gulp-newer": "^1.4.0",                                Док -- https://www.npmjs.com/package/gulp-newer
      "gulp-plumber": "^1.2.1",                              Док -- https://www.npmjs.com/package/gulp-plumber
      "gulp-postcss": "^9.0.0",                              Док -- https://www.npmjs.com/package/gulp-postcss
      "gulp-rename": "^2.0.0",                               Док -- https://www.npmjs.com/package/gulp-rename
      "gulp-sass": "^4.1.0",                                 Док -- https://www.npmjs.com/package/gulp-sass
      "gulp-sass-glob": "^1.1.0",                            Док -- https://www.npmjs.com/package/gulp-sass-glob
      "gulp-sourcemaps": "^3.0.0",                           Док -- https://www.npmjs.com/package/gulp-sourcemaps
      "gulp-svg-sprite": "^1.5.0",                           Док -- https://www.npmjs.com/package/gulp-svg-sprite
      "gulp-ttf2woff": "^1.1.1",                             Док -- https://www.npmjs.com/package/gulp-ttf2woff
      "gulp-ttf2woff2": "^4.0.1",                            Док -- https://www.npmjs.com/package/gulp-ttf2woff2
      "gulp-uglify": "^3.0.2",                               Док -- https://www.npmjs.com/package/gulp-uglify
      "gulp-webp": "^4.0.1",                                 Док -- https://www.npmjs.com/package/gulp-webp
      "gulp-webpcss": "^1.1.1",                              Док -- https://www.npmjs.com/package/gulp-webpcss
      "husky": "^4.3.8",                                     Док -- https://www.npmjs.com/package/husky
      "imagemin-pngquant": "^9.0.2",                         Док -- https://www.npmjs.com/package/imagemin-pngquant
      "import-fresh": "^3.3.0",                              Док -- https://www.npmjs.com/package/import-fresh
      "lint-staged": "^10.5.4",                              Док -- https://www.npmjs.com/package/lint-staged
      "postcss": "^8.2.13",                                  Док -- https://www.npmjs.com/package/postcss
      "postcss-custom-properties": "^11.0.0",                Док -- https://www.npmjs.com/package/postcss-custom-properties
      "postcss-media-variables": "^2.0.1",                   Док -- https://www.npmjs.com/package/postcss-media-variables
      "postcss-pxtorem": "^6.0.0",                           Док -- https://www.npmjs.com/package/postcss-pxtorem
      "stylelint": "^13.13.0",                               Док -- https://www.npmjs.com/package/stylelint
      "stylelint-config-rational-order": "^0.1.2",           Док -- https://www.npmjs.com/package/stylelint-config-rational-order
      "stylelint-config-standard": "^22.0.0",                Док -- https://www.npmjs.com/package/stylelint-config-standard
      "stylelint-order": "^4.1.0",                           Док -- https://www.npmjs.com/package/stylelint-order
      "stylelint-scss": "^3.19.0",                           Док -- https://www.npmjs.com/package/stylelint-scss
      "vinyl-buffer": "^1.0.1",                              Док -- https://www.npmjs.com/package/vinyl-buffer
      "vinyl-source-stream": "^2.0.0"                        Док -- https://www.npmjs.com/package/vinyl
}, 
"dependencies": {
      "focus-visible": "^5.2.0",                             Док -- https://www.npmjs.com/package/focus-visible
      "normalize.css": "^8.0.1",                             Док -- https://www.npmjs.com/package/normalize.css
      "smart-grid": "^2.1.2",                                Док -- https://www.npmjs.com/package/smart-grid
      "vanilla-lazyload": "^17.3.1"                          Док -- https://www.npmjs.com/package/vanilla-lazyload
}
```
<a name="editorconfig"></a> 
## Editorconfig
<a name="eslintrc"></a> 
## Eslintrc
<a name="babelrc"></a> 
## Babelrc
<a name="stylelintrc"></a> 
## Stylelintrc
<a name="Husky"></a> 
## Husky
<a name="build"></a> 
## Build

