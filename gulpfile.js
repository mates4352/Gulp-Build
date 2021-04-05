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
		css: "dist/css/",
		images: "dist/assets/images",
		fonts: "dist/assets/fonts",
	},
	src: {
		html: "src/*.html",
		js: "src/js/*.js",
		style: "src/" + preprocessor + "/style." + preprocessor + "",     // Мы в пути пишем название переменной которая хранит название в строчном типе. Если бы мы указали бы просто ссылку на функцию то была бы сдесь ошибка 
		images: "src/assets/images/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: "src/assets/fonts/*.{ttf,eot,svg,woff,woff2}",
	},
	watch: {
		html: "src/**/*.html",
		js: "src/js/**/*.js",
		style: "src/" + preprocessor + "/**/*." + preprocessor + "",
		images: "src/assets/images/**/*.{jpg,png,svg,gif,ico,webp}",
	},
	clean: 'dist'
}

//----tack----//

function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: "dist"
		},
		port: 3000,
		notify: false,
		// online:false позволяет работать без подлючение к сети 
	});
}

function browserSyncReload(done) {
	browsersync.reload();
}

//----HTML----//
// пишем с pug 

// .pipe(pug({
// 	pretty: true
// }))

// .pipe(htmlmin({
// 	collapseWhitespace: false,
// 	removeComments: false,
// }))

function html() {
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

function css() {
	return src(path.src.style)
		.pipe(plumber())
		.pipe(eval(preprocessor)())    // функция eval() нам помогает преобрзовать строчный тип в функцию тоесть убрать ковычки чтоб pipe смог нормально прочитать значение было так "less"(название плагина)=>less сам плагин
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 4 version'],
			cascade: true
		}))
		.pipe(webpcss())
		.pipe(media())
		.pipe(cleanСss({
			format : 'beautify',
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

//----styleWatch----//
//для быстрого css 
function styleWatch() {
	return src(path.src.style)
		.pipe(plumber())
		.pipe(eval(preprocessor)())
		.pipe(dest(path.build.css))
		.pipe(rename({
			suffix: ".min",
			extname: ".css"
		}))
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

//----JS----//

function js() {
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

//----IMG----//

function images() {
	return src(path.src.images)
		.pipe(newer(path.build.images))
		.pipe(webp({
			quality: 70
		}))
		.pipe(dest(path.build.images))
		.pipe(src(path.src.images))
		.pipe(newer(path.build.images))
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			interlaced: true,
			optimizationLevel: 5  // max 7
		}))
		.pipe(dest(path.build.images))
		.pipe(browsersync.stream())
}

//----FONTS----//
// автоматическое создание миксина от имен шрифта
// иногда не создает шрифты решение удалить файл в который сохраняем
const PATH = 'src/scss/base/_fonts.scss'
function fontsStyle(params) {
	const file_content = fs.readFileSync(PATH);
	if (file_content == '' || file_content == false) {
		fs.writeFile(PATH, '', cb);
		return fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (let i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(PATH, '@include font-face("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
}
function cb() { }

function fonts() {
	return src(path.src.fonts)
		.pipe(dest(path.build.fonts))
}

//----CLEAN----//

function clean() {
	return del(['dist/**'])
}

//----Watch----//

function watchFiles() {
	gulp.watch([path.watch.html], html,)
	gulp.watch([path.watch.style], css)
	gulp.watch([path.watch.js], js)
	gulp.watch([path.watch.images], images)
}

//Создаем переменную в которую будем включать все интсрукции которые мы сделали выше gulp.series - позволяет запустить таски по порядку gulp.parallel паралейно другим таскам // Документация => https://gulpjs.com/docs/en/api/concepts
const build = gulp.series(clean,gulp.parallel(html, css, js, images, fonts));
const watch = gulp.series(build,gulp.parallel(browserSync,watchFiles,fontsStyle));

//----Экспорт таск----//

exports.fontsStyle = fontsStyle
exports.styleWatch = styleWatch
exports.fonts = fonts
exports.html = html
exports.css = css
exports.js = js
exports.images = images
exports.clean = clean
exports.build = build;
exports.watch = watch;
exports.default = watch;