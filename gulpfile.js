"use strict"
//- Плагины -//
const { src, dest, } = require("gulp")                        //                                                                                                    Документация => https://gulpjs.com/docs/en/api/src , https://gulpjs.com/docs/en/api/dest
const gulp = require("gulp")                         // Cборщик проектов позволяет собирать проект из разных плагинов                                      Документация => https://gulpjs.com документация на русском https://webdesign-master.ru/blog/docs/gulp-documentation.html
const fs = require('fs');

// html 
const htmlmin = require('gulp-htmlmin')
// const pug           = require("gulp-pug")                     // Шаблонизатор Pug                                                                                   Документация => https://gist.github.com/neretin-trike/53aff5afb76153f050c958b82abd9228
const include = require("gulp-file-include")               // Сборщик файлов html                                                                             Документация => https://www.npmjs.com/package/gulp-file-include
// css
const autoprefixer = require("gulp-autoprefixer")            // Позволяет при компиляции добавлять префиксы.                                                       Документация => https://github.com/postcss/autoprefixer
const shorthand = require("gulp-shorthand")               // Позволяет сокращает стили.                                                                         Документация => https://www.npmjs.com/package/gulp-shorthand
const sourcemaps = require('gulp-sourcemaps')
const cleanСss = require('gulp-clean-css')               // Позволяет гибко настраивать вывод css.                                                             Документация => https://github.com/jakubpawlowicz/clean-css#formatting-options
const media = require("gulp-group-css-media-queries") // Позволяет собирать все медиа с одинаковым условием в один media запрос.                            Документация => https://github.com/Se7enSky/group-css-media-queries#readme
const less = require("gulp-less")                    // Позволяет при компилировать из less формата в css.                                                 Документация => https://github.com/gulp-community/gulp-less#readme
const scss = require("gulp-sass")                    // Позволяет при компилировать из scss формата в css.                                                 Документация => https://github.com/dlmanning/gulp-sass#readme
const preprocessor = 'scss'                                   // Позволяет выбирать какой препроцессор будем использовать, мы передаем значение название плагина которых хотим использовать а не саму функцию это очень фажно в дальньшем вы сами увидите почему 

// js
const rigger = require("gulp-rigger")                  // Позволяет созавать компоненты js и собирать их в один документ.                                    Документация => https://github.com/kuzyk/gulp-rigger#readme 
const terser = require("gulp-terser")                  // Позволяет минифицировать js файл.                                                                  Документация => https://www.npmjs.com/package/gulp-terser

// image
const imagemin = require("gulp-imagemin")                // Позволяет сжимать и оптимизировать изображение.                                                    Документация => https://github.com/sindresorhus/gulp-imagemin#readme
const webpHtml = require("gulp-webp-html")               // Позволяет подключать img тег , а плагин будет дополнительно подключать формат wemp.                Документация => https://www.npmjs.com/package/gulp-webp-html
const webpcss = require("gulp-webp-css")                // Позволяет подключать изображение через css, а плагин будет дополнительно подключать формат wemp.   Документация => https://www.npmjs.com/package/gulp-webp-css
const webp = require("gulp-webp")                    // Позволяет преобразовать изображение в формат webp.                                                 Документация => https://www.npmjs.com/package/gulp-webp
const newer = require('gulp-newer')                   // Позволяет нам проверять изображения на наличие уже оптимизовнных и не оптимизировать их заново     Документация => https://www.npmjs.com/package/gulp-newer

// common
const browsersync = require("browser-sync").create()        // Позволяет создавать локальный сервер для вашей работы.                                             Документация => https://browsersync.io/
const plumber = require("gulp-plumber")                 // Позволяет выводить ошибки тасок.                                                                   Документация => https://www.npmjs.com/package/gulp-plumber
const rename = require("gulp-rename")                  // Позволяет изменять имя файлы , добавлять новый суффикс или новый формат.                           Документация => https://www.npmjs.com/package/gulp-rename
const del = require("del")                          // Позволяет удалить файлы в зависимости от от рпасположения пути.                                    Документация => https://www.npmjs.com/package/del

//- Cоздание путей -//

const path = {
	build: {
		html: "dist/",
		js: "dist/js/",
		library: "dist/library/",
		css: "dist/css/",
		images: "dist/assets/images",
		fonts: "dist/assets/fonts",
	},
	src: {
		html: "src/*.html",
		js: "src/js/*.js",
		library: "src/library/**",
		style: "src/" + preprocessor + "/style." + preprocessor + "",
		images: "src/assets/images/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: "src/assets/fonts/*.{ttf,eot,svg,woff,woff2}",
	},
	watch: {
		html: "src/**/*.html",
		js: "src/js/**/*.js",
		library: "src/library/**",
		style: "src/" + preprocessor + "/**/*." + preprocessor + "",
		images: "src/assets/images/**/*.{jpg,png,svg,gif,ico,webp}",
	},
	clean: 'dist'
}

//----SERVER----//
const server = () => {
	browsersync.init({
		server: {
			baseDir: "dist"
		},
		port: 3000,
		notify: false,
		// online:false позволяет работать без подлючение к сети 
	});
}

//----HTML----//
export const html = () => {
	return src(path.src.html)
		.pipe(plumber())
		.pipe(include())
		.pipe(webpHtml())
		.pipe(dest(path.build.html))
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true,
		}))
		.pipe(rename({
			suffix: ".min",
			extname: ".html"
		}))
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

//----CSS----//
const css = () => {
	return src(path.src.style)
		.pipe(plumber())
		.pipe(eval(preprocessor)())    // функция eval() нам помогает преобрзовать строчный тип в функцию тоесть убрать ковычки чтоб pipe смог нормально прочитать значение было так "less"(название плагина)=>less сам плагин
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 4 version'],
			cascade: false,
		}))
		.pipe(webpcss())
		.pipe(media())
		.pipe(cleanСss({
			format: 'beautify',
			level: { specialComments: true },
		}))
		.pipe(dest(path.build.css))
		.pipe(rename({
			suffix: ".min",
			extname: ".css"
		}))
		.pipe(shorthand())
		.pipe(media())
		.pipe(cleanСss({
			level: { 2: { specialComments: 0 } },
		}))
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

exports.css = css

//----styleWatch----//
const styleWatch = () => {
	return src(path.src.style)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(eval(preprocessor)())
		.pipe(dest(path.build.css))
		.pipe(rename({
			suffix: ".min",
			extname: ".css"
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

exports.styleWatch = styleWatch

//----JS----//
const  js = () => {
	return src(path.src.js)
		.pipe(plumber())
		.pipe(rigger())
		.pipe(dest(path.build.js))
		.pipe(terser())
		.pipe(rename({
			suffix: ".min",
			extname: ".js"
		}))
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}

exports.js = js

//----LIBRARY----//
const library = () => {
	return src(path.src.library)
	.pipe(dest(path.build.library))
}

exports.library = library

//----IMG----//

const images = () => {
	return src(path.src.images)
		.pipe(newer(path.build.images))
		.pipe(webp({
			quality: 70
		}))
		.pipe(dest(path.build.images))
		.pipe(src(path.src.images))
		.pipe(newer(path.build.images))
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 75, progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(dest(path.build.images))
		.pipe(browsersync.stream())
}

exports.images = images

//----FONTS----//
const PATH__FONTS = 'src/scss/base/_fonts.scss'
const fontsStyle = (params) => {
	const file_content = fs.readFileSync(PATH__FONTS);
	if (file_content == '' || file_content == false) {
		fs.writeFile(PATH__FONTS, '', cb);
		return fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (let i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(PATH__FONTS, '@include font-face("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
}

exports.fontsStyle = fontsStyle

const cb = () => { }

const fonts = () => {
	return src(path.src.fonts)
		.pipe(dest(path.build.fonts))
}

exports.fonts = fonts

//----CLEAN----//

const  clean =() => {
	return del(['dist/**'])
}
exports.clean = clean

//----Watch----//
function watchFiles() {
	gulp.watch([path.watch.html], html,)
	gulp.watch([path.watch.style], styleWatch)
	gulp.watch([path.watch.js], js)
	gulp.watch([path.build.library], library)
	gulp.watch([path.watch.images], images)
}

const build = gulp.series(clean, gulp.parallel(html, styleWatch, js, library, images, fonts));
const watch = gulp.series(build, gulp.parallel(server, watchFiles, fontsStyle));

exports.build = build;
exports.watch = watch;
exports.default = watch;
